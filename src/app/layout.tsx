import type { Metadata, Viewport } from "next";
import "./globals.css";
import { LanguageProvider } from "@/components/LanguageContext";

export const viewport: Viewport = {
  themeColor: "#8C6420",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Nimesh & Dilhani — Traditional Sri Lankan Wedding Invitation",
  description:
    "Cordially inviting you to the traditional Sri Lankan Poruwa wedding celebration of Nimesh & Dilhani at Hilton Colombo.",
  keywords: [
    "Sri Lankan Wedding",
    "Poruwa Ceremony",
    "Sinhala Wedding Invitation",
    "Traditional Wedding",
    "Hilton Colombo",
    "Nimesh and Dilhani",
  ],
  authors: [{ name: "Nimesh & Dilhani" }],
  openGraph: {
    title: "Nimesh & Dilhani — Wedding Invitation (සාදර ඇරයුමයි)",
    description:
      "Join us as we celebrate our sacred vows on the traditional Golden Poruwa on March 13, 2027 at The Grand Ballroom, Hilton Colombo.",
    type: "website",
    locale: "si_LK",
    alternateLocale: "en_US",
    images: [
      {
        url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&h=630&q=80",
        width: 1200,
        height: 630,
        alt: "Nimesh & Dilhani Wedding Invitation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nimesh & Dilhani — Wedding Invitation",
    description: "Traditional Sri Lankan Poruwa Wedding Invitation on March 13, 2027.",
    images: ["https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&h=630&q=80"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: "Wedding of Nimesh & Dilhani",
    startDate: "2027-03-13T17:00:00+05:30",
    endDate: "2027-03-13T23:30:00+05:30",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "Place",
      name: "Hilton Colombo (Grand Ballroom)",
      address: {
        "@type": "PostalAddress",
        streetAddress: "No. 2, Sir Chittampalam A Gardiner Mawatha",
        addressLocality: "Colombo",
        postalCode: "00200",
        addressCountry: "LK",
      },
    },
    description:
      "Traditional Sri Lankan Poruwa wedding ceremony and banquet celebration of Nimesh and Dilhani.",
  };

  return (
    <html lang="si" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen text-ink-primary antialiased selection:bg-gold-champagne/40 selection:text-gold-deep">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
