"use client";

import React, { useState, useEffect } from "react";
import { House, CalendarDays, Image as ImageIcon, MapPin, Mail } from "lucide-react";

export const FloatingNav: React.FC = () => {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "events", "gallery", "venue", "rsvp"];
      const scrollPos = window.scrollY + 200;

      for (const s of sections) {
        const el = document.getElementById(s);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActive(s);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      aria-label="Section navigation"
      className="fixed bottom-4 left-1/2 z-[500] flex -translate-x-1/2 items-center gap-1 rounded-full px-2 py-1.5 sm:gap-1.5 sm:px-2.5"
      style={{
        background: "rgba(255, 250, 249, 0.88)",
        border: "1px solid rgba(185, 70, 88, 0.45)",
        boxShadow: "0 16px 36px -16px rgba(115,38,55,0.55), inset 0 1px 0 rgba(255,255,255,0.7)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        marginBottom: "env(safe-area-inset-bottom, 0px)",
      }}
    >
      <a
        href="#hero"
        aria-label="Home"
        className={`grid h-10 w-10 place-items-center rounded-full transition-all duration-300 hover:-translate-y-0.5 ${
          active === "hero" ? "shadow-md" : ""
        }`}
        style={{
          background: active === "hero" ? "linear-gradient(150deg, #DF8C95, #B94658 55%, #82273A)" : "transparent",
          color: active === "hero" ? "#FFF7F2" : "#82273A",
          boxShadow: active === "hero" ? "0 8px 16px -8px rgba(115,38,55,0.7), inset 0 1px 0 rgba(255,255,255,0.4)" : "none",
        }}
      >
        <House className="h-[19px] w-[19px]" />
      </a>

      <a
        href="#events"
        aria-label="Events"
        className="grid h-10 w-10 place-items-center rounded-full transition-all duration-300 hover:-translate-y-0.5"
        style={{
          background: active === "events" ? "linear-gradient(150deg, #DF8C95, #B94658 55%, #82273A)" : "transparent",
          color: active === "events" ? "#FFF7F2" : "#82273A",
          boxShadow: active === "events" ? "0 8px 16px -8px rgba(115,38,55,0.7), inset 0 1px 0 rgba(255,255,255,0.4)" : "none",
        }}
      >
        <CalendarDays className="h-[19px] w-[19px]" />
      </a>

      <a
        href="#gallery"
        aria-label="Album"
        className="grid h-10 w-10 place-items-center rounded-full transition-all duration-300 hover:-translate-y-0.5"
        style={{
          background: active === "gallery" ? "linear-gradient(150deg, #DF8C95, #B94658 55%, #82273A)" : "transparent",
          color: active === "gallery" ? "#FFF7F2" : "#82273A",
          boxShadow: active === "gallery" ? "0 8px 16px -8px rgba(115,38,55,0.7), inset 0 1px 0 rgba(255,255,255,0.4)" : "none",
        }}
      >
        <ImageIcon className="h-[19px] w-[19px]" />
      </a>

      <a
        href="#venue"
        aria-label="Map"
        className="grid h-10 w-10 place-items-center rounded-full transition-all duration-300 hover:-translate-y-0.5"
        style={{
          background: active === "venue" ? "linear-gradient(150deg, #DF8C95, #B94658 55%, #82273A)" : "transparent",
          color: active === "venue" ? "#FFF7F2" : "#82273A",
          boxShadow: active === "venue" ? "0 8px 16px -8px rgba(115,38,55,0.7), inset 0 1px 0 rgba(255,255,255,0.4)" : "none",
        }}
      >
        <MapPin className="h-[19px] w-[19px]" />
      </a>

      <a
        href="#rsvp"
        aria-label="RSVP"
        className="grid h-10 w-10 place-items-center rounded-full transition-all duration-300 hover:-translate-y-0.5"
        style={{
          background: active === "rsvp" ? "linear-gradient(150deg, #DF8C95, #B94658 55%, #82273A)" : "transparent",
          color: active === "rsvp" ? "#FFF7F2" : "#82273A",
          boxShadow: active === "rsvp" ? "0 8px 16px -8px rgba(115,38,55,0.7), inset 0 1px 0 rgba(255,255,255,0.4)" : "none",
        }}
      >
        <Mail className="h-[19px] w-[19px]" />
      </a>
    </nav>
  );
};
