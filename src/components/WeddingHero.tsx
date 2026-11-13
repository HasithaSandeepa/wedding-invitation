"use client";

import React from "react";
import { useLanguage } from "./LanguageContext";

export const WeddingHero: React.FC = () => {
  const { config, isSinhala } = useLanguage();

  return (
    <section id="hero" className="relative overflow-hidden pb-0">
      {/* Top Crowning Mandala */}
      <div
        className="pointer-events-none relative mx-auto flex justify-center"
        aria-hidden="true"
      >
        <div
          style={{
            width: "min(72vw, 520px)",
            height: "min(72vw, 520px)",
            marginTop: "calc(min(72vw, 520px) / -2)",
          }}
        >
          <div className="gpd-mandala" style={{ opacity: 0.9 }} />
        </div>
      </div>

      <div className="relative mx-auto max-w-2xl px-6 text-center sm:px-8">
        {/* Main Heading */}
        <div>
          <h1
            aria-label="සාදර ඇරයුමයි !"
            className="-mt-1"
            style={{
              fontSize: "clamp(2.1rem, 8.5vw, 3.4rem)",
              lineHeight: 1.6,
              paddingBlock: "0.12em",
              marginBlock: "-0.12em",
              backgroundImage:
                "linear-gradient(170deg, #D8B45F 0%, #B98A2F 45%, #8C6420 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              fontWeight: 700,
              fontFamily: "var(--font-sinhala)",
            }}
          >
            {isSinhala ? "සාදර ඇරයුමයි !" : "Heartfelt Invitation!"}
          </h1>
        </div>

        {/* Auspicious Ceremony Statement */}
        <p
          className="mx-auto mt-5 max-w-[46ch] text-[0.98rem] leading-[1.78] sm:text-[1.06rem]"
          style={{
            fontFamily: "var(--font-sinhala)",
            color: "#5A4A33",
            whiteSpace: "pre-line",
          }}
        >
          {isSinhala
            ? config.event.traditionalAuspiciousTextSi
            : config.event.traditionalAuspiciousTextEn}
        </p>

        {/* 2-Column Parents and Couple Introduction */}
        <div className="mt-7 grid grid-cols-2 gap-5 sm:gap-10">
          {/* Bride Intro */}
          <div className="flex flex-col items-center gap-3">
            <p
              className="text-[0.95rem] leading-[1.8] sm:text-base"
              style={{
                fontFamily: "var(--font-sinhala)",
                color: "#5A4A33",
                whiteSpace: "pre-line",
              }}
            >
              {isSinhala
                ? config.couple.bride.parentsSi
                : config.couple.bride.parentsEn}
            </p>
            <p
              className="mt-auto"
              style={{
                fontFamily: "var(--font-sinhala)",
                fontWeight: 700,
                color: "#8C6420",
                fontSize: "clamp(1.7rem, 5.2vw, 2.5rem)",
                lineHeight: 1.15,
              }}
            >
              {isSinhala
                ? config.couple.bride.nameOnlySi
                : config.couple.bride.firstNameEn}
            </p>
          </div>

          {/* Groom Intro */}
          <div className="flex flex-col items-center gap-3">
            <p
              className="text-[0.95rem] leading-[1.8] sm:text-base"
              style={{
                fontFamily: "var(--font-sinhala)",
                color: "#5A4A33",
                whiteSpace: "pre-line",
              }}
            >
              {isSinhala
                ? config.couple.groom.parentsSi
                : config.couple.groom.parentsEn}
            </p>
            <p
              className="mt-auto"
              style={{
                fontFamily: "var(--font-sinhala)",
                fontWeight: 700,
                color: "#8C6420",
                fontSize: "clamp(1.7rem, 5.2vw, 2.5rem)",
                lineHeight: 1.15,
              }}
            >
              {isSinhala
                ? config.couple.groom.nameOnlySi
                : config.couple.groom.firstNameEn}
            </p>
          </div>
        </div>

        {/* Couple Portrait with Radial Aura */}
        <div className="relative mx-auto mt-7 w-[min(84%,440px)]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{
              width: "150%",
              height: "128%",
              zIndex: 0,
              background:
                "radial-gradient(60% 58% at 50% 46%, rgba(252, 248, 238, 0.96) 0%, rgba(252, 248, 238, 0.85) 38%, rgba(252, 248, 238, 0.5) 62%, rgba(252, 248, 238, 0) 82%)",
            }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-[8%] left-1/2 -translate-x-1/2"
            style={{
              width: "62%",
              height: "9%",
              zIndex: 1,
              borderRadius: "50%",
              background:
                "radial-gradient(50% 50% at 50% 50%, rgba(140, 100, 32, 0.22) 0%, rgba(140, 100, 32, 0) 70%)",
              filter: "blur(4px)",
            }}
          />
          <img
            src="/golden-poruwa-demo/couple-wedding.png"
            alt={`${config.couple.bride.firstNameEn} සහ ${config.couple.groom.firstNameEn}`}
            loading="eager"
            draggable="false"
            className="relative z-[2] w-full select-none"
          />
        </div>

        {/* Joining Statement */}
        <p
          className="mx-auto mt-2 max-w-[36ch] text-[1.02rem] leading-[1.9]"
          style={{
            fontFamily: "var(--font-sinhala)",
            color: "#5A4A33",
          }}
        >
          {isSinhala
            ? "අතිනත ගන්නට ලක ලෑස්තියි."
            : "Are joining their hands in sacred marriage."}
        </p>

        {/* Date Display */}
        <div className="mt-3">
          <div
            style={{
              fontFamily: "var(--font-serif)",
              fontWeight: 600,
              color: "#8C6420",
              fontSize: "clamp(1.3rem, 3.4vw, 1.8rem)",
              letterSpacing: "0.18em",
            }}
          >
            {config.event.year}
          </div>

          <div className="mx-auto mt-1.5 flex max-w-md items-center justify-center gap-4 sm:gap-6">
            <span
              className="flex-1 py-1.5 text-center"
              style={{
                fontFamily: "var(--font-sinhala)",
                fontWeight: 700,
                color: "#5A4A33",
                fontSize: "clamp(1.05rem, 2.8vw, 1.3rem)",
                borderTop: "1.5px solid rgba(140, 100, 32, 0.85)",
                borderBottom: "1.5px solid rgba(140, 100, 32, 0.85)",
              }}
            >
              {isSinhala ? config.event.monthSi : config.event.monthEn}
            </span>

            <span
              style={{
                fontFamily: "var(--font-serif)",
                fontWeight: 700,
                color: "#8C6420",
                fontSize: "clamp(3rem, 10vw, 4.4rem)",
                lineHeight: 0.95,
              }}
            >
              {config.event.day}
            </span>

            <span
              className="flex-1 py-1.5 text-center"
              style={{
                fontFamily: "var(--font-sinhala)",
                fontWeight: 700,
                color: "#5A4A33",
                fontSize: "clamp(1.05rem, 2.8vw, 1.3rem)",
                borderTop: "1.5px solid rgba(140, 100, 32, 0.85)",
                borderBottom: "1.5px solid rgba(140, 100, 32, 0.85)",
              }}
            >
              {isSinhala ? config.event.dayOfWeekSi : config.event.dayOfWeekEn}
            </span>
          </div>

          <div
            className="mt-2.5 text-[1rem]"
            style={{
              fontFamily: "var(--font-sinhala)",
              color: "#5A4A33",
            }}
          >
            {isSinhala ? config.event.timeSi : config.event.timeEn}
          </div>
        </div>

        {/* Heartfelt Sinhala Blessing Verse */}
        <div className="mt-6 flex flex-col items-center gap-1.5">
          <p
            className="mx-auto max-w-[44ch] text-[1.02rem] leading-[1.95] sm:text-[1.08rem]"
            style={{
              fontFamily: "var(--font-sinhala)",
              color: "#5A4A33",
              whiteSpace: "pre-line",
            }}
          >
            {isSinhala
              ? `සනුහරේ නෑදෑ හිතමිතුරන්ගේ ආදරය හා ආශීර්වාදය මධ්‍යයේ,\nමංගල පෝරුව මස්තකයේදී අතිනත ගෙන,\nජීවිතයේ නව සුන්දර ගමනක් අරඹන ඒ සොඳුරු මොහොතේ,\nඔබේ සෙනෙහසේ උණුසුමත්, ආදරණීය ආශීර්වාදයත් සමඟින් අප හා එක්වන ලෙස,\nඔබට සෙනෙහසින් ඇරයුම් කරමු.`
              : `As we step onto the sacred Poruwa and pledge our vows,\nwe warmly invite you to join us\nand share in the joy and blessings of our union.`}
          </p>
        </div>
      </div>
    </section>
  );
};
