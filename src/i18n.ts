import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpBackend from "i18next-http-backend";
import common_es from "./assets/i18n/es/common.json";
import common_en from "./assets/i18n/en/common.json";


i18n
    .use(initReactI18next)
    .use(LanguageDetector)
    .use(HttpBackend)
    .init({
        fallbackLng: "es",
        lng: "es",
        debug: true,
        interpolation: {
            escapeValue: false,
        },
        resources: {
            es: {
                common: common_es,
            },
            en: {
                common: common_en,
            },
        },
        ns: ["common"],
        defaultNS: "common",
    });

export default i18n;