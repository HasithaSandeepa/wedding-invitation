import type { EventId } from './guest';
export function invitationPath(eventId: EventId, token: string, legacy = false) {
  return legacy && eventId === 'wedding' ? `/invite/${token}` : `/invite/${eventId}/${token}`;
}
export function invitationMessage(name: string, token: string, origin: string, coupleNames: string, eventId: EventId = 'wedding', legacy = false) {
  const label = eventId === 'homecoming' ? 'Homecoming' : 'Wedding';
  return `Dear ${name},\n\nWe are delighted to invite you and your family to celebrate our ${label.toLowerCase()} ceremony.\n\nPlease open your invitation using the link below.\n\nWith love,\n${coupleNames}\n\n💌 Your ${label} Invitation\n${origin.replace(/\/$/, '')}${invitationPath(eventId, token, legacy)}`;
}
