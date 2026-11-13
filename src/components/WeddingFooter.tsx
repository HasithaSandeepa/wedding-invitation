"use client";

import React from "react";
import { Phone, Heart } from "lucide-react";
import { useLanguage } from "./LanguageContext";

export const WeddingFooter: React.FC = () => {
  const { config, isSinhala } = useLanguage();

  return (
    <>
      <section id="footer" className="relative overflow-hidden">
        <div
          className="relative px-6 py-9 text-center sm:py-12"
          style={{
            background: "linear-gradient(180deg, #8C6420 0%, #6E4D16 100%)",
            color: "#F8F1DC",
          }}
        >
          {/* Background Mandala Watermark */}
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.08]"
            aria-hidden="true"
          >
            <div style={{ width: "420px", height: "420px" }}>
              <div className="gpd-mandala" />
            </div>
          </div>

          <div className="relative z-10">
            <div
              className="text-[0.7rem] uppercase tracking-[0.4em]"
              style={{ fontFamily: "var(--font-montserrat)", opacity: 0.85 }}
            >
              Save the date
            </div>

            <div
              className="my-3.5"
              style={{
                fontFamily: "var(--font-serif)",
                fontWeight: 500,
                fontSize: "clamp(2.4rem, 9vw, 5rem)",
                lineHeight: 1,
                letterSpacing: "0.04em",
              }}
            >
              {config.event.day} . 03 . {config.event.year}
            </div>

            <div
              className="mb-6 text-[1.05rem] leading-[1.85]"
              style={{ fontFamily: "var(--font-sinhala)", color: "#EDDFB8" }}
            >
              {isSinhala ? "ආදරයෙන්, දෙපවුලේ ආරාධනයයි" : "With Love, From Both Families"}
            </div>

            {/* Centered Flourish with Golden Halo */}
            <div className="relative mx-auto" style={{ width: "150px", height: "54px" }}>
              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{
                  width: "130px",
                  height: "130px",
                  borderRadius: "50%",
                  background:
                    "radial-gradient(50% 50% at 50% 50%, rgba(251, 241, 212, 0.55) 0%, rgba(251, 241, 212, 0) 70%)",
                }}
              />
              <div
                aria-hidden="true"
                className="gpd-flourish"
                style={{
                  position: "relative",
                  width: "150px",
                  height: "54px",
                  opacity: 0.95,
                  background: "#EDDFB8",
                }}
              />
            </div>

            {/* Names */}
            <div
              className="relative mb-7 mt-3 inline-flex items-center justify-center"
              style={{
                fontFamily: "var(--font-sinhala)",
                fontWeight: 700,
                fontSize: "clamp(1.4rem, 4vw, 1.9rem)",
                color: "#F8F1DC",
              }}
            >
              <span>{isSinhala ? config.couple.groom.nameOnlySi : config.couple.groom.firstNameEn}</span>
              <span style={{ margin: "0 0.35em" }}>{isSinhala ? "සහ" : "and"}</span>
              <span>{isSinhala ? config.couple.bride.nameOnlySi : config.couple.bride.firstNameEn}</span>
            </div>

            {/* Quick Call Buttons */}
            <div className="flex flex-nowrap items-center justify-center gap-3">
              <a
                href={`tel:${config.couple.groom.phone}`}
                aria-label={`Call ${config.couple.groom.firstNameEn}`}
                className="inline-flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2.5 text-[0.92rem] transition-transform duration-200 hover:-translate-y-0.5 active:scale-95 sm:px-6"
                style={{
                  fontFamily: "var(--font-sinhala)",
                  fontWeight: 600,
                  background: "rgba(253, 248, 236, 0.12)",
                  border: "1px solid rgba(237, 223, 184, 0.6)",
                  color: "#F8F1DC",
                }}
              >
                <Phone className="h-3.5 w-3.5" style={{ color: "#EDDFB8" }} />
                <span>{isSinhala ? config.couple.groom.nameOnlySi : config.couple.groom.firstNameEn}</span>
              </a>

              <a
                href={`tel:${config.couple.bride.phone}`}
                aria-label={`Call ${config.couple.bride.firstNameEn}`}
                className="inline-flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2.5 text-[0.92rem] transition-transform duration-200 hover:-translate-y-0.5 active:scale-95 sm:px-6"
                style={{
                  fontFamily: "var(--font-sinhala)",
                  fontWeight: 600,
                  background: "rgba(253, 248, 236, 0.12)",
                  border: "1px solid rgba(237, 223, 184, 0.6)",
                  color: "#F8F1DC",
                }}
              >
                <Phone className="h-3.5 w-3.5" style={{ color: "#EDDFB8" }} />
                <span>{isSinhala ? config.couple.bride.nameOnlySi : config.couple.bride.firstNameEn}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Credits Bar */}
      <div className="px-4 py-7 text-center" style={{ background: "#5C400F" }}>
        <p className="text-[0.7rem] tracking-wide" style={{ color: "rgba(248, 241, 220, 0.65)" }}>
          Created with{" "}
          <Heart className="-mt-0.5 inline h-3 w-3" style={{ color: "#EDDFB8", fill: "#EDDFB8" }} />
          {" "}for {config.couple.groom.firstNameEn} &amp; {config.couple.bride.firstNameEn}&apos;s Wedding
        </p>
      </div>
    </>
  );
};
