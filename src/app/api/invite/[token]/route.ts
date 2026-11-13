import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase-admin';
import type { Guest } from '@/lib/guest';
import { eventOf } from '@/lib/guest';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
const missing = () => NextResponse.json({ error: 'Invitation not found' }, { status: 404 });
const valid = (token: string) => /^[\w-]{32}$/.test(token);
export async function GET(_req: NextRequest, { params }: { params: { token: string } }) {
  try {
    if (!valid(params.token)) return missing();
    const snap = await db().collection('invitations').doc(params.token).get();
    if (!snap.exists || eventOf(snap.data() as Guest) !== 'wedding') return missing();
    const g = snap.data() as Guest;
    // Never expose private phone number or internal administrative metadata to guests.
    return NextResponse.json({ name: g.name, maxAttendees: g.maxAttendees, status: g.status, attendingCount: g.attendingCount }, { headers: { 'Cache-Control': 'no-store' } });
  } catch { return NextResponse.json({ error: 'Invitation currently unavailable' }, { status: 500 }); }
}
export async function POST(req: NextRequest, { params }: { params: { token: string } }) {
  try {
    if (!valid(params.token)) return missing();
    const body = await req.json();
    if (!['confirmed', 'declined'].includes(body.status)) return NextResponse.json({ error: 'Invalid RSVP response' }, { status: 400 });
    const count = body.status === 'declined' ? 0 : Number(body.attendingCount);
    if (!Number.isInteger(count) || count < 0) return NextResponse.json({ error: 'Invalid attendee count' }, { status: 400 });
    const ref = db().collection('invitations').doc(params.token);
    await db().runTransaction(async tx => {
      const snap = await tx.get(ref);
      if (!snap.exists || eventOf(snap.data() as Guest) !== 'wedding') throw new Error('NOT_FOUND');
      const guest = snap.data() as Guest;
      if (count > guest.maxAttendees || (body.status === 'confirmed' && count < 1)) throw new Error('INVALID_COUNT');
      tx.update(ref, { status: body.status, attendingCount: count, respondedAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
    });
    return NextResponse.json({ success: true });
  } catch (err) {
    if (err instanceof Error && err.message === 'NOT_FOUND') return missing();
    if (err instanceof Error && err.message === 'INVALID_COUNT') return NextResponse.json({ error: 'Attendee count exceeds family allocation' }, { status: 400 });
    return NextResponse.json({ error: 'Could not save RSVP' }, { status: 500 });
  }
}
