import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import uk from "../../assets/flags/uk.png";
import de from "../../assets/flags/de.png";
import es from "../../assets/flags/es.webp";
import fr from "../../assets/flags/fr.webp";
import hu from "../../assets/flags/hu1.webp";
import pt from "../../assets/flags/pt.png";
import sk from "../../assets/flags/sk.png";
import pl from "../../assets/flags/pl1.gif";
import nl from "../../assets/flags/nl.webp";
import en from "../../assets/flags/en.jpg";
import { useNavigate } from 'react-router-dom';
import {setCurrentLang} from "../../Store/Slices/languageSliceReducer" 
import { useDispatch, useSelector } from 'react-redux';



const LanguageChange = () => {
    const lang = useSelector(state=>state.language.language)
    // const { lang } = useParams(); // Get the current language from the URL
    const navigate = useNavigate(); // Get the navigate function from react-router

    const { i18n } = useTranslation();
    const [selectedLanguage, setSelectedLanguage] = useState(lang || "en");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dispatch = useDispatch()

    const handleLanguageSelect = (code) => {
        setSelectedLanguage(code);
        i18n.changeLanguage(code);
        navigate(`/${code}` + window.location.pathname.substring(3)); // Update the URL with the new language code
        localStorage.setItem('lang', code);
        setIsDropdownOpen(false); // Close dropdown after selection
        dispatch(setCurrentLang(code))
    };

    // Language options with corresponding flags and names
    const configLanguages = [
        { code: "en", name: "English", flag: en },
        { code: "uk", name: "Ukrainian", flag: uk },
        { code: "de", name: "German", flag: de },
        { code: "es", name: "Spanish", flag: es },
        { code: "fr", name: "French", flag: fr },
        { code: "hu", name: "Hungarian", flag: hu },
        { code: "pt", name: "Portuguese", flag: pt },
        { code: "sk", name: "Slovak", flag: sk },
        { code: "pl", name: "Polish", flag: pl },
        { code: "nl", name: "Dutch", flag: nl }
    ];

    return (
        <div className="relative inline-block text-left w-36">
            {/* Selected language with flag */}
            <div
                className="flex items-center cursor-pointer bg-gray-100 border rounded-md p-2 shadow-md hover:bg-gray-200 hover:scale-105 transition-transform duration-200"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
                <img
                    src={configLanguages.find((lang) => lang.code === selectedLanguage)?.flag}
                    alt="selected flag"
                    className="w-6 h-6 mr-2"
                />
                <span>{configLanguages.find((lang) => lang.code === selectedLanguage)?.name}</span>
                <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"

                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </div>

            {/* Custom dropdown options */}
            {isDropdownOpen && (
                <div className="absolute mt-1 bg-white border border-gray-200 rounded-md shadow-lg w-full z-10">
                    {configLanguages.map((lang) => (
                        <div
                            key={lang.code}
                            className="flex items-center p-2 cursor-pointer hover:bg-gray-100"
                            onClick={() => handleLanguageSelect(lang.code)}
                        >
                            <img src={lang.flag} alt={`${lang.name} flag`} className="w-6 h-6 mr-2" />
                            <span>{lang.name}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LanguageChange;



