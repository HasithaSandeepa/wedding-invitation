export type Language = "si" | "en";

export interface Translations {
  opening: {
    badge: string;
    invitationGreeting: string;
    coupleConnector: string;
    openButton: string;
    tapToOpen: string;
    subText: string;
  };
  hero: {
    traditionalHeader: string;
    groomParentsIntro: string;
    brideParentsIntro: string;
    joiningHands: string;
    auspiciousMoment: string;
    warmInvitationPoem: string;
    at: string;
  };
  countdown: {
    badge: string;
    title: string;
    subtitle: string;
    days: string;
    hours: string;
    minutes: string;
    seconds: string;
    eventStarted: string;
    eventEnded: string;
  };
  events: {
    badge: string;
    title: string;
    poruwaTitle: string;
    receptionTitle: string;
    timeLabel: string;
    dressCodeLabel: string;
    saveToCalendar: string;
    calendarSaved: string;
    calendarDesc: string;
    googleCalendar: string;
    appleCalendar: string;
    outlookCalendar: string;
    downloadIcs: string;
  };
  gallery: {
    badge: string;
    title: string;
    subtitle: string;
    viewPhoto: string;
    close: string;
    previous: string;
    next: string;
  };
  venue: {
    badge: string;
    title: string;
    hall: string;
    address: string;
    viewMapButton: string;
    getDirections: string;
    landmark: string;
  };
  rsvp: {
    badge: string;
    title: string;
    description: string;
    deadlineNote: string;
    nameLabel: string;
    namePlaceholder: string;
    attendanceLabel: string;
    acceptOption: string;
    declineOption: string;
    guestCountLabel: string;
    phoneLabel: string;
    phonePlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    submitButton: string;
    submitting: string;
    successTitle: string;
    successMessage: string;
    declineMessage: string;
    errorTitle: string;
    errorMessage: string;
    validationName: string;
    validationAttendance: string;
    devStorageNotice: string;
  };
  footer: {
    saveTheDate: string;
    blessing: string;
    callGroom: string;
    callBride: string;
    familyBlessing: string;
    copyright: string;
  };
  nav: {
    home: string;
    events: string;
    gallery: string;
    venue: string;
    rsvp: string;
  };
  music: {
    play: string;
    pause: string;
    title: string;
  };
}

