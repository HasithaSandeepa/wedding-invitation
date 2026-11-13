"use client";

import React from "react";
import { MapPin } from "lucide-react";
import { useLanguage } from "../LanguageContext";

export const VenueSection: React.FC = () => {
  const { config, isSinhala } = useLanguage();

  return (
    <section id="venue" className="mx-auto max-w-5xl px-6 py-9 sm:px-7 sm:py-12">
      <div className="mb-10 text-center sm:mb-14">
        <span
          className="mb-2 block text-[0.66rem] uppercase tracking-[0.34em]"
          style={{ fontFamily: "var(--font-montserrat)", color: "#B94658" }}
        >
          Location
        </span>

        <h2
          className="leading-tight"
          style={{
            fontFamily: "var(--font-sinhala)",
            fontWeight: 700,
            color: "#82273A",
            fontSize: "clamp(1.7rem, 4.2vw, 2.6rem)",
          }}
        >
          {isSinhala ? "උත්සව ස්ථානය" : "The Venue"}
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
      </div>

      <div className="flex flex-col gap-12 sm:gap-16">
        <div className="grid items-stretch gap-5 sm:gap-8 md:grid-cols-[0.85fr_1.15fr]">
          {/* Left: Hotel Details Card */}
          <div className="flex flex-col justify-center">
            <div
              className="flex flex-col items-center gap-3 px-8 py-9 text-center"
              style={{
                background: "#FFF5F4",
                border: "1px solid rgba(185, 70, 88, 0.35)",
                borderRadius: "26px 26px 18px 18px",
                boxShadow: "0 16px 36px -26px rgba(115,38,55,0.45)",
              }}
            >
              <img
                src={config.event.venue.image}
                alt={isSinhala ? config.event.venue.nameSi : config.event.venue.nameEn}
                width={991}
                height={1127}
                loading="lazy"
                draggable={false}
                className="mb-2 h-auto w-full max-w-[440px] select-none"
                style={{ opacity: 0.95 }}
              />

              <div className="flex flex-col gap-1">
                <span
                  className="text-[0.62rem] uppercase tracking-[0.3em]"
                  style={{ fontFamily: "var(--font-montserrat)", color: "#B94658" }}
                >
                  Venue
                </span>

                <h3
                  style={{
                    fontFamily: "var(--font-sinhala)",
                    fontWeight: 700,
                    color: "#82273A",
                    fontSize: "1.2rem",
                    lineHeight: 1.35,
                  }}
                >
                  {isSinhala ? config.event.venue.nameSi : config.event.venue.nameEn}
                </h3>

                <p
                  className="text-[0.95rem]"
                  style={{ fontFamily: "var(--font-sinhala)", color: "#906872" }}
                >
                  {isSinhala ? config.event.venue.addressSi : config.event.venue.addressEn}
                </p>
              </div>
            </div>
          </div>

          {/* Right: Map Embed and View on Map Button */}
          {config.event.venue.embedMapUrl ? <div className="flex flex-col gap-4">
            <div
              className="relative min-h-[300px] flex-1 overflow-hidden"
              style={{
                borderRadius: "18px",
                border: "1px solid rgba(185, 70, 88, 0.4)",
                boxShadow: "0 28px 56px -34px rgba(115,38,55,0.5)",
              }}
            >
              <iframe
                title="Homecoming venue map"
                src={config.event.venue.embedMapUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full border-0"
                style={{ filter: "grayscale(0.2) saturate(0.9)" }}
              />
            </div>

            <a
              href={config.event.venue.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 self-center rounded-full px-7 py-3 text-[0.95rem] transition-transform duration-200 hover:-translate-y-0.5 active:scale-95"
              style={{
                fontFamily: "var(--font-sinhala)",
                fontWeight: 600,
                background: "linear-gradient(135deg, #B94658, #82273A)",
                color: "#FFF7F2",
                boxShadow: "0 14px 26px -14px rgba(115,38,55,0.7)",
              }}
            >
              <MapPin className="h-4 w-4" aria-hidden="true" />
              <span>{isSinhala ? "සිතියමෙන් බලන්න" : "View on Google Maps"}</span>
            </a>
          </div> : <div className="flex items-center justify-center rounded-3xl border border-[#B94658]/30 p-8 text-center">Venue details will be announced soon.</div>}
        </div>
      </div>
    </section>
  );
};
