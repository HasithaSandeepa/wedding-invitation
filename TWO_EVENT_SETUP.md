# Two-event wedding application — setup and migration guide

## What's changed
- Same Firebase project, Firestore database, admin login, and Vercel application.
- Wedding invitation visual components and original `/invite/[token]` route are untouched.
- New `/invite/homecoming/[token]` and `/invite/wedding/[token]` routes.
- Separate event views, RSVP summaries, invitation-sent checkboxes, message-copy links, and event-specific capacities.
- Shared family identity (`familyId`) and contact information for new records. A family can have one invitation per event.
- Original Firestore `invitations` documents remain in place. Records with no `eventId` are treated as Wedding records, and their original tokens/RSVP answers are retained.
- New `families` collection is filled as families are added, matched, or edited. It is not necessary to copy or delete old invitation records.

## Deploy safely
1. **Back up Firestore** before upgrading production. Export current `invitations` documents, or use a Firestore managed export.
2. Keep all existing environment variables from the previous working version.
3. Add `NEXT_PUBLIC_APP_URL=https://your-project.vercel.app` to both `.env.local` and Vercel environment variables, replacing the example with your actual public Vercel URL.
4. Run `npm install`, `npm run build`, then `npm run dev` locally and test with one family before deploying.
5. Deploy on the **same Vercel app**, connected to the **same Firebase project**. Do not delete existing Firestore collections or reinstall Firebase.
6. Log in at `/admin`. Select Wedding or Homecoming, then add families or import `sample-two-event-families.csv`.
7. Copy messages separately and mark each event's invitation Sent manually. Each event RSVP is independent.
8. Verify an existing `/invite/OLD_TOKEN` invitation still opens and its RSVP remains unchanged.

## Excel / CSV import
Use `name`, `phone`, `wedding`, `homecoming`, `weddingMax`, `homecomingMax`. Enter `Yes` or `No` under each event; use a different maximum attendance for each event as required. If the wedding/homecoming columns are omitted, the import targets whichever event is selected in the dashboard. Preserve phone numbers as **text** and preferably use country code 94. The import matches families by phone; if phone is blank, it matches by family name. Matching event invitations are **skipped**, not overwritten. Import 100 families per batch automatically.

**Important:** Matching is best-effort and not a guarantee of uniqueness if names/phone numbers differ or are shared. Check family details before importing a large file. For high-volume data and concurrent administrators, a transactional unique family index is recommended. Dashboard currently loads at most 5,000 invitations; paginate if your guest list is larger. The public token grants access to that family's RSVP, so do not post invitation links publicly.

## Homecoming design — what to provide
`src/components/HomecomingInvitation.tsx` contains a **distinct, replaceable temporary layout** (not your final design). `src/config/homecoming.ts` stores placeholders for title, couple, venue, date and time, and invitation wording. Please provide:
- Homecoming reference: screenshot, Figma link, HTML project, or ZIP of your desired layout.
- Confirmed homecoming **date, start time, venue name/address and optional Google Maps link**.
- Any homecoming-specific photos, fonts, background artwork, music, and animation direction.
- Exact couple names, invitation wording, RSVP deadline, and whether English/Sinhala options are needed.

Do not send Firebase service account keys. A final homecoming visual replacement should only edit the homecoming component/assets/config; both events will continue sharing the Firebase/backend RSVP system.

## Example links
- Existing wedding: `https://your-project.vercel.app/invite/OLD_TOKEN`
- New wedding: `https://your-project.vercel.app/invite/wedding/NEW_TOKEN`
- Homecoming: `https://your-project.vercel.app/invite/homecoming/NEW_TOKEN`

## Security
Keep `FIREBASE_PRIVATE_KEY`, `FIREBASE_CLIENT_EMAIL`, and `FIREBASE_ADMIN_UIDS` **server-only**. No actual credentials are packaged. For public invitations use HTTPS and share only generated invitation URLs.
