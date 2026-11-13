# Firebase + Vercel family invitation version

**Start with [FIREBASE_VERCEL_SETUP.md](FIREBASE_VERCEL_SETUP.md).** The original wedding design is preserved; a new admin console is at `/admin`, and guests use `/invite/<token>`. The old file-based `/api/rsvp` was removed.

---

# 🌸 Premium Traditional Sri Lankan Wedding Invitation Website

A luxury digital wedding invitation web application inspired by authentic Kandyan and traditional Sri Lankan wedding aesthetics (Golden Poruwa, sacred lotus mandalas, liyawel motifs, and auspicious ceremonies).

Built with **Next.js 14 (App Router)**, **TypeScript**, and **Tailwind CSS**.

---

## ✨ Features

- **Traditional Sri Lankan Aesthetics**:
  - Warm ivory and parchment paper backgrounds with delicate gold dust floating particles.
  - Ornate Golden Poruwa illustration and crowning lotus mandalas.
  - Traditional Liyawel corner ornaments and filigree dividers.
  - Kandyan wedding inspired framing.
- **Bilingual Support (සිංහල & English)**:
  - Instant one-click toggle between authentic Sinhala wedding invitation phrasing and English.
  - Persistent language selection.
- **Opening Invitation Experience**:
  - Card-envelope opening screen with couple's names, Poruwa crest, and smooth reveal animation.
- **Hero & Couple Section**:
  - Auspicious wedding date and time presentation.
  - Traditional parents' introduction for bride and groom.
  - Couple portrait inside an arched golden Poruwa frame.
  - Heartfelt traditional blessing poem.
- **Accurate Real-Time Countdown**:
  - Live countdown timer calculated against the configured wedding date in Sri Lanka Standard Time (`Asia/Colombo`).
  - Days, hours, minutes, and seconds with bilingual labels.
- **Wedding Event Details & Add to Calendar**:
  - Poruwa ceremony & banquet timings, venue, and dress code.
  - Direct downloadable `.ics` calendar file generation.
  - One-click Google Calendar integration link.
- **Photo Gallery with Lightbox**:
  - Responsive arched photo grid with zoom hover effects.
  - Fullscreen lightbox with previous/next navigation and keyboard controls (`Esc`, `ArrowLeft`, `ArrowRight`).
- **Venue & Interactive Location**:
  - Venue address and information for Hilton Colombo Grand Ballroom.
  - Embedded Google Map preview.
  - Direct "View on Google Maps" navigation button.
- **Complete RSVP Attendance System**:
  - Name, attendance status, guest counter (+ / -), phone number, and wishes/dietary notes.
  - Server-side API endpoint (`/api/rsvp`) with real storage in `data/rsvps.json`.
  - Optional Google Sheets webhook integration via environment variable.
- **Ambient Traditional Audio Player**:
  - Built-in Web Audio API synthesizer generating meditative traditional sitar/veena pentatonic chimes (no broken remote mp3 dependencies!).
  - Floating mute/unmute control with golden glow.
- **Floating Bottom Navigation**:
  - Glassmorphism pill navigation for quick jumps across sections (Home, Events, Gallery, Venue, RSVP).

---

## 🛠️ Project Structure

```
traditional invitation/
├── data/
│   └── rsvps.json             # Server-persisted RSVP guest responses
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── rsvp/
│   │   │       └── route.ts   # Server-side RSVP API endpoint
│   │   ├── globals.css        # Styles, Sinhala & serif fonts, animations
│   │   ├── layout.tsx         # Root layout with metadata and Open Graph
│   │   └── page.tsx           # Main page orchestrating all components
│   ├── components/
│   │   ├── traditional/
│   │   │   ├── PoruwaIllustration.tsx  # Golden Poruwa vector artwork
│   │   │   ├── MandalaOrnament.tsx     # Lotus mandala vector motif
│   │   │   ├── LotusFlourish.tsx       # Liyawel dividers & corner ornaments
│   │   │   └── DustParticles.tsx       # Ambient gold dust specks
│   │   ├── AudioPlayer.tsx        # Ambient traditional music player
│   │   ├── EventDetails.tsx       # Ceremonies & .ics calendar generator
│   │   ├── FloatingNav.tsx        # Glassmorphism bottom navigation
│   │   ├── InvitationOpening.tsx  # Interactive invitation opening card
│   │   ├── LanguageContext.tsx    # Bilingual state management
│   │   ├── LanguageSwitcher.tsx   # Sinhala / English switcher
│   │   ├── PhotoGallery.tsx       # Arched image gallery & lightbox
│   │   ├── RSVPForm.tsx           # RSVP attendance form
│   │   ├── VenueSection.tsx       # Venue card & embedded map
│   │   ├── WeddingCountdown.tsx   # Real-time countdown timer
│   │   └── WeddingFooter.tsx      # Final luxury card footer & call links
│   ├── config/
│   │   └── wedding.ts         # Centralized wedding information configuration
│   └── translations/
│       └── index.ts           # Sinhala & English dictionaries
├── tailwind.config.ts         # Gold & ivory color palettes, keyframes
├── tsconfig.json              # TypeScript configuration
└── package.json
```

---

## 🚀 Running the Project

### 1. Development Mode
```bash
npm run dev
# The website runs at http://localhost:3001
```

### 2. Production Build & Start
```bash
npm run build
npm run start
```

---

## ⚙️ Customizing Wedding Details

All couple names, dates, parents, ceremony times, venue details, and gallery photos can be edited in a single file:

📄 **`src/config/wedding.ts`**

Updating this file automatically updates all relevant sections and calendar invitations across both Sinhala and English languages.

---

## 📝 Connecting Google Sheets to RSVP (Optional)

To automatically forward RSVP submissions to a Google Sheet:
1. Create a Google Apps Script Webhook on your Google Sheet.
2. Add your webhook URL to `.env.local`:
```env
GOOGLE_SHEETS_WEBHOOK_URL="https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec"
```
3. Whenever guests submit their RSVP, it is both securely saved locally in `data/rsvps.json` and forwarded to your Google Sheet.
