import { randomBytes } from 'crypto';
export type EventId = 'wedding' | 'homecoming';
export type RSVPStatus = 'pending' | 'confirmed' | 'declined';
export type Guest = {
  token: string; name: string; phone: string; maxAttendees: number;
  status: RSVPStatus; attendingCount: number; sent: boolean;
  sentAt: string | null; respondedAt: string | null;
  createdAt: string; updatedAt: string;
  // Optional for backwards compatibility with the original wedding invitations.
  eventId?: EventId; familyId?: string;
};
export const eventOf = (g: Guest): EventId => g.eventId === 'homecoming' ? 'homecoming' : 'wedding';
export const familyOf = (g: Guest): string => g.familyId || g.token;
export const eventIds: EventId[] = ['wedding', 'homecoming'];
export const isEventId = (v: unknown): v is EventId => v === 'wedding' || v === 'homecoming';
export function freshToken() { return randomBytes(24).toString('base64url'); }
export const cleanName = (v: unknown) => typeof v === 'string' ? v.trim().slice(0, 140) : '';
export const cleanPhone = (v: unknown) => typeof v === 'string' ? v.trim().slice(0, 35) : String(v ?? '').trim().slice(0, 35);
export const cleanMax = (v: unknown) => Number.isInteger(Number(v)) && Number(v) >= 1 && Number(v) <= 30 ? Number(v) : 2;
