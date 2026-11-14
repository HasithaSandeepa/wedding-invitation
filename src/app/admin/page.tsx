'use client';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, User } from 'firebase/auth';
import { firebaseAuth } from '@/lib/firebase-client';
import { invitationMessage } from '@/lib/message';
import { weddingConfig } from '@/config/wedding';
import type { Guest, EventId } from '@/lib/guest';
import { eventOf, familyOf } from '@/lib/guest';
import { invitationPath } from '@/lib/message';
import { Copy, Eye, Pencil, Trash2, Check, Upload, Plus, LogOut, Search } from 'lucide-react';

type GuestDraft = { name: string; phone: string; maxAttendees: number; events: EventId[]; familyId?: string };
const emptyDraft = (): GuestDraft => ({ name: '', phone: '', maxAttendees: 2, events: ['wedding'] });
export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [guests, setGuests] = useState<Guest[]>([]);
  const [draft, setDraft] = useState<GuestDraft>(emptyDraft());
  const [editing, setEditing] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<EventId>('wedding');
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState('');
  const [error, setError] = useState('');
  const coupleNames = `${weddingConfig.couple.bride.firstNameEn} & ${weddingConfig.couple.groom.firstNameEn}`;
  const [baseUrl, setBaseUrl] = useState('');

  useEffect(() => {
    setBaseUrl(window.location.origin);
    return onAuthStateChanged(firebaseAuth(), u => { setUser(u); setReady(true); });
  }, []);
  const api = useCallback(async (method: string, endpoint: string, body?: unknown) => {
    const auth = firebaseAuth();
    const token = await auth.currentUser?.getIdToken();
    if (!token) throw new Error('Please sign in.');
    const res = await fetch(endpoint, { method, headers: { Authorization: `Bearer ${token}`, ...(body ? { 'Content-Type': 'application/json' } : {}) }, ...(body ? { body: JSON.stringify(body) } : {}), cache: 'no-store' });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Request failed');
    return data;
  }, []);
  const load = useCallback(async () => {
    try { const data = await api('GET', '/api/admin/guests'); setGuests(data.guests); setError(''); }
    catch(e) { setError(e instanceof Error ? e.message : 'Failed to load guests'); }
  }, [api]);
  useEffect(() => { if (user) void load(); else setGuests([]); }, [user, load]);
  const run = async (job: () => Promise<void>) => {
    setBusy(true); setError(''); setNotice('');
    try { await job(); await load(); }
    catch(e) { setError(e instanceof Error ? e.message : 'Operation failed'); }
    finally { setBusy(false); }
  };
  const activeGuests = useMemo(() => guests.filter(g => eventOf(g) === selectedEvent), [guests, selectedEvent]);
  const families = useMemo(() => new Set(guests.map(familyOf)).size, [guests]);
  const summary = useMemo(() => ({
    total: activeGuests.length, confirmed: activeGuests.filter(x => x.status === 'confirmed').length,
    declined: activeGuests.filter(x => x.status === 'declined').length,
    pending: activeGuests.filter(x => x.status === 'pending').length,
    sent: activeGuests.filter(x => x.sent).length,
    attending: activeGuests.reduce((n,x) => n + (x.status === 'confirmed' ? x.attendingCount : 0), 0),
  }), [activeGuests]);
  const filtered = activeGuests.filter(g => `${g.name} ${g.phone}`.toLowerCase().includes(query.toLowerCase()));
  const save = async () => {
    if (!draft.name.trim()) { setError('Family name required'); return; }
    if (!editing && !draft.events.length) { setError('Select at least one event.'); return; }
    await run(async () => {
      await api(editing ? 'PATCH' : 'POST', '/api/admin/guests', editing ? { ...draft, token: editing } : draft);
      setDraft(emptyDraft()); setEditing(null); setNotice('Family saved successfully.');
    });
  };
  const deleteGuest = (g: Guest) => {
    if (!window.confirm(`Permanently remove ${g.name}'s ${eventOf(g)} invitation? Their other event invitation will remain.`)) return;
    void run(async () => { await api('DELETE', `/api/admin/guests?token=${encodeURIComponent(g.token)}`); setNotice('Family deleted.'); });
  };
  const copyText = async (text: string) => {
    try { await navigator.clipboard.writeText(text); setNotice('Copied to clipboard.'); setError(''); }
    catch { setError('Copy failed. Please check browser clipboard permissions.'); }
  };
  const importFile = async (file?: File) => {
    if (!file) return;
    await run(async () => {
      if (file.size > 3 * 1024 * 1024) throw new Error('Maximum import file size: 3 MB.');
      const XLSX = await import('xlsx');
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data, { type: 'array' });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      if (!sheet) throw new Error('No worksheet found.');
      const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet, { defval: '', raw: false });
      if (!rows.length) throw new Error('No records found. Expected columns: name, phone, maxAttendees, wedding, homecoming');
      if (rows.length > 3000) throw new Error('Import up to 3,000 families per file.');
      const mapped = rows.map((r, i) => {
        const normalized = Object.fromEntries(Object.entries(r).map(([k,v]) => [k.toLowerCase().replace(/[^a-z]/g,''), v]));
        const name = String(normalized.name || normalized.familyname || normalized.guestname || '').trim();
        const phone = String(normalized.phone || normalized.phonenumber || normalized.mobile || '').trim();
        const size = Number(normalized.maxattendees || normalized.familymembers || normalized.guests || normalized.count || 2);
        const yn = (v: unknown) => ['yes','y','true','1','invite'].includes(String(v ?? '').trim().toLowerCase());
        const hasEventColumns = 'wedding' in normalized || 'homecoming' in normalized;
        const events: EventId[] = hasEventColumns ? (['wedding','homecoming'] as EventId[]).filter(e => yn(normalized[e])) : [selectedEvent];
        if (!events.length) throw new Error(`Row ${i + 2}: select Wedding or Homecoming.`);
        if (!name) throw new Error(`Row ${i + 2}: missing name`);
        if (!Number.isInteger(size) || size < 1 || size > 30) throw new Error(`Row ${i + 2}: maxAttendees must be 1–30`);
        return { name, phone, maxAttendees: size, events, weddingMax: normalized.weddingmax || size, homecomingMax: normalized.homecomingmax || size };
      });
      for (let i = 0; i < mapped.length; i += 100) await api('POST', '/api/admin/guests', { rows: mapped.slice(i, i + 100) });
      setNotice(`Processed ${mapped.length} family rows. Existing matching family/event invitations retain their tokens and RSVPs.`);
    });
  };
  const familyLink = (g: Guest) => `${(process.env.NEXT_PUBLIC_APP_URL || baseUrl).replace(/\/$/,'')}${invitationPath(eventOf(g),g.token,!g.eventId)}`;
  const csv = () => {
    const headers = ['event','familyId','name','phone','maxAttendees','status','attendingCount','sent','sentAt','respondedAt','invitationUrl'];
    const rows = guests.map(g => [eventOf(g),familyOf(g),g.name,g.phone,g.maxAttendees,g.status,g.attendingCount,g.sent,g.sentAt||'',g.respondedAt||'',familyLink(g)]);
    const esc = (v: unknown) => `"${String(v ?? '').replace(/^[=+@\-]/, "'$&").replace(/"/g,'""')}"`;
    const blob = new Blob([[headers,...rows].map(r => r.map(esc).join(',')).join('\r\n')], {type:'text/csv;charset=utf-8'});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a'); link.href = url; link.download = 'both-events-invitations.csv'; link.click(); URL.revokeObjectURL(url);
  };
  if (!ready) return <main className="min-h-screen grid place-items-center bg-stone-50">Loading…</main>;
  if (!user) return <main className="min-h-screen bg-[#F5EEDF] grid place-items-center p-5 text-[#5A4A33]"><form onSubmit={async e => { e.preventDefault(); setError(''); try { await signInWithEmailAndPassword(firebaseAuth(),email,password); } catch { setError('Invalid login or Firebase authentication error.'); } }} className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl space-y-4"><h1 className="text-2xl font-semibold text-[#8C6420]">Wedding Admin</h1><p className="text-sm">Sign in with an approved Firebase admin account.</p><input type="email" required placeholder="Admin email" autoComplete="username" className="w-full rounded-lg border p-3" value={email} onChange={e=>setEmail(e.target.value)}/><input type="password" required placeholder="Password" autoComplete="current-password" className="w-full rounded-lg border p-3" value={password} onChange={e=>setPassword(e.target.value)}/>{error && <p role="alert" className="text-red-700">{error}</p>}<button className="w-full rounded-lg bg-[#8C6420] p-3 font-semibold text-white">Sign in</button></form></main>;
  return <main className="min-h-screen bg-[#F6F3ED] p-4 md:p-8 text-slate-800"><div className="mx-auto max-w-7xl space-y-6">
    <header className="flex flex-wrap justify-between items-center gap-4"><div><h1 className="text-3xl font-bold text-[#8C6420]">Wedding &amp; Homecoming Dashboard</h1><p className="text-sm text-slate-500">Manage family invitations and RSVP responses</p></div><button onClick={()=>signOut(firebaseAuth())} className="inline-flex items-center gap-2 rounded-lg border bg-white px-4 py-2"><LogOut size={16}/> Sign out</button></header>
    <section className="rounded-xl border bg-white p-4 flex flex-wrap items-center justify-between gap-3"><div className="flex flex-wrap gap-2">{(['wedding','homecoming'] as EventId[]).map(event => <button key={event} onClick={()=>{setSelectedEvent(event);setEditing(null);setDraft({...emptyDraft(),events:[event]});}} className={`rounded-lg border px-5 py-3 font-semibold ${selectedEvent===event?'bg-[#8C6420] text-white':'bg-white'}`}>{event === 'wedding' ? 'Wedding Ceremony' : 'Homecoming'}</button>)}</div><div className="text-sm text-slate-600">{families} unique families across both events • {guests.length} event invitations</div></section>
    <section className="grid grid-cols-2 gap-3 md:grid-cols-6">{([['Total families',summary.total],['Confirmed',summary.confirmed],['Not participating',summary.declined],['Pending',summary.pending],['Invitations sent',summary.sent],['People attending',summary.attending]] as const).map(([label,count])=><div key={label} className="rounded-xl bg-white shadow-sm border p-4"><div className="text-xs text-slate-500">{label}</div><div className="text-3xl font-bold text-[#8C6420]">{count}</div></div>)}</section>
    {error && <div role="alert" className="rounded-lg bg-red-50 border border-red-200 p-3 text-red-800">{error}</div>}{notice && <div role="status" className="rounded-lg bg-green-50 border border-green-200 p-3 text-green-900">{notice}</div>}
    <section className="grid gap-4 lg:grid-cols-2"><div className="rounded-xl bg-white border p-5 space-y-3"><h2 className="font-semibold">{editing ? 'Edit family' : 'Add family'}</h2><input aria-label="Family name" placeholder="e.g. Mr. Kasun Perera" value={draft.name} onChange={e=>setDraft({...draft,name:e.target.value})} className="w-full border rounded-lg p-2"/><input aria-label="Phone" placeholder="Phone (optional; keep leading zero)" value={draft.phone} onChange={e=>setDraft({...draft,phone:e.target.value})} className="w-full border rounded-lg p-2"/>{!editing && <fieldset className="border rounded-lg p-3"><legend className="text-sm font-medium">Invite family to</legend>{(['wedding','homecoming'] as EventId[]).map(event=><label key={event} className="inline-flex mr-4 gap-2 items-center"><input type="checkbox" checked={draft.events.includes(event)} onChange={e=>setDraft({...draft,events:e.target.checked?[...draft.events,event]:draft.events.filter(x=>x!==event)})}/>{event === 'wedding'?'Wedding':'Homecoming'}</label>)}<p className="mt-1 text-xs text-slate-500">Existing family contacts are matched by phone (or by name when phone is blank). Each event has a separate token and RSVP.</p></fieldset>}
    <label className="block text-sm">Maximum family attendees <input type="number" min={1} max={30} value={draft.maxAttendees} onChange={e=>setDraft({...draft,maxAttendees:Number(e.target.value)})} className="ml-2 w-20 border rounded-lg p-2"/></label><div className="flex gap-2"><button disabled={busy} onClick={save} className="flex items-center gap-2 rounded-lg bg-[#8C6420] px-4 py-2 text-white disabled:opacity-50"><Plus size={16}/>{editing?'Save changes':'Add family'}</button>{editing && <button className="rounded-lg border px-4 py-2" onClick={()=>{setEditing(null);setDraft(emptyDraft());}}>Cancel</button>}</div></div>
    <div className="rounded-xl bg-white border p-5 space-y-3"><h2 className="font-semibold">Import / Export</h2><p className="text-sm text-slate-500">Excel (.xlsx / .xls) or CSV. Use headers <code>name, phone, maxAttendees, wedding, homecoming</code> (Yes/No for events). Optional: <code>weddingMax, homecomingMax</code>. Each row represents one family; preserve phone numbers as text in Excel. Without event columns, rows import into the selected event.</p><label className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-[#8C6420] px-4 py-2 text-white"><Upload size={16}/> Import Excel/CSV<input className="hidden" type="file" accept=".xlsx,.xls,.csv" disabled={busy} onChange={e=>{void importFile(e.target.files?.[0]);e.target.value='';}}/></label><button onClick={csv} className="ml-2 rounded-lg border px-4 py-2">Export CSV</button><p className="text-xs text-slate-500">Set NEXT_PUBLIC_APP_URL to your production Vercel domain so copied links work even when managing locally.</p></div></section>
    <section className="rounded-xl bg-white border overflow-hidden"><div className="flex flex-wrap justify-between items-center gap-3 p-4"><h2 className="font-semibold">{selectedEvent === 'wedding' ? 'Wedding' : 'Homecoming'} invitations ({filtered.length})</h2><label className="inline-flex items-center gap-2 border rounded-lg px-3 py-2"><Search size={16}/><input className="outline-none" placeholder="Search family or phone" value={query} onChange={e=>setQuery(e.target.value)} /></label></div><div className="overflow-x-auto"><table className="w-full text-left text-sm"><thead className="bg-[#F5EEDF] text-[#6D511F]"><tr>{['Family','Phone','Allocation','RSVP','Invited','Actions'].map(t=><th key={t} className="whitespace-nowrap px-4 py-3">{t}</th>)}</tr></thead><tbody>{filtered.map(g=><tr key={g.token} className="border-t"><td className="px-4 py-3 font-medium">{g.name}</td><td className="px-4 py-3">{g.phone || '—'}</td><td className="px-4 py-3">{g.attendingCount} / {g.maxAttendees}</td><td className="px-4 py-3 capitalize">{g.status === 'declined' ? 'Not participating' : g.status}</td><td className="px-4 py-3"><label className="inline-flex cursor-pointer items-center gap-2"><input type="checkbox" checked={g.sent} disabled={busy} onChange={e=>void run(async()=>{await api('PATCH','/api/admin/guests',{token:g.token,sent:e.target.checked});setNotice('Invitation sending status updated.');})}/>{g.sent ? 'Sent' : 'Not sent'}</label>{g.sentAt && <div className="text-xs text-slate-500">{new Date(g.sentAt).toLocaleDateString()}</div>}</td><td className="px-4 py-3"><div className="flex flex-wrap gap-2"><button title="Copy message" aria-label={`Copy message for ${g.name}`} onClick={()=>void copyText(invitationMessage(g.name,g.token,process.env.NEXT_PUBLIC_APP_URL || baseUrl,coupleNames,eventOf(g),!g.eventId))} className="rounded-lg border p-2 hover:bg-amber-50"><Copy size={16}/></button><a title="Preview invitation" aria-label={`Preview invitation for ${g.name}`} target="_blank" rel="noopener noreferrer" href={familyLink(g)} className="rounded-lg border p-2 hover:bg-amber-50"><Eye size={16}/></a><button title="Edit" aria-label={`Edit ${g.name}`} onClick={()=>{setEditing(g.token);setDraft({name:g.name,phone:g.phone,maxAttendees:g.maxAttendees,events:[eventOf(g)],familyId:familyOf(g)});window.scrollTo({top:0,behavior:'smooth'});}} className="rounded-lg border p-2"><Pencil size={16}/></button><button title="Copy link" aria-label={`Copy link for ${g.name}`} onClick={()=>void copyText(familyLink(g))} className="rounded-lg border p-2"><Check size={16}/></button><button title="Delete" aria-label={`Delete ${g.name}`} onClick={()=>deleteGuest(g)} className="rounded-lg border p-2 text-red-700"><Trash2 size={16}/></button></div></td></tr>)}{!filtered.length && <tr><td colSpan={6} className="p-8 text-center text-slate-500">No families found.</td></tr>}</tbody></table></div></section>
    <p className="text-xs text-slate-500">Only administrators whose Firebase UID is allowed by FIREBASE_ADMIN_UIDS can manage families. Copying a message does not automatically mark it sent. Selected event counts represent family invitations, except “People attending”.</p>
  </div></main>;
}
