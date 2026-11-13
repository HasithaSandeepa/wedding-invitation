import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase-admin';
import type { Guest } from '@/lib/guest';
import { eventOf, isEventId } from '@/lib/guest';


type Params = {params:{event:string; token:string}};
const invalid = () => NextResponse.json({error:'Invitation not found'}, {status:404});
export async function GET(_req: NextRequest, {params}:Params) {
  if (!isEventId(params.event) || !/^[\w-]{32}$/.test(params.token)) return invalid();
  try {
    const snap = await db().collection('invitations').doc(params.token).get();
    if (!snap.exists || eventOf(snap.data() as Guest) !== params.event) return invalid();
    const g = snap.data() as Guest;
    return NextResponse.json({name:g.name,maxAttendees:g.maxAttendees,status:g.status,attendingCount:g.attendingCount}, {headers:{'Cache-Control':'no-store'}});
  } catch {return NextResponse.json({error:'Invitation unavailable'}, {status:500});}
}
export async function POST(req:NextRequest,{params}:Params) {
  if (!isEventId(params.event) || !/^[\w-]{32}$/.test(params.token)) return invalid();
  try {
    const b = await req.json();
    if (b.status !== 'confirmed' && b.status !== 'declined') return NextResponse.json({error:'Invalid RSVP'},{status:400});
    const count = b.status === 'declined' ? 0 : Number(b.attendingCount);
    if (!Number.isInteger(count) || count < 0) return NextResponse.json({error:'Invalid attendee count'},{status:400});
    const ref = db().collection('invitations').doc(params.token);
    await db().runTransaction(async tx=>{
      const snap = await tx.get(ref);
      if (!snap.exists || eventOf(snap.data() as Guest) !== params.event) throw Error('NOT_FOUND');
      const g = snap.data() as Guest;
      if (count > g.maxAttendees || (b.status === 'confirmed' && count < 1)) throw Error('INVALID_COUNT');
      tx.update(ref,{status:b.status,attendingCount:count,respondedAt:new Date().toISOString(),updatedAt:new Date().toISOString()});
    });
    return NextResponse.json({success:true});
  } catch(e) {
    if (e instanceof Error && e.message === 'NOT_FOUND') return invalid();
    if (e instanceof Error && e.message === 'INVALID_COUNT') return NextResponse.json({error:'Attendee count exceeds your family allocation'},{status:400});
    return NextResponse.json({error:'Could not save RSVP'},{status:500});
  }
}
