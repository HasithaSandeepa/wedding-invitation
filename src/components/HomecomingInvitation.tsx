"use client";

import React, { useState } from "react";
import { LanguageProvider } from "./LanguageContext";
import { InvitationOpening } from "./homecoming/InvitationOpening";
import { WeddingHero } from "./homecoming/WeddingHero";
import { WeddingCountdown } from "./homecoming/WeddingCountdown";
import { EventDetails } from "./homecoming/EventDetails";
import { PhotoGallery } from "./homecoming/PhotoGallery";
import { VenueSection } from "./homecoming/VenueSection";
import { RSVPForm } from "./homecoming/RSVPForm";
import { WeddingFooter } from "./homecoming/WeddingFooter";
import { FloatingNav } from "./homecoming/FloatingNav";
import { AudioPlayer } from "./homecoming/AudioPlayer";
import { DustParticles } from "./traditional/DustParticles";

export default function HomecomingInvitation({ token }: { token: string }) {
  const [invitationOpened, setInvitationOpened] = useState(false);
  return (
    <LanguageProvider eventId="homecoming">
      <main
        className="homecoming-theme relative min-h-screen w-full overflow-x-clip"
        style={{
          backgroundColor: "#F9EDEE",
          color: "#59353C",
          fontSize: "17px",
          lineHeight: "1.7",
          backgroundImage: "url(/lotus-mandala/texture.webp)",
          backgroundRepeat: "repeat",
          backgroundSize: "450px 800px",
          isolation: "isolate",
          paddingBottom: "calc(64px + env(safe-area-inset-bottom, 0px))",
        }}
      >
        <InvitationOpening
          isOpen={invitationOpened}
          onOpen={() => setInvitationOpened(true)}
        />
        <AudioPlayer />
        <DustParticles />
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0"
          style={{
            zIndex: -1,
            backgroundImage: "url(/lotus-mandala/pattern.svg)",
            backgroundRepeat: "repeat",
            backgroundSize: "220px 220px",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0"
          style={{
            zIndex: -1,
            backgroundImage: "url(/lotus-mandala/grain.webp)",
            backgroundRepeat: "repeat",
            backgroundSize: "512px 512px",
            mixBlendMode: "multiply",
            opacity: 0.55,
          }}
        />
        <div className="relative" style={{ zIndex: 2 }}>
          <WeddingHero />
          <WeddingCountdown />
          <EventDetails />
          {/* <PhotoGallery /> */}
          <VenueSection />
          <RSVPForm invitationToken={token} eventId="homecoming" />
          <WeddingFooter />
        </div>
        <FloatingNav />
      </main>
    </LanguageProvider>
  );
}
