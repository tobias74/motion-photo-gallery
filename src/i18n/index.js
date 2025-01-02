import { createI18n } from "vue-i18n";

export const defaultLocale = "en";

export const supportedLocales = {
  en: { name: "English" },
  de: { name: "Deutsch" },
};

let _i18n;

// Sets the active locale.
function setLocale(newLocale) {
  _i18n.global.locale = newLocale;
}

let messages = {
  en: {
    "Extract MotionPhotos": "Extract MotionPhotos",
    "PSD Thumbnails": "Extract PSD Thumbnails",
    privacy: "Privacy",
    imprint: "Imprint",
    startPageHeadline: "This is a tool to extract motion photos stored in your image files captured with your smartphone.",
    startPageDescription:
      "Your files are processed locally on your computer. Since the videos are transcoded within your browser your computer will consume above average energy and might get hot.",
    psdPageHeadline: "This is a tool to extract thumbnails from your PSD files.",
    psdPageDescription:
      "Your PSD files are processed locally on your computer. Since the files are processed within your browser your computer will consume above average energy and might get hot.",
  },

  de: {
    "Extract MotionPhotos": "MotionPhotos extrahieren",
    "PSD Thumbnails": "PSD Thumbnails extrahieren",
    privacy: "Datenschutz",
    imprint: "Impressum",
    startPageHeadline: "Dieses Webtool extrahiert Videoclips aus sogenannten 'Motion-Photos' oder auch 'Bewegungsfotos'.",
    startPageDescription: "Die Videoclips werden lokal auf Ihrem Computer extrahiert, es werden keine Bilddaten an den Server übertragen.",
    psdPageHeadline: "Dieses Webtool extrahiert Thumbnails aus PSD-Dateien.",
    psdPageDescription: "Die PSD-Dateien werden lokal auf Ihrem Computer verarbeitet, es werden keine Bilddaten an den Server übertragen.",
  },
};

function setup(options = { locale: defaultLocale }) {
  _i18n = createI18n({
    locale: options.locale,
    fallbackLocale: defaultLocale,
    messages,
  });
  setLocale(options.locale);
  return _i18n;
}

export default {
  // Expose the VueI18n instance via a getter
  get vueI18n() {
    return _i18n;
  },
  setup,
  setLocale,
};
