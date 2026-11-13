# Homecoming — matching wedding design in red

The Wedding invitation components are unchanged. Homecoming now uses the same opening, traditional hero, countdown, event cards, gallery, venue, RSVP, footer, navigation and audio components with a burgundy / rose palette, maintained in `src/components/homecoming/`.

## Set event-specific information

Edit **`src/config/homecoming.ts`**:

- `event.weddingDate`: ISO date/time with Sri Lanka UTC offset, e.g. `2027-03-15T18:00:00+05:30` (example only).
- `year`, `monthEn`, `monthSi`, `day`, `dayOfWeekEn`, `dayOfWeekSi`, `timeEn`, `timeSi`.
- `event.venue`: name, address, hall, image, map and iframe URLs.
- `event.ceremony`: homecoming wording and timing.
- `traditionalAuspiciousTextEn` and `traditionalAuspiciousTextSi`, `rsvp` deadline.
- `gallery`: optionally provide different photos; the current wedding assets are used as placeholders.

**No event date or venue was provided.** Until you enter them, the calendar and venue map links remain hidden rather than misleading guests. The existing venue image is a placeholder, not a claimed homecoming venue.

## Routes / database

- Existing wedding: `/invite/[token]` — preserved.
- Wedding: `/invite/wedding/[token]` — preserved.
- Homecoming: `/invite/homecoming/[token]` — red design.
- Firestore data, shared family guest management, and event-specific RSVP APIs are unchanged.

## Deploy

1. Keep your `.env.local` and existing Firebase keys; never commit them.
2. Run `npm install` and `npm run build` and test RSVP for a homecoming test family.
3. Deploy to Vercel, retaining your production environment variables.
4. Always make a Firestore backup before replacing an existing production deployment.
