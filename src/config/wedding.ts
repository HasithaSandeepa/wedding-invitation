/**
 * Centralized Wedding Configuration
 * Exactly matching the Golden Poruwa traditional invitation assets and details.
 */

export interface WeddingConfig {
  couple: {
    groom: {
      firstNameEn: string;
      lastNameEn: string;
      fullNameEn: string;
      fullNameSi: string;
      nameOnlySi: string;
      parentsEn: string;
      parentsSi: string;
      phone: string;
    };
    bride: {
      firstNameEn: string;
      lastNameEn: string;
      fullNameEn: string;
      fullNameSi: string;
      nameOnlySi: string;
      parentsEn: string;
      parentsSi: string;
      phone: string;
    };
  };
  event: {
    weddingDate: string; // ISO 8601
    timeZone: string;
    year: string;
    monthEn: string;
    monthSi: string;
    day: string;
    month: string;
    time: string;
    dayOfWeekEn: string;
    dayOfWeekSi: string;
    timeEn: string;
    timeSi: string;
    traditionalAuspiciousTextSi: string;
    traditionalAuspiciousTextEn: string;
    ceremony: {
      titleEn: string;
      titleSi: string;
      poruwaTimeEn: string;
      poruwaTimeSi: string;
      receptionTimeEn: string;
      receptionTimeSi: string;
      dressCodeEn: string;
      dressCodeSi: string;
    };
    venue: {
      nameEn: string;
      nameSi: string;
      hallEn: string;
      hallSi: string;
      addressEn: string;
      addressSi: string;
      googleMapsUrl: string;
      embedMapUrl: string;
      image: string;
    };
  };
  rsvp: {
    deadlineDateEn: string;
    deadlineDateSi: string;
    deadlineIso: string;
    maxGuestsPerInvite: number;
    phoneGroom: string;
    phoneBride: string;
  };
  gallery: {
    id: string;
    titleEn: string;
    titleSi: string;
    src: string;
    alt: string;
    span?: string;
  }[];
  musicUrl: string;
}

export const weddingConfig: WeddingConfig = {
  couple: {
    groom: {
      firstNameEn: "Ashan",
      lastNameEn: "Madushanka",
      fullNameEn: "Ashan Madushanka",
      fullNameSi: "අෂාන් මදුෂංක",
      nameOnlySi: "අෂාන්",
      parentsEn:
        "Beloved son of\nMr. H. M. Karunarathna\n&\nMrs. R. M. Karunaseeli",
      parentsSi:
        "එච්. එම්. කරුණාරත්න මහතා හා\nආර්. එම්. කරුණාසීලි මැතිණියගේ\nආදරණිය පුත්",
      phone: "0713565356",
    },
    bride: {
      firstNameEn: "Gihani",
      lastNameEn: "Weerasekara",
      fullNameEn: "Gihani Weerasekara",
      fullNameSi: "ගිහානි වීරසේකර",
      nameOnlySi: "ගිහානි",
      parentsEn:
        "Beloved daughter of\nMr. W. M. Waidyarathna Weerasekara\n&\nMrs. A. A. Wasantha Amarasinghe",
      parentsSi:
        "ඩබ්ලිව්. එම්. වෛද්‍යරත්න වීරසේකර මහතා හා \nඒ. ඒ. වසන්තා අමරසිංහ මැතිණියගේ\nආදරණිය දියණිය",
      phone: "0711193710",
    },
  },
  event: {
    weddingDate: "2027-01-21T08:30:00+05:30",
    timeZone: "Asia/Colombo",
    year: "2027",
    monthEn: "January",
    monthSi: "ජනවාරි",
    day: "21",
    month: "01",
    time: "08:30 AM",
    dayOfWeekEn: "Thursday",
    dayOfWeekSi: "බ්‍රහස්පතින්දා",
    timeEn: "8:30 AM",
    timeSi: "පෙ.ව. 8.30",
    traditionalAuspiciousTextSi:
      "දෙදහස් විසිහතක් වු දුරුතු මස විසි එක් වන ගුරු දින\nපූර්ව භාග 08.30 ට යෙදෙන සුභ මොහොතින්\nසෝපාන මවුන්ට් වීව් හෝටල් පරිශ්‍රයේ දී",
    traditionalAuspiciousTextEn:
      "On Thursday, 21st of January\nTwo Thousand Twenty Seven\nat 8:30 AM\nat the Sopana Mount View Hotel premises",
    ceremony: {
      titleEn: "Wedding Ceremony & Poruwa Rituals",
      titleSi: "මංගල උත්සවය සහ පෝරුවේ චාරිත්‍රය",
      poruwaTimeEn: "Poruwa Ceremony: 8:30 AM",
      poruwaTimeSi: "පෝරුවේ චාරිත්‍රය: පෙ. ව. 8.30 ට",
      receptionTimeEn: "Followed by the Wedding Banquet",
      receptionTimeSi: "ඉන් අනතුරුව මංගල භෝජන සංග්‍රහය",
      dressCodeEn: "Traditional / Formal Attire",
      dressCodeSi: "සාම්ප්‍රදායික හෝ විධිමත් මංගල ඇඳුමින්",
    },
    venue: {
      nameEn: "Sopana Mount View Hotel Premises",
      nameSi: "සෝපාන මවුන්ට් වීව් හෝටල් පරිශ්‍රය",
      hallEn: "Sopana Mount View Hotel Premises",
      hallSi: "සෝපාන මවුන්ට් වීව් හෝටල් පරිශ්‍රය",
      addressEn: "Nuwara Eliya Road, Padinawela",
      addressSi: "නුවරඑළිය පාර, පාදිනාවෙල",
      googleMapsUrl: "https://maps.app.goo.gl/U29BopFc4oUgip5E7",

      embedMapUrl:
        "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3960.878934729669!2d80.84795017!3d6.90507785!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae478da33b1e3ab%3A0x360f0ba415023d0e!2sSopana%20Mount%20View!5e0!3m2!1sen!2slk!4v1794574152456!5m2!1sen!2slk",
      image: "/golden-poruwa-demo/wedding-hotel.png",
    },
  },
  rsvp: {
    deadlineDateEn: "January 02, 2027",
    deadlineDateSi: "2027 ජනවාරි 02",
    deadlineIso: "2027-01-02",
    maxGuestsPerInvite: 6,
    phoneGroom: "0713565356",
    phoneBride: "0711193710",
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
