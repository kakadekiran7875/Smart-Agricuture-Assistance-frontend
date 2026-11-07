/**
 * Smart Agriculture Assistant - Multilingual Localization (i18n) Engine
 * Supported Languages: English (en), Marathi (mr), Hindi (hi), Kannada (kn)
 */

export const translations = {
    en: {
        appTitle: "Smart Agriculture Assistant",
        appSubtitle: "स्मार्ट कृषी सहाय्यक",
        navHome: "Home",
        navCropRec: "Crop Recommendation",
        navDisease: "Disease Detection",
        navWeather: "Weather",
        navMarket: "Market Prices",
        navSoil: "Soil & IoT",
        navSchemes: "Government Schemes",
        navAbout: "About Us",
        navLanguage: "Language",
        navLogin: "Login",
        navStarted: "Register",
        heroTitle: "Grow Smarter, Farm Better.",
        heroDesc: "Empowering Indian farmers with intelligent crop recommendations, plant disease detection, live weather updates and agricultural market insights in your local language."
    },
    mr: {
        appTitle: "स्मार्ट कृषी सहाय्यक",
        appSubtitle: "Smart Agriculture Assistant",
        navHome: "मुख्यपृष्ठ",
        navCropRec: "पीक शिफारस",
        navDisease: "रोग शोधणे",
        navWeather: "हवामान",
        navMarket: "बाजार भाव",
        navSoil: "माती आणि आयओटी",
        navSchemes: "शासकीय योजना",
        navAbout: "आमच्याबद्दल",
        navLanguage: "भाषा",
        navLogin: "लॉगिन",
        navStarted: "नोंदणी करा",
        heroTitle: "स्मार्ट शेती, समृद्ध शेतकरी!",
        heroDesc: "एआय-आधारित पीक शिफारसी, वनस्पतींचे रोग शोधणे, हवामान अंदाज आणि बाजार भावाची अचूक माहिती मिळवा मराठीमध्ये."
    },
    hi: {
        appTitle: "स्मार्ट कृषि सहायक",
        appSubtitle: "Smart Agriculture Assistant",
        navHome: "मुख्यपृष्ठ",
        navCropRec: "फसल सिफारिश",
        navDisease: "रोग पहचान",
        navWeather: "मौसम",
        navMarket: "बाजार भाव",
        navSoil: "मिट्टी और IoT",
        navSchemes: "सरकारी योजनाएं",
        navAbout: "हमारे बारे में",
        navLanguage: "भाषा",
        navLogin: "लॉगिन",
        navStarted: "पंजीकरण",
        heroTitle: "स्मार्ट खेती, बेहतर भविष्य!",
        heroDesc: "एआई-संचालित फसल सिफारिशें, पौधों के रोगों की पहचान, सटीक मौसम और मंडी भाव की जानकारी पाएं अपनी भाषा में।"
    },
    kn: {
        appTitle: "ಸ್ಮಾರ್ಟ್ ಕೃಷಿ ಸಹಾಯಕ",
        appSubtitle: "Smart Agriculture Assistant",
        navHome: "ಮುಖಪುಟ",
        navCropRec: "ಬೆಳೆ ಶಿಫಾರಸು",
        navDisease: "ರೋಗ ಪತ್ತೆ",
        navWeather: "ಹವಾಮಾನ",
        navMarket: "ಮಾರುಕಟ್ಟೆ ದರಗಳು",
        navSoil: "ಮಣ್ಣು ಮತ್ತು IoT",
        navSchemes: "ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು",
        navAbout: "ನಮ್ಮ ಬಗ್ಗೆ",
        navLanguage: "ಭಾಷೆ",
        navLogin: "ಲಾಗಿನ್",
        navStarted: "ನೋಂದಣಿ",
        heroTitle: "ಸ್ಮಾರ್ಟ್ ಕೃಷಿ, ಉತ್ತಮ ಇಳುವರಿ!",
        heroDesc: "ನಿಮ್ಮ ಸ್ಥಳೀಯ ಭಾಷೆಯಲ್ಲಿ AI-ಚಾಲಿತ ಬೆಳೆ ಶಿಫಾರಸುಗಳು, ರೋಗ ಪತ್ತೆ ಮತ್ತು ಮಾರುಕಟ್ಟೆ ದರಗಳ ಮಾಹಿತಿ ಪಡೆಯಿರಿ."
    }
};

const LANG_STORAGE_KEY = 'preferredLanguage';

export class I18nManager {
    constructor() {
        this.currentLang = localStorage.getItem(LANG_STORAGE_KEY) || 'en';
        this.labels = {
            en: 'English',
            mr: 'मराठी',
            hi: 'हिन्दी',
            kn: 'ಕನ್ನಡ'
        };
    }

    setLanguage(langCode) {
        if (!translations[langCode]) return;
        this.currentLang = langCode;
        localStorage.setItem(LANG_STORAGE_KEY, langCode);
        this.updateUI();
    }

    updateUI() {
        const dict = translations[this.currentLang];
        if (!dict) return;

        // Update current language label in header
        const labelEl = document.getElementById('currentLangLabel');
        if (labelEl && this.labels[this.currentLang]) {
            labelEl.textContent = this.labels[this.currentLang];
        }

        // Update elements matching dictionary keys
        Object.keys(dict).forEach(key => {
            const el = document.getElementById(key);
            if (el) {
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    el.placeholder = dict[key];
                } else if (key === 'navLoginBtn') {
                    el.innerHTML = `<i class="fa-solid fa-arrow-right-to-bracket" style="margin-right: 0.35rem;"></i> ${dict[key]}`;
                } else if (key === 'navRegisterBtn') {
                    el.innerHTML = `<i class="fa-solid fa-user-plus" style="margin-right: 0.35rem;"></i> ${dict[key]}`;
                } else {
                    el.textContent = dict[key];
                }
            }
        });

        // Update data-attribute localized elements
        document.querySelectorAll('.btn-text').forEach(btn => {
            const val = btn.getAttribute(`data-${this.currentLang}`);
            if (val) btn.textContent = val;
        });

        // Update active class in language dropdown
        document.querySelectorAll('.lang-option-btn').forEach(btn => {
            const onClickAttr = btn.getAttribute('onclick') || '';
            btn.classList.toggle('active', onClickAttr.includes(`'${this.currentLang}'`));
        });
    }
}

export const i18n = new I18nManager();

// Expose globally for legacy inline HTML onclick handlers
if (typeof window !== 'undefined') {
    window.changeLanguage = (langCode) => i18n.setLanguage(langCode);
}

export default i18n;

