import type { Metadata, Viewport } from "next";
import "./globals.css";
import { LanguageProvider } from "@/components/LanguageContext";
import { weddingConfig } from "@/config/wedding";

const { couple, event } = weddingConfig;
const names = `${couple.bride.fullNameEn} & ${couple.groom.fullNameEn}`;
export const viewport: Viewport = {
  themeColor: "#8C6420", width: "device-width", initialScale: 1,
};
export const metadata: Metadata = {
  title: `${names} — Wedding Invitation`,
  description: `Join ${names} on ${event.day} ${event.monthEn} ${event.year} at ${event.venue.nameEn}.`,
  openGraph: { title: `${names} — Wedding Invitation`, type: "website", locale: "si_LK" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const structuredEvent = {
    "@context": "https://schema.org", "@type": "Event",
    name: `${names} — Wedding`, startDate: event.weddingDate,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: { "@type": "Place", name: event.venue.nameEn, address: event.venue.addressEn },
  };
  return (
    <html lang="si" className="scroll-smooth">
      <head><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredEvent) }} /></head>
      <body className="min-h-screen text-ink-primary antialiased selection:bg-gold-champagne/40 selection:text-gold-deep">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
