import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import es from './locales/es.json';
import de from "./locales/de.json";
import fr from "./locales/fr.json";
import hu from "./locales/hu.json";
import nl from "./locales/nl.json";
import pl from "./locales/pl.json";
import pt from "./locales/pt.json";
import sk from "./locales/sk.json";
import uk from "./locales/uk.json";


i18n
  .use(initReactI18next) // Passes i18n down to React components
  .init({
    resources: {
      en: { translation: en },
      es: { translation: es },
      de: { translation: de },
      fr: { translation: fr },
      hu: { translation: hu },
      nl: { translation: nl },
      pl: { translation: pl },
      pt: { translation: pt },
      sk: { translation: sk },
      uk: { translation: uk },
    },
    lng: 'en', // Default language
    fallbackLng: 'en', // Fallback language if the chosen language is not available
    interpolation: {
      escapeValue: false, // React already escapes values
    },
  });

export default i18n;