export const translations: Record<Language, Translations> = {
  si: {
    opening: {
      badge: "සාම්ප්‍රදායික මංගල ඇරයුම",
      invitationGreeting: "සාදර ඇරයුමයි !",
      coupleConnector: "සහ",
      openButton: "ආරාධනය විවෘත කරන්න",
      tapToOpen: "සුබ මංගල ඇරයුම කියවීමට මෙහි ඔබන්න",
      subText: "ශ්‍රී ලාංකීය සම්ප්‍රදායික පෝරු මංගලෝත්සවය",
    },
    hero: {
      traditionalHeader: "සාදර ඇරයුමයි !",
      groomParentsIntro: "රංජිත් ප්‍රනාන්දු හා එම මැතිණියගේ\nආදරණිය පුත්",
      brideParentsIntro: "සුනිල් පෙරේරා හා එම මැතිණියගේ\nආදරණිය දියණිය",
      joiningHands: "අතිනත ගන්නට ලක ලැස්තිය.",
      auspiciousMoment: "සුභ මොහොතින්",
      warmInvitationPoem: "සනුහරේ නෑදෑ හිත මිතුරන් අතරින්\nඔබේ සෙනෙහසේ උණුහුම එදින\nමංගල පෝරු මස්තකයේ හිඳ විඳින්නට\nඔබට සෙනෙහසින් ඇරයුම් කරමු.",
      at: "ප.ව.",
    },
    countdown: {
      badge: "COUNTDOWN",
      title: "සුබ මොහොත එළඹෙන තුරු",
      subtitle: "මංගල දිනය උදාවීමට ඉතිරිව ඇති කාලය",
      days: "දින",
      hours: "පැය",
      minutes: "මිනිත්තු",
      seconds: "තත්පර",
      eventStarted: "මංගල උත්සවය දැන් ආරම්භ වී ඇත!",
      eventEnded: "සුබ මංගලෝත්සවය සාර්ථකව නිමාවට පත්විය. සුබ පැතුම්!",
    },
    events: {
      badge: "EVENT DETAILS",
      title: "උත්සව විස්තර",
      poruwaTitle: "මංගල උත්සවය සහ පෝරුවේ චාරිත්‍රය",
      receptionTitle: "මංගල භෝජන සංග්‍රහය සහ සැඳෑ සාදය",
      timeLabel: "වේලාව",
      dressCodeLabel: "ඇඳුම් විලාසිතාව",
      saveToCalendar: "දිනය සුරකින්න",
      calendarSaved: "දින දර්ශනයට එක් කරගන්න",
      calendarDesc: "ඔබගේ දුරකථනයේ Calendar එකට එක් කරගන්න",
      googleCalendar: "Google Calendar",
      appleCalendar: "Apple / Outlook (.ics)",
      outlookCalendar: "Outlook Online",
      downloadIcs: "iCalendar ගොනුව බාගන්න",
    },
    gallery: {
      badge: "GALLERY",
      title: "ඡායාරූප එකතුව",
      subtitle: "අපගේ සුන්දර මංගල පෙර සේයාරූ පෙළ",
      viewPhoto: "විශාල කර බලන්න",
      close: "වසන්න",
      previous: "පෙර ඡායාරූපය",
      next: "මීළඟ ඡායාරූපය",
    },
    venue: {
      badge: "LOCATION",
      title: "උත්සව ස්ථානය",
      hall: "ග්‍රෑන්ඩ් බෝල්රූම්",
      address: "අංක 2, සර් චිත්තම්පලම් ඒ ගාඩිනර් මාවත, කොළඹ 02",
      viewMapButton: "සිතියමෙන් බලන්න",
      getDirections: "පැමිණීමට මාර්ග සිතියම",
      landmark: "කොළඹ හිල්ටන් හෝටලය",
    },
    rsvp: {
      badge: "RSVP",
      title: "පැමිණීම දන්වන්න",
      description: "ඔබගේ සුබපැතුම් සහ ආශිර්වාදය අපට මහත් ශක්තියකි.",
      deadlineNote: "ඔබගේ පැමිණීම 2027 පෙබරවාරි 20 දිනට පෙර කරුණාකර දන්වන්න",
      nameLabel: "සම්පූර්ණ නම",
      namePlaceholder: "ඔබගේ සම්පූර්ණ නම මෙහි සටහන් කරන්න",
      attendanceLabel: "ඔබ සහභාගි වන්නේද?",
      acceptOption: "සතුටින් සහභාගි වෙමි",
      declineOption: "සහභාගි විය නොහැක",
      guestCountLabel: "පැමිණෙන ගණන (ඔබත් ඇතුළුව)",
      phoneLabel: "දුරකථන අංකය (විකල්ප)",
      phonePlaceholder: "උදා: 077 123 4567",
      messageLabel: "සුභ පැතුම් හෝ විශේෂ සටහනක් (විකල්ප)",
      messagePlaceholder: "නව යුවලට ඔබේ හදපිරි සුබපැතුම් එක්කරන්න...",
      submitButton: "පිළිතුර යවන්න",
      submitting: "පිළිතුර යවමින් පවතී...",
      successTitle: "ස්තූතියි!",
      successMessage: "ඔබගේ පිළිතුර සාර්ථකව සටහන් කරගන්නා ලදී. මංගල දිනයේ ඔබව සාදරයෙන් පිළිගනිමු!",
      declineMessage: "ඔබට සහභාගි විය නොහැකි වුවද ඔබ දැක්වූ සුහදශීලී ප්‍රතිචාරයට හදවතින්ම ස්තූතියි!",
      errorTitle: "දෝෂයක් සිදුවිය",
      errorMessage: "කරුණාකර නැවත උත්සාහ කරන්න හෝ දුරකථනයෙන් අපව අමතන්න.",
      validationName: "කරුණාකර ඔබගේ නම ඇතුළත් කරන්න",
      validationAttendance: "කරුණාකර ඔබගේ සහභාගිත්වය තෝරන්න",
      devStorageNotice: "ප්‍රතිචාරය දේශීය පද්ධතියේ සහ ආරක්ෂිතව සටහන් කරගන්නා ලදී.",
    },
    footer: {
      saveTheDate: "SAVE THE DATE",
      blessing: "ආදරයෙන්, දෙපවුලේ ආරාධනයයි",
      callGroom: "නිමේශ් අමතන්න",
      callBride: "දිල්හානි අමතන්න",
      familyBlessing: "ජය මංගලම්! ඔබ සැමට ආශිර්වාද වේවා!",
      copyright: "Traditional Sri Lankan Digital Wedding Invitation",
    },
    nav: {
      home: "මුල් පිටුව",
      events: "විස්තර",
      gallery: "ඡායාරූප",
      venue: "ස්ථානය",
      rsvp: "RSVP",
    },
    music: {
      play: "සංගීතය වාදනය කරන්න",
      pause: "සංගීතය නවත්වන්න",
      title: "මංගල තනුව",
    },
  },
  en: {
    opening: {
      badge: "TRADITIONAL WEDDING INVITATION",
      invitationGreeting: "Cordially Invited",
      coupleConnector: "AND",
      openButton: "Open Invitation",
      tapToOpen: "Tap to unveil the wedding invitation",
      subText: "A Sri Lankan Traditional Poruwa Wedding Celebration",
    },
    hero: {
      traditionalHeader: "With Joyful Hearts",
      groomParentsIntro: "Beloved son of\nMr. Ranjith Fernando & Mrs. Malini Fernando",
      brideParentsIntro: "Beloved daughter of\nMr. Sunil Perera & Mrs. Kanthi Perera",
      joiningHands: "Request the pleasure of your company to celebrate their wedding.",
      auspiciousMoment: "At the Auspicious Hour",
      warmInvitationPoem: "As we step onto the sacred Poruwa and pledge our lifelong vows,\nwe warmly invite you and your family\nto share in the blessing of our union.",
      at: "at",
    },
    countdown: {
      badge: "COUNTDOWN",
      title: "Awaiting The Auspicious Moment",
      subtitle: "Counting down the moments until our union",
      days: "Days",
      hours: "Hours",
      minutes: "Minutes",
      seconds: "Seconds",
      eventStarted: "The wedding celebration has commenced!",
      eventEnded: "The wedding ceremony has concluded. Thank you for your love & blessings!",
    },
    events: {
      badge: "EVENT DETAILS",
      title: "Wedding Program & Ceremonies",
      poruwaTitle: "Poruwa Ceremony & Traditional Customs",
      receptionTitle: "Wedding Banquet & Evening Reception",
      timeLabel: "Time",
      dressCodeLabel: "Dress Code",
      saveToCalendar: "Save the Date",
      calendarSaved: "Add to Calendar",
      calendarDesc: "Keep the date saved in your personal device calendar",
      googleCalendar: "Google Calendar",
      appleCalendar: "Apple / Outlook (.ics)",
      outlookCalendar: "Outlook Online",
      downloadIcs: "Download iCalendar File",
    },
    gallery: {
      badge: "PHOTO GALLERY",
      title: "Our Cherished Moments",
      subtitle: "A glimpse of our journey together leading to forever",
      viewPhoto: "View photo",
      close: "Close",
      previous: "Previous",
      next: "Next",
    },
    venue: {
      badge: "LOCATION",
      title: "The Wedding Venue",
      hall: "Grand Ballroom",
      address: "No. 2, Sir Chittampalam A. Gardiner Mawatha, Colombo 02, Sri Lanka",
      viewMapButton: "View on Google Maps",
      getDirections: "Get Driving Directions",
      landmark: "Hilton Colombo",
    },
    rsvp: {
      badge: "RSVP",
      title: "Confirm Your Attendance",
      description: "Your presence and blessings will make our special day truly memorable.",
      deadlineNote: "Kindly respond by February 20, 2027",
      nameLabel: "Full Name",
      namePlaceholder: "Enter your full name",
      attendanceLabel: "Will you be attending?",
      acceptOption: "Joyfully Accepts",
      declineOption: "Regretfully Declines",
      guestCountLabel: "Number of Guests (including yourself)",
      phoneLabel: "Phone Number (Optional)",
      phonePlaceholder: "e.g. +94 77 123 4567",
      messageLabel: "Wishes or Dietary Notes (Optional)",
      messagePlaceholder: "Write a warm wish or special dietary requirement...",
      submitButton: "Send Response",
      submitting: "Submitting...",
      successTitle: "Response Received!",
      successMessage: "Thank you for confirming your presence. We look forward to celebrating together!",
      declineMessage: "Thank you for letting us know. You will be missed dearly!",
      errorTitle: "Submission Error",
      errorMessage: "An error occurred while submitting your response. Please try again or contact us directly.",
      validationName: "Please enter your full name",
      validationAttendance: "Please select whether you will be attending",
      devStorageNotice: "Response saved securely in the wedding invitation registry.",
    },
    footer: {
      saveTheDate: "SAVE THE DATE",
      blessing: "With Love & Blessings, From Both Families",
      callGroom: "Call Nimesh",
      callBride: "Call Dilhani",
      familyBlessing: "May joy, prosperity, and peace be with you!",
      copyright: "Traditional Sri Lankan Digital Wedding Invitation",
    },
    nav: {
      home: "Home",
      events: "Events",
      gallery: "Gallery",
      venue: "Venue",
      rsvp: "RSVP",
    },
    music: {
      play: "Play ambient music",
      pause: "Pause music",
      title: "Traditional Melody",
    },
  },
};
