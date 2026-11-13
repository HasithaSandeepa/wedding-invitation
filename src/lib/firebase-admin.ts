import 'server-only';
import { cert, getApps, initializeApp, applicationDefault } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { NextRequest } from 'next/server';

function app() {
  if (getApps().length) return getApps()[0];
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');
  if (projectId && clientEmail && privateKey) {
    return initializeApp({ credential: cert({ projectId, clientEmail, privateKey }), projectId });
  }
  // Supports Firebase-provided service identity / local GOOGLE_APPLICATION_CREDENTIALS.
  return initializeApp({ credential: applicationDefault(), projectId });
}
export const db = () => getFirestore(app());
export async function adminFromRequest(req: NextRequest) {
  const bearer = req.headers.get('authorization') || '';
  if (!bearer.startsWith('Bearer ')) return null;
  const token = bearer.slice(7);
  const decoded = await getAuth(app()).verifyIdToken(token, true);
  // Restrict to explicitly approved UIDs, never any arbitrary Firebase user.
  const uids = (process.env.FIREBASE_ADMIN_UIDS || '').split(',').map(s => s.trim()).filter(Boolean);
  return uids.includes(decoded.uid) ? decoded : null;
}
