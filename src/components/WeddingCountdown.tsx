"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "./LanguageContext";

export const WeddingCountdown: React.FC = () => {
  const { config, isSinhala } = useLanguage();
  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    const updateCountdown = () => {
      const target = new Date(config.event.weddingDate).getTime();
      const now = new Date().getTime();
      const diff = target - now;

      if (diff > 0) {
        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);

        setTimeLeft({
          days: d.toString().padStart(2, "0"),
          hours: h.toString().padStart(2, "0"),
          minutes: m.toString().padStart(2, "0"),
          seconds: s.toString().padStart(2, "0"),
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [config.event.weddingDate]);

  return (
    <section id="countdown" className="relative overflow-hidden px-6 py-9 text-center sm:py-12">
      {/* Side Mandala Watermarks */}
      <div className="pointer-events-none absolute -left-24 top-1/2 -translate-y-1/2 opacity-[0.08]" aria-hidden="true">
        <div style={{ width: "340px", height: "340px" }}>
          <div className="gpd-mandala" />
        </div>
      </div>
      <div className="pointer-events-none absolute -right-24 top-1/2 -translate-y-1/2 opacity-[0.08]" aria-hidden="true">
        <div style={{ width: "340px", height: "340px" }}>
          <div className="gpd-mandala" />
        </div>
      </div>

      <div className="relative mx-auto max-w-2xl">
        <span
          className="mb-2 block text-[0.66rem] uppercase tracking-[0.34em]"
          style={{ fontFamily: "var(--font-montserrat)", color: "#B98A2F" }}
        >
          Countdown
        </span>

        <h2
          style={{
            fontFamily: "var(--font-sinhala)",
            fontWeight: 700,
            color: "#8C6420",
            fontSize: "clamp(1.6rem, 4vw, 2.3rem)",
          }}
        >
          {isSinhala ? "සුබ මොහොත එළඹෙන තුරු" : "Awaiting the Auspicious Moment"}
        </h2>

        {/* Flourish */}
        <div
          aria-hidden="true"
          className="mt-3 gpd-flourish"
          style={{
            width: "120px",
            aspectRatio: "2100 / 756",
            margin: "0 auto",
          }}
        />

        {/* 4 Cards Grid */}
        <div className="mx-auto mt-8 grid max-w-lg grid-cols-4 gap-2.5 sm:gap-4">
          <div
            className="flex aspect-[3/4] flex-col items-center justify-center rounded-2xl px-1"
            style={{
              background: "#FCF8EE",
              border: "1px solid rgba(185, 138, 47, 0.4)",
              boxShadow: "0 14px 30px -22px rgba(120,86,30,0.55), inset 0 1px 0 rgba(255,255,255,0.7)",
            }}
          >
            <span
              className="tabular-nums leading-none"
              style={{
                fontFamily: "var(--font-serif)",
                fontWeight: 600,
                fontSize: "clamp(1.7rem, 6.5vw, 3.1rem)",
                color: "#8C6420",
              }}
            >
              {timeLeft.days}
            </span>
            <span className="my-2 h-px w-7" style={{ background: "#D8B45F" }} aria-hidden="true" />
            <span
              className="text-[0.72rem]"
              style={{
                fontFamily: "var(--font-sinhala)",
                fontWeight: 600,
                color: "#8A7A60",
              }}
            >
              {isSinhala ? "දින" : "Days"}
            </span>
          </div>

          <div
            className="flex aspect-[3/4] flex-col items-center justify-center rounded-2xl px-1"
            style={{
              background: "#FCF8EE",
              border: "1px solid rgba(185, 138, 47, 0.4)",
              boxShadow: "0 14px 30px -22px rgba(120,86,30,0.55), inset 0 1px 0 rgba(255,255,255,0.7)",
            }}
          >
            <span
              className="tabular-nums leading-none"
              style={{
                fontFamily: "var(--font-serif)",
                fontWeight: 600,
                fontSize: "clamp(1.7rem, 6.5vw, 3.1rem)",
                color: "#8C6420",
              }}
            >
              {timeLeft.hours}
            </span>
            <span className="my-2 h-px w-7" style={{ background: "#D8B45F" }} aria-hidden="true" />
            <span
              className="text-[0.72rem]"
              style={{
                fontFamily: "var(--font-sinhala)",
                fontWeight: 600,
                color: "#8A7A60",
              }}
            >
              {isSinhala ? "පැය" : "Hours"}
            </span>
          </div>

          <div
            className="flex aspect-[3/4] flex-col items-center justify-center rounded-2xl px-1"
            style={{
              background: "#FCF8EE",
              border: "1px solid rgba(185, 138, 47, 0.4)",
              boxShadow: "0 14px 30px -22px rgba(120,86,30,0.55), inset 0 1px 0 rgba(255,255,255,0.7)",
            }}
          >
            <span
              className="tabular-nums leading-none"
              style={{
                fontFamily: "var(--font-serif)",
                fontWeight: 600,
                fontSize: "clamp(1.7rem, 6.5vw, 3.1rem)",
                color: "#8C6420",
              }}
            >
              {timeLeft.minutes}
            </span>
            <span className="my-2 h-px w-7" style={{ background: "#D8B45F" }} aria-hidden="true" />
            <span
              className="text-[0.72rem]"
              style={{
                fontFamily: "var(--font-sinhala)",
                fontWeight: 600,
                color: "#8A7A60",
              }}
            >
              {isSinhala ? "මිනිත්තු" : "Minutes"}
            </span>
          </div>

          <div
            className="flex aspect-[3/4] flex-col items-center justify-center rounded-2xl px-1"
            style={{
              background: "#FCF8EE",
              border: "1px solid rgba(185, 138, 47, 0.4)",
              boxShadow: "0 14px 30px -22px rgba(120,86,30,0.55), inset 0 1px 0 rgba(255,255,255,0.7)",
            }}
          >
            <span
              className="tabular-nums leading-none"
              style={{
                fontFamily: "var(--font-serif)",
                fontWeight: 600,
                fontSize: "clamp(1.7rem, 6.5vw, 3.1rem)",
                color: "#8C6420",
              }}
            >
              {timeLeft.seconds}
            </span>
            <span className="my-2 h-px w-7" style={{ background: "#D8B45F" }} aria-hidden="true" />
            <span
              className="text-[0.72rem]"
              style={{
                fontFamily: "var(--font-sinhala)",
                fontWeight: 600,
                color: "#8A7A60",
              }}
            >
              {isSinhala ? "තත්පර" : "Seconds"}
            </span>
          </div>
        </div>

        <p
          className="mt-6 text-[0.95rem]"
          style={{ fontFamily: "var(--font-sinhala)", color: "#8A7A60" }}
        >
          {config.event.year} {isSinhala ? config.event.monthSi : config.event.monthEn} {config.event.day} {isSinhala ? config.event.dayOfWeekSi : config.event.dayOfWeekEn}
        </p>
      </div>
    </section>
  );
};
