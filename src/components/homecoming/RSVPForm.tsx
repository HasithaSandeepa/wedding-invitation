"use client";

import React, { useEffect, useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { useLanguage } from "../LanguageContext";

export const RSVPForm: React.FC<{ invitationToken?: string; eventId?: "wedding" | "homecoming" }> = ({ invitationToken, eventId = "homecoming" }) => {
  const { isSinhala } = useLanguage();
  const [name, setName] = useState("");
  const [maxAttendees, setMaxAttendees] = useState(1);
  const [loading, setLoading] = useState(!!invitationToken);
  const [loadError, setLoadError] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    if (!invitationToken) return;
    fetch(`/api/invite/${eventId}/${encodeURIComponent(invitationToken)}`, { cache: 'no-store' })
      .then(async (r) => { if (!r.ok) throw Error('This invitation link is invalid or unavailable.'); return r.json(); })
      .then((data) => { setName(data.name); setMaxAttendees(data.maxAttendees); setGuests(data.attendingCount || 1); setAttending(data.status !== 'declined'); })
      .catch((e) => setLoadError(e.message || 'Could not load invitation'))
      .finally(() => setLoading(false));
  }, [invitationToken, eventId]);
  const [attending, setAttending] = useState<boolean | null>(true);
  const [guests, setGuests] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!invitationToken || !name.trim()) return;
    setError("");

    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/invite/${eventId}/${encodeURIComponent(invitationToken)}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: attending ? "confirmed" : "declined",
          attendingCount: attending ? guests : 0,
        }),
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body.error || 'Unable to save RSVP');
      setSubmitted(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Unable to save RSVP');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="rsvp"
      className="px-6 py-9 sm:px-7 sm:py-12"
      style={{ background: "rgba(245, 197, 200, 0.4)" }}
    >
      <div className="mx-auto max-w-xl text-center">
        <span
          className="mb-2 block text-[0.66rem] uppercase tracking-[0.34em]"
          style={{ fontFamily: "var(--font-montserrat)", color: "#B94658" }}
        >
          RSVP
        </span>

        <h2
          style={{
            fontFamily: "var(--font-sinhala)",
            fontWeight: 700,
            color: "#82273A",
            fontSize: "clamp(1.6rem, 4vw, 2.3rem)",
          }}
        >
          {isSinhala ? "පැමිණීම දන්වන්න" : "Confirm Attendance"}
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

        <p
          className="mx-auto mb-2 mt-5 max-w-[44ch] leading-[1.85]"
          style={{ fontFamily: "var(--font-sinhala)", color: "#906872" }}
        >
          {isSinhala
            ? "අනිවාර්යයෙන්ම 5ට එන්න. එන නොඑන වග කියන්න."
            : eventId === "homecoming" ? "Please let us know whether you will join us for the homecoming celebration." : "Please let us know whether you will be joining us by 5:00 PM."}
        </p>

        <p
          className="mb-9 text-[0.95rem]"
          style={{ fontFamily: "var(--font-sinhala)", fontWeight: 600, color: "#82273A" }}
        >
          {isSinhala
            ? eventId === "homecoming" ? "කරුණාකර ඔබගේ පැමිණීම තහවුරු කරන්න" : "ඔබගේ පැමිණීම 2027 පෙබරවාරි 20 දිනට පෙර කරුණාකර දන්වන්න"
            : eventId === "homecoming" ? "Please confirm your attendance." : "Please respond before February 20, 2027"}
        </p>

        {!invitationToken ? (
          <div className="rounded-xl border border-[#B94658]/40 p-8 text-center text-[#82273A] bg-[#FFF5F4]">Please open your personalized invitation link to respond.</div>
        ) : loading ? (
          <div className="p-8 text-center">Loading your family invitation…</div>
        ) : loadError ? (
          <div className="p-8 text-center text-red-800" role="alert">{loadError}</div>
        ) : submitted ? (
          <div
            className="rounded-[120px_120px_22px_22px] px-6 py-16 text-center sm:px-12"
            style={{
              background: "#FFF5F4",
              border: "1px solid rgba(185, 70, 88, 0.4)",
              boxShadow: "0 30px 60px -40px rgba(115,38,55,0.45)",
            }}
          >
            <CheckCircle2 className="w-12 h-12 text-[#82273A] mx-auto mb-3" />
            <h3
              className="text-xl font-bold mb-2"
              style={{ fontFamily: "var(--font-sinhala)", color: "#82273A" }}
            >
              {isSinhala ? "ස්තූතියි!" : "Thank You!"}
            </h3>
            <p
              className="text-sm text-[#59353C]"
              style={{ fontFamily: "var(--font-sinhala)" }}
            >
              {isSinhala
                ? "ඔබගේ පිළිතුර සාර්ථකව සටහන් කරගන්නා ලදී."
                : "Your response has been recorded successfully."}
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="rounded-[120px_120px_22px_22px] px-6 pb-10 pt-16 text-left sm:px-12 sm:pt-20"
            style={{
              background: "#FFF5F4",
              border: "1px solid rgba(185, 70, 88, 0.4)",
              boxShadow: "0 30px 60px -40px rgba(115,38,55,0.45)",
            }}
          >
            <div className="mb-5 rounded-lg border border-[#B94658]/40 bg-[#F9EDEE]/50 px-4 py-3 text-center">
              <p className="text-xs uppercase tracking-wide text-[#906872]">Family Invitation</p>
              <p className="font-semibold text-[#82273A]">{name} &amp; Family</p>
              <p className="text-xs text-[#906872]">Up to {maxAttendees} attendee{maxAttendees !== 1 ? 's' : ''}</p>
            </div>

            {/* Attendance Toggle */}
            <div className="mb-5">
              <p
                className="mb-2.5 text-[0.9rem]"
                style={{
                  fontFamily: "var(--font-sinhala)",
                  fontWeight: 600,
                  color: "#82273A",
                }}
              >
                {isSinhala ? "සහභාගි වෙනවාද?" : "Attending?"}
              </p>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setAttending(true)}
                  className="flex-1 px-3 py-3.5 text-center transition-colors"
                  style={{
                    borderRadius: "10px",
                    border: "1px solid rgba(185, 70, 88, 0.45)",
                    background: attending === true ? "linear-gradient(135deg, #B94658, #82273A)" : "transparent",
                    color: attending === true ? "#FFF7F2" : "#906872",
                    fontFamily: "var(--font-sinhala)",
                    fontWeight: 600,
                  }}
                >
                  {isSinhala ? "සතුටින් සහභාගි වෙමි" : "Joyfully Accept"}
                </button>
                <button
                  type="button"
                  onClick={() => setAttending(false)}
                  className="flex-1 px-3 py-3.5 text-center transition-colors"
                  style={{
                    borderRadius: "10px",
                    border: "1px solid rgba(185, 70, 88, 0.45)",
                    background: attending === false ? "#82273A" : "transparent",
                    color: attending === false ? "#FFF7F2" : "#906872",
                    fontFamily: "var(--font-sinhala)",
                    fontWeight: 600,
                  }}
                >
                  {isSinhala ? "සහභාගි විය නොහැක" : "Regretfully Decline"}
                </button>
              </div>
            </div>

            {/* Guest Count */}
            {attending && (
              <div className="mb-5">
                <p
                  className="mb-2.5 text-[0.9rem]"
                  style={{
                    fontFamily: "var(--font-sinhala)",
                    fontWeight: 600,
                    color: "#82273A",
                  }}
                >
                  {isSinhala ? "පැමිණෙන ගණන" : "Number of Guests"}
                </p>
                <div className="flex items-center justify-center gap-6">
                  <button
                    type="button"
                    onClick={() => setGuests((g) => Math.max(1, g - 1))}
                    className="grid h-11 w-11 place-items-center rounded-full text-xl transition-all hover:opacity-80 active:scale-90"
                    style={{
                      background: "rgba(185, 70, 88, 0.12)",
                      color: "#82273A",
                      border: "1px solid rgba(185, 70, 88, 0.5)",
                    }}
                    aria-label="Decrease guest count"
                  >
                    -
                  </button>
                  <span
                    className="leading-none"
                    style={{
                      fontFamily: "var(--font-serif)",
                      color: "#82273A",
                      fontSize: "2.6rem",
                      minWidth: "3rem",
                      textAlign: "center",
                    }}
                  >
                    {guests}
                  </span>
                  <button
                    type="button"
                    onClick={() => setGuests((g) => Math.min(maxAttendees, g + 1))}
                    className="grid h-11 w-11 place-items-center rounded-full text-xl transition-all hover:opacity-80 active:scale-90"
                    style={{
                      background: "rgba(185, 70, 88, 0.12)",
                      color: "#82273A",
                      border: "1px solid rgba(185, 70, 88, 0.5)",
                    }}
                    aria-label="Increase guest count"
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            {error && <p role="alert" className="mb-4 text-center text-sm text-red-800">{error}</p>}
            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex w-full items-center justify-center gap-2.5 rounded-full py-4 text-[1.02rem] transition-transform duration-200 hover:-translate-y-0.5 active:scale-95 disabled:opacity-60"
              style={{
                fontFamily: "var(--font-sinhala)",
                fontWeight: 700,
                background: "linear-gradient(135deg, #B94658, #82273A)",
                color: "#FFF7F2",
                boxShadow: "0 14px 30px -12px rgba(115,38,55,0.6)",
              }}
            >
              <Send className="h-4 w-4" />
              <span>{isSubmitting ? (isSinhala ? "යවමින් පවතී..." : "Sending...") : (isSinhala ? "පිළිතුර යවන්න" : "Send Response")}</span>
            </button>
          </form>
        )}
      </div>
    </section>
  );
};
