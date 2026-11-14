# Wedding & Homecoming Digital Invitations

A Next.js 14 application providing **two individually styled invitations** (wedding in gold and homecoming in red), Firebase-backed family invitations and RSVPs, and one administrator dashboard. Original UI, images, and music are retained.

## Edit event details — the only two event content files

| Event | Source | Public personalized URL |
| --- | --- | --- |
| Wedding | `src/config/wedding.ts` | `/invite/wedding/[token]` |
| Homecoming | `src/config/homecoming.ts` | `/invite/homecoming/[token]` |

`wedding.ts` is the central source for the couple's names, parents and phone numbers. `homecoming.ts` inherits that shared identity and specifies **its own** ceremony/date/time, venue, map, RSVP details, images and music. To change the same couple for both events, edit `wedding.ts` once. Change the event-specific date, venue, wording, RSVP deadline, gallery or music in the corresponding event config. Both invitation designs remain separate in `src/components/` (gold wedding) and `src/components/homecoming/` (red homecoming); adjust those components and the scoped `.homecoming-theme` styles in `src/app/globals.css` to customize appearance independently.

Event details supplied:

- **Wedding:** 21 January 2027, Thursday, 8:30 AM (Poruwa 8:30 AM), Sopana Mount View Hotel Premises, Nuwara Eliya Road, Padinawela.
- **Homecoming:** 23 January 2027, Saturday, 10:00 AM, The Tea Tree Resort, Kithal Ella Road, Heeloya, Bandarawela.

RSVP deadlines were not supplied; default values are defined in the two config files and may be changed there. No calendar finish time was supplied; the calendar export currently assumes a five-hour event duration.

## Install & run

1. Install Node.js 20 or later.
2. Run `npm ci`.
3. Fill in the `.env` file with **your own** Firebase project credentials and authorized administrator UIDs. Never publish this file; it is excluded by `.gitignore`.
4. Run `npm run dev`, then visit `http://localhost:3000`.
5. For production, set the same environment variables in your Vercel project dashboard; deploy normally with `npm run build`.

### Environment variables

`NEXT_PUBLIC_FIREBASE_API_KEY`, `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`, `NEXT_PUBLIC_FIREBASE_PROJECT_ID`, `NEXT_PUBLIC_FIREBASE_APP_ID`, `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`, `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`: Firebase client web configuration (check `src/lib/firebase-client.ts`).

`FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY`: Firebase Admin service-account details (check `src/lib/firebase-admin.ts`). `FIREBASE_ADMIN_UIDS`: comma-separated Firebase Authentication UIDs allowed to manage guests. `NEXT_PUBLIC_APP_URL`: full deployed URL used when copying invitation links.

Only the `NEXT_PUBLIC_` variables are embedded into the browser build. Never expose Admin service account keys as `NEXT_PUBLIC_` variables.

## Administrator dashboard `/admin`

Log in with a Firebase Authentication email/password account whose UID is listed in `FIREBASE_ADMIN_UIDS`. Add, edit, delete and import families (CSV/Excel); choose wedding, homecoming or both; preview and copy individual invitation links and WhatsApp messages; mark sent; export CSV; and review RSVP/attendance counts for each event. Sending is **manual**; copying is not the same as sending.

Firestore collection: `invitations`. Each event uses a separate invitation document/token and RSVP while sharing a `familyId` for the same family. **Do not clear or migrate this collection**: the original `/invite/[token]` and `/api/invite/[token]` wedding links are preserved, and old documents without `eventId` are interpreted as wedding. Guest pages access only minimal RSVP data through server routes. Admin API calls require a verified Firebase ID token and UID authorization.

## Directory overview

- `src/config/`: event data; edit content here
- `src/components/` and `src/components/homecoming/`: visually distinct designs
- `src/app/invite/`: old and new invitation routes
- `src/app/api/`: guest RSVP and secured admin endpoints
- `src/lib/`: Firebase clients, guest utilities, message and RSVP handling
- `public/`: original invitation assets
- `.env`: local credentials, ignored by Git; replace placeholder values

## Notes

The included `.env` has **placeholders only** because the archive did not contain local credentials. The application requires a configured Firebase project to use admin login, saved invitations and RSVP. Run `npm run build` before deploying and verify both languages, both personalized invitation URLs and your Firebase permissions against your project.
