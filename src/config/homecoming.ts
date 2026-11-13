import { weddingConfig, type WeddingConfig } from "./wedding";

/**
 * Edit only this file when Homecoming date, venue, and wording are confirmed.
 * Empty event date / map URLs intentionally hide calendar, countdown, and map links.
 * The wedding config and its existing invitation links are not modified.
 */
export const homecomingConfig: WeddingConfig = {
  ...weddingConfig,

  event: {
    weddingDate: "2027-03-13T17:00:00+05:30",
    timeZone: "Asia/Colombo",
    year: "2027",
    monthEn: "March",
    monthSi: "මාර්තු",
    day: "13",
    dayOfWeekEn: "Saturday",
    dayOfWeekSi: "සෙනසුරාදා",
    timeEn: "5:00 PM",
    timeSi: "ප.ව. 5.00",
    traditionalAuspiciousTextSi:
      "දෙදහස් විසිහතක් වු මැදින් මස දහතුන් වන සෙනසුරාදා\nඅපරභාග 5.00ට යෙදෙන සුභමොහොතින්\nකොළඹ හිල්ටන් හෝටලයේ\nග්‍රෑන්ඩ් බෝල්රූම් හීදී",
    traditionalAuspiciousTextEn:
      "On Saturday, the 13th of March Two Thousand Twenty Seven\nat 5:00 in the evening\nat The Grand Ballroom, Hilton Colombo",
    ceremony: {
      titleEn: "Wedding Ceremony & Poruwa Rituals",
      titleSi: "මංගල උත්සවය සහ පෝරුවේ චාරිත්‍රය",
      poruwaTimeEn: "Poruwa Ceremony: 5:00 PM",
      poruwaTimeSi: "පෝරුවේ චාරිත්‍රය: ප.ව. 5.00 ට",
      receptionTimeEn: "Followed by the Wedding Banquet",
      receptionTimeSi: "ඉන් අනතුරුව මංගල භෝජන සංග්‍රහය",
      dressCodeEn: "Traditional / Formal Attire",
      dressCodeSi: "සාම්ප්‍රදායික හෝ විධිමත් මංගල ඇඳුමින්",
    },
    venue: {
      nameEn: "Hilton Colombo (Grand Ballroom)",
      nameSi: "කොළඹ හිල්ටන් හෝටලය (ග්‍රෑන්ඩ් බෝල්රූම්)",
      hallEn: "Grand Ballroom",
      hallSi: "ග්‍රෑන්ඩ් බෝල්රූම්",
      addressEn: "No. 2, Sir Chittampalam A Gardiner Mawatha, Colombo 02",
      addressSi: "අංක 2, සර් චිත්තම්පලම් ඒ ගාඩිනර් මාවත, කොළඹ 2.",
      googleMapsUrl:
        "https://www.google.com/maps/search/?api=1&query=Hilton%20Colombo%2C%202%20Sir%20Chittampalam%20A%20Gardiner%20Mawatha%2C%20Colombo%2000200",
      embedMapUrl:
        "https://maps.google.com/maps?q=Hilton%20Colombo%2C%202%20Sir%20Chittampalam%20A%20Gardiner%20Mawatha%2C%20Colombo%2000200&z=14&hl=en&output=embed",
      image: "/golden-poruwa-demo/homecoming-hotel.png",
    },
  },
  rsvp: {
    deadlineDateEn: "February 20, 2027",
    deadlineDateSi: "2027 පෙබරවාරි 20",
    deadlineIso: "2027-02-20",
    maxGuestsPerInvite: 6,
    phoneGroom: "0713456789",
    phoneBride: "0772345678",
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
