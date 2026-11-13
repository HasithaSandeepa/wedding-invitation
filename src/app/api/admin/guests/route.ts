import { NextRequest, NextResponse } from 'next/server';
import { db, adminFromRequest } from '@/lib/firebase-admin';
import { Guest, freshToken, cleanName, cleanPhone, cleanMax, eventOf, familyOf, isEventId, EventId } from '@/lib/guest';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
const denied = () => NextResponse.json({ error: 'Unauthorized admin' }, { status: 401 });
const collection = () => db().collection('invitations');
const stamp = () => new Date().toISOString();
async function authorized(req: NextRequest) { try { return !!await adminFromRequest(req); } catch { return false; } }
export async function GET(req: NextRequest) {
  try {
    if (!await authorized(req)) return denied();
    // Missing eventId is deliberately interpreted as Wedding, preserving old records.
    const snap = await collection().orderBy('createdAt','desc').limit(5000).get();
    const guests = snap.docs.map(d => ({ ...d.data(), token: d.id })) as Guest[];
    return NextResponse.json({ guests, truncated: snap.size === 5000 }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (err) { console.error('admin GET', err); return NextResponse.json({ error: 'Unable to load invitations.' }, { status: 500 }); }
}
export async function POST(req: NextRequest) {
  try {
    if (!await authorized(req)) return denied();
    const body = await req.json();
    const rows: unknown[] = body.rows || (body.name ? [body] : []);
    if (!Array.isArray(rows) || !rows.length || rows.length > 200) return NextResponse.json({ error: 'Submit 1–200 families per batch.' }, { status: 400 });
    const existing = await collection().get();
    const known = existing.docs.map(d => ({ ...(d.data() as Guest), token: d.id }));
    const signatures = new Set(known.map(g => `${familyOf(g)}|${eventOf(g)}`));
    const familyLookup = new Map<string,string>();
    for (const g of known) {
      const key = g.phone.trim() ? `phone:${g.phone.replace(/\D/g, '')}` : `name:${g.name.trim().toLowerCase()}`;
      if (!familyLookup.has(key)) familyLookup.set(key, familyOf(g));
    }
    const batch = db().batch();
    const created: Guest[] = [];
    const familyWrites = new Set<string>();
    const now = stamp();
    for (const record of rows) {
      if (!record || typeof record !== 'object') return NextResponse.json({ error: 'Invalid import row.' }, { status: 400 });
      const r = record as Record<string,unknown>;
      const name = cleanName(r.name), phone = cleanPhone(r.phone);
      if (!name) return NextResponse.json({ error: 'Family name is required.' }, { status: 400 });
      const evs = Array.isArray(r.events) ? r.events.filter(isEventId) : [isEventId(r.eventId) ? r.eventId : 'wedding'];
      const events = [...new Set(evs)] as EventId[];
      if (!events.length) return NextResponse.json({ error: 'Select at least one event.' }, { status: 400 });
      const lookupKey = phone ? `phone:${phone.replace(/\D/g, '')}` : `name:${name.toLowerCase()}`;
      const familyId = typeof r.familyId === 'string' && /^[\w-]{32}$/.test(r.familyId) ? r.familyId : familyLookup.get(lookupKey) || freshToken();
      familyLookup.set(lookupKey, familyId);
      if (!familyWrites.has(familyId)) {
        batch.set(db().collection('families').doc(familyId), { name, phone, updatedAt: now, createdAt: now }, { merge: true });
        familyWrites.add(familyId);
      }
      for (const eventId of events) {
        const signature = `${familyId}|${eventId}`;
        if (signatures.has(signature)) continue; // Idempotent import / never replace an existing RSVP or token.
        signatures.add(signature);
        const max = eventId === 'wedding' && r.weddingMax !== undefined ? r.weddingMax : eventId === 'homecoming' && r.homecomingMax !== undefined ? r.homecomingMax : r.maxAttendees;
        const guest: Guest = { token: freshToken(), familyId, eventId, name, phone, maxAttendees: cleanMax(max), status:'pending', attendingCount:0, sent:false, sentAt:null, respondedAt:null, createdAt:now, updatedAt:now };
        batch.create(collection().doc(guest.token), guest);
        created.push(guest);
      }
    }
    // Firestore batch: max 500 writes (200 families × 2 events + 200 families could exceed).
    // imports capped to 100 families per request when both events are selected.
    if (created.length + familyWrites.size > 450) return NextResponse.json({ error: 'Import fewer families per batch (maximum 100 when selecting both events).' }, { status: 400 });
    await batch.commit();
    return NextResponse.json({ guests: created, skipped: rows.length - new Set(created.map(g=>g.familyId)).size }, {status:201});
  } catch (err) { console.error('admin POST', err); return NextResponse.json({ error: 'Could not create invitations.' }, { status:500 }); }
}
export async function PATCH(req: NextRequest) {
  try {
    if (!await authorized(req)) return denied();
    const body = await req.json();
    const token = String(body.token || '');
    if (!/^[\w-]{32}$/.test(token)) return NextResponse.json({error:'Invalid token'}, {status:400});
    const ref = collection().doc(token), snap = await ref.get();
    if (!snap.exists) return NextResponse.json({error:'Invitation not found'}, {status:404});
    const current = snap.data() as Guest;
    const patch: Partial<Guest> = { updatedAt:stamp() };
    if (body.name !== undefined) { patch.name = cleanName(body.name); if (!patch.name) return NextResponse.json({error:'Name required'}, {status:400}); }
    if (body.phone !== undefined) patch.phone = cleanPhone(body.phone);
    if (body.maxAttendees !== undefined) {
      const max = Number(body.maxAttendees);
      if (!Number.isInteger(max) || max < 1 || max > 30 || max < current.attendingCount) return NextResponse.json({error:'Allocation must be 1–30 and not below current RSVP.'},{status:400});
      patch.maxAttendees = max;
    }
    if (typeof body.sent === 'boolean') { patch.sent = body.sent; patch.sentAt = body.sent ? current.sentAt || stamp() : null; }
    // Event ID and token are immutable: guests already hold these invitation links.
    await ref.update(patch);
    // Sync shared contact details to other event records without altering any RSVPs.
    if (patch.name !== undefined || patch.phone !== undefined) {
      const familyId = familyOf({ ...current, token });
      const all = await collection().get();
      const b = db().batch();
      for (const d of all.docs) if (d.id !== token && familyOf({ ...(d.data() as Guest), token:d.id }) === familyId) b.update(d.ref, { ...(patch.name !== undefined ? {name:patch.name} : {}), ...(patch.phone !== undefined ? {phone:patch.phone} : {}), updatedAt:stamp() });
      b.set(db().collection('families').doc(familyId), { ...(patch.name !== undefined ? {name:patch.name} : {}), ...(patch.phone !== undefined ? {phone:patch.phone} : {}), updatedAt:stamp() }, {merge:true});
      await b.commit();
    }
    return NextResponse.json({success:true});
  } catch(err) { console.error('admin PATCH',err); return NextResponse.json({error:'Could not update invitation.'},{status:500}); }
}
export async function DELETE(req: NextRequest) {
  try {
    if (!await authorized(req)) return denied();
    const token = req.nextUrl.searchParams.get('token') || '';
    if (!/^[\w-]{32}$/.test(token)) return NextResponse.json({error:'Invalid token'},{status:400});
    // Only delete THIS event invitation; family and other event records remain.
    await collection().doc(token).delete();
    return NextResponse.json({success:true});
  } catch(err) { console.error('admin DELETE',err); return NextResponse.json({error:'Could not delete invitation.'},{status:500}); }
}
