# Wedding invitation — Firebase + Vercel deployment guide

## What changed

The original invitation UI, photos, music, countdown, animation, venue information, and theme remain in place. The invitation is now served at `/invite/<unique-token>` and family RSVPs are stored in Cloud Firestore, not a local JSON file. `/admin` is a separate dashboard for managing families and copying message text. The public home page shows the original invitation, but intentionally does **not** allow untracked RSVPs.

## 1. Configure Firebase (existing project)

1. Open [Firebase Console](https://console.firebase.google.com/) and select your existing Firebase project.
2. Go to **Build > Firestore Database**, create a database (if one doesn't exist). Choose a region near your guests. **Do not enable permissive production rules.**
3. In **Build > Authentication > Sign-in method**, enable **Email/Password**.
4. In **Authentication > Users**, add your administrator user. Open that user and copy its **UID** (not email).
5. In **Project settings > General**, register/select a **Web app** and copy `apiKey`, `authDomain`, `projectId`, and `appId`.
6. In **Project settings > Service accounts**, generate a **new private key**. Keep the JSON file secret. Use the JSON's `project_id`, `client_email`, and `private_key` for the server-only variables in `.env.local`.
7. Set `FIREBASE_ADMIN_UIDS` to the administrator's UID; if needed, list multiple UIDs separated with commas.

**Security:** The Next.js backend verifies Firebase ID tokens and the UID allowlist for all admin actions. The public invitation endpoints require 192-bit random tokens. Guests cannot read other invitations through ordinary links without having their tokens. Never share guest lists or secrets publicly. Do not install the private key in the browser.

**Suggested Firestore rules:** This application accesses Firestore from server routes through Firebase Admin SDK. Client Firestore access is unnecessary; use rules that deny all direct client access:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

## 2. Test locally

1. Install Node.js 20 or newer.
2. Extract the ZIP and open the `traditional-invitation-main` folder in your terminal.
3. Run `npm install`.
4. Copy `.env.example` to `.env.local`, and paste the configuration from step 1. For multiline private keys, keep the `\\n` escapes exactly as demonstrated (or use your deployment platform's env editor).
5. Run `npm run dev`.
6. Browse to `http://localhost:3000/admin` and sign in. If it shows an authorization error, confirm `FIREBASE_ADMIN_UIDS`, credentials, and Firestore project all match.
7. Add a test family, choose maximum attendees, copy the message, and open the URL in a private window. Submit an RSVP. Refresh `/admin` to view the new status.

## 3. Deploy to Vercel

1. Push the unzipped project folder to a **private** GitHub repository, excluding `.env.local` and service-account JSON files. Alternatively import the project into Vercel using your preferred Git integration.
2. In [Vercel](https://vercel.com/), **Add New > Project**, select the repository; framework: **Next.js**, root directory: `traditional-invitation-main` (if repository root contains that folder).
3. In **Project > Settings > Environment Variables**, add every variable shown in `.env.example` with actual values. `FIREBASE_PRIVATE_KEY` should contain the exact service-account PEM content; escaped newlines (`\\n`) are supported by the code.
4. Deploy. Use the generated `https://<project>.vercel.app` URL to sign in at `/admin` and send test invitations.
5. In Firebase Authentication **Settings > Authorized domains**, add the Vercel domain if required by your chosen authentication flow. For email/password this typically isn't needed, but it can help if you later add OAuth sign-in.
6. **Before copying/sending the invitation message**, open `/admin` on the permanent production domain. The message URL is derived from the domain of that page, so preview deployments will generate preview URLs. Once you add a custom domain, copy from that domain instead.
7. In Vercel's Project Settings > Domains, optionally connect your own wedding domain. No custom domain is required for the application to work.

## 4. Excel / CSV import

Use `name`, `phone`, `maxAttendees` as headers in row 1. Each row is **one family**. Example:

```csv
name,phone,maxAttendees
Mr. Kasun Perera,0771234567,4
Mrs. Nadeesha Silva,0719876543,2
```

Upload under `/admin` → **Import Excel/CSV**. Imported records automatically receive separate, cryptographically generated invitation tokens and private URLs. Import files up to 3 MB / 3,000 family rows per upload. Use Excel's **Text** cell format for Sri Lankan phone numbers (to retain leading zero). Repeat imports create *new* invitations; the importer does not attempt to merge duplicates.

## 5. Sending + responses

- Next to each family, use the **Copy message** icon; it generates the complete personalized message containing that family's unique URL. Paste into WhatsApp yourself.
- Tick **Sent** only after you actually send it. You can untick or retick as needed. The date of the first marking as sent is retained unless you untick it.
- Use the **eye** icon to preview the personalized invitation. The **tick** button copies only the URL.
- Each family's RSVP can be `pending`, `confirmed`, or `declined`; if confirmed, they choose a count between 1 and the family's configured maximum. Guests can revise their response by reopening the same link.
- Dashboard: Total families, Confirmed families, Not participating families, Pending families, Sent invitations, and Total people attending. Counts update whenever you reload or perform an admin action.
- **Delete** permanently invalidates the invitation URL and deletes its RSVP data. Confirm before deleting.
- **Export CSV** downloads names, numbers, invitation links, RSVP states, and sent statuses.

## 6. Important considerations

- As invitations are *bearer links*, any person who has or is forwarded a family's link can view and modify that family's RSVP. Share links only with their intended recipients. For stronger protection, add phone/OTP verification in a subsequent iteration.
- Use the `/admin` login only for your own administrator Firebase Auth accounts. Do not expose service account variables to the client.
- The displayed couple names in the **copied message** can be edited on `/admin` (saved in that browser's local storage). Wedding information **inside the invitation template** remains controlled by `src/config/wedding.ts`.
- The existing original music file is retained. Ensure you have rights to use it on the public site.
- If you later rename the Vercel project or change domains, old copied links will only continue working while the old domain is still available/redirected.
- Deploy the Firebase functions and Firestore rules through your Firebase console before sharing links. No custom Firebase Functions deployment is needed here.
