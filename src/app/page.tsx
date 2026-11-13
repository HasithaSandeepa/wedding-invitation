"use client";

import React, { useState } from "react";
import { InvitationOpening } from "@/components/InvitationOpening";
import { WeddingHero } from "@/components/WeddingHero";
import { WeddingCountdown } from "@/components/WeddingCountdown";
import { EventDetails } from "@/components/EventDetails";
import { PhotoGallery } from "@/components/PhotoGallery";
import { VenueSection } from "@/components/VenueSection";
import { RSVPForm } from "@/components/RSVPForm";
import { WeddingFooter } from "@/components/WeddingFooter";
import { FloatingNav } from "@/components/FloatingNav";
import { AudioPlayer } from "@/components/AudioPlayer";
import { DustParticles } from "@/components/traditional/DustParticles";

export default function Home({
  invitationToken,
}: {
  invitationToken?: string;
}) {
  const [invitationOpened, setInvitationOpened] = useState(false);

  return (
    <div
      className="relative min-h-screen w-full overflow-x-clip"
      style={{
        backgroundColor: "#F5EEDF",
        color: "#5A4A33",
        fontSize: "17px",
        lineHeight: "1.7",
        backgroundImage: "url(/lotus-mandala/texture.webp)",
        backgroundRepeat: "repeat",
        backgroundSize: "450px 800px",
        isolation: "isolate",
        paddingBottom: "calc(64px + env(safe-area-inset-bottom, 0px))",
      }}
    >
      {/* 1. Opening Invitation Gate Screen */}
      <InvitationOpening
        isOpen={invitationOpened}
        onOpen={() => setInvitationOpened(true)}
      />

      {/* 2. Audio Player with original music */}
      <AudioPlayer />

      {/* 3. Golden Dust Floating Effect */}
      <DustParticles />

      {/* 4. Traditional Pattern SVG Background Layer */}
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

      {/* 5. Fine Paper Grain Multiply Layer */}
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

      {/* Main Content Sections */}
      <div className="relative" style={{ zIndex: 2 }}>
        <WeddingHero />
      </div>

      <div className="relative" style={{ zIndex: 2 }}>
        <WeddingCountdown />
      </div>

      <div className="relative" style={{ zIndex: 2 }}>
        <EventDetails />
      </div>

      {/* <div className="relative" style={{ zIndex: 2 }}>
        <PhotoGallery />
      </div> */}

      <div className="relative" style={{ zIndex: 2 }}>
        <VenueSection />
      </div>

      <div className="relative" style={{ zIndex: 2 }}>
        <RSVPForm invitationToken={invitationToken} />
      </div>

      <div className="relative" style={{ zIndex: 2 }}>
        <WeddingFooter />
      </div>

      {/* Floating Bottom Pill Navigation */}
      <FloatingNav />
    </div>
  );
}
