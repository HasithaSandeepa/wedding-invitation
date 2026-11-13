import type { NextRequest } from 'next/server';
import { GET as eventGET, POST as eventPOST } from '@/lib/event-invite-route';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
type Context = { params: { token: string } };
export function GET(req: NextRequest, { params }: Context) {
  return eventGET(req, { params: { ...params, event: 'homecoming' } });
}
export function POST(req: NextRequest, { params }: Context) {
  return eventPOST(req, { params: { ...params, event: 'homecoming' } });
}
