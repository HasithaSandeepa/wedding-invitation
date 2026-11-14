import { weddingConfig, type WeddingConfig } from "./wedding";

/** Homecoming-specific content. Shared couple identity lives in wedding.ts.
 * Edit the event, RSVP, gallery and music here without changing the wedding design.
 */
export const homecomingConfig: WeddingConfig = {
  ...weddingConfig,

  event: {
    weddingDate: "2027-01-23T10:00:00+05:30",
    timeZone: "Asia/Colombo",
    year: "2027",
    monthEn: "January",
    monthSi: "ජනවාරි",
    day: "23",
    month: "01",
    time: "10:00 AM",
    dayOfWeekEn: "Saturday",
    dayOfWeekSi: "සෙනසුරාදා",
    timeEn: "10:00 AM",
    timeSi: "පෙ.ව. 10.00",
    traditionalAuspiciousTextSi:
      "දෙදහස් විසිහතක් වු දුරුතු මස විසි තුන්වන සෙනසුරාදා\nපෙරවරු 10.00ට\nබණ්ඩාරවෙල තේ ට්‍රී රිසෝට් පරිශ්‍රයේදී",
    traditionalAuspiciousTextEn:
      "On Saturday, the 23rd of January Two Thousand Twenty Seven\nat 10:00 in the morning\nat The Tea Tree Resort, Bandarawela",
    ceremony: {
      titleEn: "Homecoming Celebration",
      titleSi: "නිවසට කැන්දන් ඒමේ උත්සවය",
      poruwaTimeEn: "Homecoming Celebration: 10:00 AM",
      poruwaTimeSi: "නිවසට කැන්දන් ඒමේ උත්සවය: පෙ.ව. 10.00",
      receptionTimeEn: "Followed by the Homecoming Reception",
      receptionTimeSi: "ඉන් අනතුරුව භෝජන සංග්‍රහය",
      dressCodeEn: "Traditional / Formal Attire",
      dressCodeSi: "සාම්ප්‍රදායික හෝ විධිමත් ඇඳුමින්",
    },
    venue: {
      nameEn: "The Tea Tree Resort",
      nameSi: "ද ටී ට්‍රී රිසෝට්",
      hallEn: "The Tea Tree Resort",
      hallSi: "ද ටී ට්‍රී රිසෝට්",
      addressEn: "Kithal Ella Road, Heeloya, Bandarawela",
      addressSi: "කිතල් ඇල්ල පාර, හීල්ඔය, බණ්ඩාරවෙල",
      googleMapsUrl: "https://maps.app.goo.gl/MEYGPovFdeKAawVe8",
      embedMapUrl: "https://maps.google.com/maps?q=The%20Tea%20Tree%20Resort%2C%20Kithal%20Ella%20Road%2C%20Heeloya%2C%20Bandarawela&z=15&output=embed",
      image: "/golden-poruwa-demo/homecoming-hotel.png",
    },
  },
  rsvp: {
    deadlineDateEn: "January 22, 2027",
    deadlineDateSi: "2027 ජනවාරි 22",
    deadlineIso: "2027-01-22",
    maxGuestsPerInvite: 6,
    phoneGroom: weddingConfig.couple.groom.phone,
    phoneBride: weddingConfig.couple.bride.phone,
  },
  gallery: [
    {
      id: "preshoot-1",
      titleEn: "Moments of Love",
      titleSi: "ආදරණීය මතක",
      src: "/golden-poruwa-demo/gallery/preshoot-1.webp",
      alt: "Couple in traditional Kandyan wedding attire",
      span: "row-span-2",
    },
    {
      id: "preshoot-2",
      titleEn: "Together Forever",
      titleSi: "සදාකාලික බැඳීම",
      src: "/golden-poruwa-demo/gallery/preshoot-2.webp",
      alt: "Couple smiling together",
    },
    {
      id: "preshoot-3",
      titleEn: "Golden Sunset",
      titleSi: "රන්වන් සැඳෑව",
      src: "/golden-poruwa-demo/gallery/preshoot-3.webp",
      alt: "Romantic sunset portrait",
    },
    {
      id: "preshoot-4",
      titleEn: "The Journey Begins",
      titleSi: "නව දිවි ගමනක ඇරඹුම",
      src: "/golden-poruwa-demo/gallery/preshoot-4.webp",
      alt: "Traditional wedding rings and vows",
      span: "row-span-2",
    },
    {
      id: "preshoot-5",
      titleEn: "Sweet Smiles",
      titleSi: "සිනහ රැඳි මුහුණු",
      src: "/golden-poruwa-demo/gallery/preshoot-5.webp",
      alt: "Joyful couple portrait",
    },
    {
      id: "preshoot-6",
      titleEn: "Sacred Bond",
      titleSi: "පාරිශුද්ධ පෙම් සෙනෙහස",
      src: "/golden-poruwa-demo/gallery/preshoot-6.webp",
      alt: "Poruwa blessings and traditional garland",
    },
  ],
  musicUrl: "/golden-poruwa/music.mp3",
};
