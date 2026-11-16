"use client";

import React, { useEffect, useRef, useState } from "react";

interface InvitationIntroVideoProps {
  src: string;
  onComplete: () => void;
}

/** Full-screen introduction, with a black fade before revealing the invitation. */
export const InvitationIntroVideo: React.FC<InvitationIntroVideoProps> = ({
  src,
  onComplete,
}) => {
  const [phase, setPhase] = useState<"playing" | "blackout" | "reveal">("playing");
  const phaseRef = useRef("playing");
  const videoRef = useRef<HTMLVideoElement>(null);
  const completeRef = useRef(onComplete);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    completeRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    // Browsers may block autoplay with sound. In that case, use muted playback
    // so the visitor can still watch or skip the introduction.
    const video = videoRef.current;
    if (!video) return;
    const attempt = video.play();
    if (attempt) {
      attempt.catch(() => {
        if (phaseRef.current !== "playing") return;
        video.muted = true;
        video.play().catch(() => startTransition());
      });
    }
    return () => {
      timersRef.current.forEach(clearTimeout);
      video.pause();
    };
    // The intro is created once for each opening click.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startTransition = () => {
    if (phaseRef.current !== "playing") return;
    phaseRef.current = "blackout";
    videoRef.current?.pause();
    setPhase("blackout");
    timersRef.current.push(
      setTimeout(() => {
        // First cover the video with black, then swap to the invitation.
        completeRef.current();
        phaseRef.current = "reveal";
        setPhase("reveal");
      }, 650),
    );
  };

  return (
    <div
      className="fixed inset-0 z-[950] overflow-hidden bg-black"
      style={{
        opacity: phase === "reveal" ? 0 : 1,
        transition: phase === "reveal" ? "opacity 800ms ease-in-out" : undefined,
        pointerEvents: phase === "reveal" ? "none" : "auto",
      }}
      aria-label="Invitation introduction video"
    >
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        src={src}
        autoPlay
        playsInline
        preload="auto"
        onEnded={startTransition}
        onError={startTransition}
        controls={false}
        style={{ opacity: phase === "playing" ? 1 : 0, transition: "opacity 650ms ease-in-out" }}
      />
      {phase === "playing" && (
        <button
          type="button"
          onClick={startTransition}
          aria-label="Skip introduction video"
          className="absolute bottom-6 right-6 z-10 rounded-md bg-gray-600/90 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition-colors hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          style={{ marginBottom: "env(safe-area-inset-bottom, 0px)", marginRight: "env(safe-area-inset-right, 0px)" }}
        >
          Skip
        </button>
      )}
    </div>
  );
};
