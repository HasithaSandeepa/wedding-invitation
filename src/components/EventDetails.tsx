"use client";

import React, { useState } from "react";
import { CalendarDays, ChevronDown, Check } from "lucide-react";
import { useLanguage } from "./LanguageContext";

export const EventDetails: React.FC = () => {
  const { config, isSinhala } = useLanguage();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const handleDownloadIcs = () => {
    const startDate = "20270313T170000";
    const endDate = "20270313T230000";
    const summary = `${config.couple.bride.firstNameEn} & ${config.couple.groom.firstNameEn}'s Wedding`;
    const description = `Traditional Sri Lankan Wedding Celebration of ${config.couple.bride.fullNameEn} and ${config.couple.groom.fullNameEn}. Poruwa ceremony at 5:00 PM followed by dinner banquet.`;
    const location = `${config.event.venue.nameEn}, ${config.event.venue.hallEn}, ${config.event.venue.addressEn}`;

    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Traditional Sri Lankan Wedding Invitation//LK",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      `UID:wedding-${Date.now()}@invitation.lk`,
      `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").split(".")[0]}Z`,
      `DTSTART;TZID=Asia/Colombo:${startDate}`,
      `DTEND;TZID=Asia/Colombo:${endDate}`,
      `SUMMARY:${summary}`,
      `DESCRIPTION:${description}`,
      `LOCATION:${location}`,
      "STATUS:CONFIRMED",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "nimesh-dilhani-wedding.ics");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  const googleCalendarUrl = () => {
    const title = encodeURIComponent(`${config.couple.bride.firstNameEn} & ${config.couple.groom.firstNameEn}'s Wedding`);
    const details = encodeURIComponent(`Traditional Sri Lankan Wedding Celebration of ${config.couple.bride.fullNameEn} & ${config.couple.groom.fullNameEn}. Poruwa Ceremony: 5:00 PM.`);
    const location = encodeURIComponent(`${config.event.venue.nameEn}, ${config.event.venue.hallEn}, ${config.event.venue.addressEn}`);
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=20270313T113000Z/20270313T173000Z&details=${details}&location=${location}`;
  };

  return (
    <section id="events" className="mx-auto max-w-5xl px-6 py-9 sm:px-7 sm:py-12">
      <div className="mb-10 text-center sm:mb-14">
        <span
          className="mb-2 block text-[0.66rem] uppercase tracking-[0.34em]"
          style={{ fontFamily: "var(--font-montserrat)", color: "#B98A2F" }}
        >
          Event Details
        </span>

        <h2
          className="leading-tight"
          style={{
            fontFamily: "var(--font-sinhala)",
            fontWeight: 700,
            color: "#8C6420",
            fontSize: "clamp(1.7rem, 4.2vw, 2.6rem)",
          }}
        >
          {isSinhala ? "උත්සව විස්තර" : "Event Details"}
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

      {/* Arched Events Card */}
      <div className="mx-auto flex max-w-4xl flex-wrap justify-center gap-5 sm:gap-8">
        <div
          className="group flex w-full flex-col items-center gap-2 px-8 pb-10 pt-12 text-center sm:w-[calc((100%-2rem)/2)]"
          style={{
            background: "#FCF8EE",
            border: "1px solid rgba(185, 138, 47, 0.35)",
            borderRadius: "999px 999px 18px 18px",
            boxShadow: "0 16px 36px -26px rgba(120,86,30,0.45)",
          }}
        >
          <span
            className="mb-1 grid h-16 w-16 place-items-center rounded-full transition-transform duration-300 group-hover:scale-110"
            style={{
              background: "linear-gradient(150deg, #D8B45F, #B98A2F 55%, #8C6420)",
              color: "#FDF8EC",
              boxShadow: "0 10px 20px -10px rgba(120,86,30,0.7)",
            }}
          >
            <span aria-hidden="true" className="h-7 w-7 gpd-arch" style={{ color: "#FDF8EC" }} />
          </span>

          <h3
            style={{
              fontFamily: "var(--font-sinhala)",
              fontWeight: 700,
              color: "#8C6420",
              fontSize: "clamp(1.15rem, 3vw, 1.4rem)",
              lineHeight: 1.3,
            }}
          >
            {isSinhala ? "මංගල උත්සවය සහ පෝරුවේ චාරිත්‍රය" : "Wedding Ceremony & Poruwa Rituals"}
          </h3>

          <div
            style={{
              fontFamily: "var(--font-sinhala)",
              color: "#5A4A33",
              fontSize: "clamp(0.98rem, 2.4vw, 1.08rem)",
            }}
          >
            {isSinhala ? "කොළඹ හිල්ටන් හෝටලය - ග්‍රෑන්ඩ් බෝල්රූම්" : "Hilton Colombo - Grand Ballroom"}
          </div>

          <span className="my-1.5 h-px w-10" style={{ background: "#D8B45F" }} aria-hidden="true" />

          <p
            className="text-[0.95rem] leading-[1.8]"
            style={{ fontFamily: "var(--font-sinhala)", color: "#8A7A60" }}
          >
            {isSinhala ? (
              <>
                පෝරුවේ චාරිත්‍රය: ප.ව. 5.00 ට
                <br />
                ඉන් අනතුරුව මංගල භෝජන සංග්‍රහය
              </>
            ) : (
              <>
                Poruwa Ceremony: 5:00 PM
                <br />
                Followed by the Wedding Banquet
              </>
            )}
          </p>
        </div>
      </div>

      {/* Save to Calendar Button */}
      <div className="mx-auto mt-12 max-w-md">
        <div className="relative">
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              background: "#FCF8EE",
              border: "1px solid rgba(185, 138, 47, 0.4)",
              boxShadow: "0 18px 38px -28px rgba(140, 100, 32, 0.35)",
            }}
          >
            <button
              type="button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-full flex items-center text-left transition-colors hover:bg-white/40 focus:outline-none gap-4 px-4 sm:px-5 py-4"
            >
              <span
                className="flex-shrink-0 rounded-full flex items-center justify-center w-10 h-10"
                style={{ background: "linear-gradient(135deg, #B98A2F, #8C6420)" }}
              >
                <CalendarDays className="w-5 h-5 text-[#FDF8EC]" />
              </span>

              <span className="flex-1 min-w-0">
                <span
                  className="block leading-tight text-lg"
                  style={{ fontFamily: "var(--font-sinhala)", color: "#8C6420", fontWeight: 700 }}
                >
                  {isSinhala ? "දිනය සුරකින්න" : "Save the Date"}
                </span>
                <span className="block text-xs mt-0.5" style={{ color: "rgba(90, 74, 51, 0.65)" }}>
                  {isSinhala ? "ඔබගේ දින දර්ශනයට එක් කරන්න" : "Add to your calendar"}
                </span>
              </span>

              <span
                className="flex-shrink-0 rounded-full flex items-center justify-center w-8 h-8"
                style={{ backgroundColor: "rgba(140, 100, 32, 0.06)" }}
              >
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                  style={{ color: "#8C6420" }}
                />
              </span>
            </button>
          </div>

          {dropdownOpen && (
            <div
              className="absolute top-full left-0 right-0 mt-2 p-2 rounded-2xl z-30 text-left border"
              style={{
                background: "#FCF8EE",
                borderColor: "rgba(185, 138, 47, 0.4)",
                boxShadow: "0 18px 38px -20px rgba(120, 86, 30, 0.4)",
              }}
            >
              <a
                href={googleCalendarUrl()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setDropdownOpen(false)}
                className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl hover:bg-black/5 text-sm font-semibold transition-colors"
                style={{ fontFamily: "var(--font-sinhala)", color: "#8C6420" }}
              >
                <CalendarDays className="w-4 h-4" />
                <span>Google Calendar</span>
              </a>
              <button
                type="button"
                onClick={() => {
                  handleDownloadIcs();
                  setDropdownOpen(false);
                }}
                className="w-full flex items-center gap-2.5 px-4 py-2.5 rounded-xl hover:bg-black/5 text-sm font-semibold transition-colors"
                style={{ fontFamily: "var(--font-sinhala)", color: "#8C6420" }}
              >
                {downloaded ? <Check className="w-4 h-4" /> : <CalendarDays className="w-4 h-4" />}
                <span>{downloaded ? (isSinhala ? "බාගන්නා ලදී!" : "Downloaded!") : (isSinhala ? "Apple / Outlook (.ics බාගන්න)" : "Apple / Outlook (Download .ics)")}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
