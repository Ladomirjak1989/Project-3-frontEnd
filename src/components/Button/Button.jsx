import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import translateChatGPT from '../../utils/helpers';
import { useSelector } from 'react-redux';


const Button = ({ id, onClick }) => {
    const { t } = useTranslation();
    const currentLang = useSelector(state => state.language.language)

    const [btnText, setBtnText] = useState("")

    const config = {
        book: {
            className: "flex justify-end inline-block px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300",
            type: "button",
            // text: `${t('button.homeMainBookButton')}`,
               text: "ADD TO CART",
        },
        updated: {
            className: "bg-blue-500 text-white p-2 rounded",
            type: "submit",
            text: "UPDATE",
        },
        create: {
            className: "bg-blue-500 text-white p-2 rounded",
            type: "submit",
            text: "CREATE",
        },
        clear: {
            className: "bg-gray-500 text-white p-2 px-6 m-4 rounded hover:bg-gray-700",
            text: "CLEAR",
            type: `${t('button.searchClear')}`,
        },
        delete: {
            className: "text-red-500 hover:underline",
            text: "DELETE",
            type: "button",
        },
        searchButton: {
            className: " bg-blue-500 hover:bg-blue-700 text-white p-2 px-6 m-4 rounded",
            text: "SEARCH",
            type: `${t('button.searchButton')}`,
        },
        continue: {
            className: "bg-blue-600 hover:bg-blue-700 text-white p-2 px-6 m-4 rounded",
            text: "CONTINUE",
            type: "button",
        },
        send: {
            className: "px-4 py-2 bg-sky-300 rounded-r-lg hover:bg-sky-400 transition duration-300",
            text: "SEND",
            type: `${t('button.footerMessageSend')}`,
        },
        apply: {
            className: "px-4 py-2 bg-sky-300 rounded-r-lg hover:bg-sky-400 transition duration-300",
            text: "APPLY",
            type: "button",
        },
        continueToPayment: {
            className: "flex justify-end mt-4 text-white bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded-lg",
            text: "CONTINUE TO PAYMENT",
            type: "submit",
        },
        submitPayment: {
            className: "w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md shadow-sm hover:bg-blue-600",
            text: "SUBMIT PAYMENT",
            type: "submit",
        },
        isProcessing: {
            className: "w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md shadow-sm hover:bg-blue-600",
            text: "Processing...",
            type: "submit",
            isDisabled: true
        },
        demoUser: {
            className: "flex justify-center inline-block px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300",
            text: "Demo-user",
            type: "button",

        },
        demoAdmin: {
            className: "flex justify-center inline-block px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300",
            text: "Demo-admin",
            type: "button",

        },
        deleteAccount: {
            className: "flex justify-between items-center text-sm text-red-600 hover:underline",
            text: "Delete Account ",
            type: "button",

        },
        signOut: {
            className: "flex justify-between items-center text-sm text-red-600 hover:underline",
            text: "Sign out",
            type: "button",

        },
        update: {
            className: "bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700",
            text: "UPDATE",
            type: "button",

        },
        createAccount: {
            className: "bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700",
            text: "Create Account",
            type: "button",

        },
        goHome: {
            className: "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded",
            text: "GO HOME",
            type: "button",

        },
        sendMessage: {
            className: "p-3 bg-orange-500 text-white font-bold rounded hover:bg-orange-600",
            text: "SEND MESSAGE",
            type: "submit",

        },
        clearCart: {
            className: "bg-gray-700 text-white p-2 px-6 m-4 rounded",
            text: "CLEAR CART",
            type: "button",

        },
        remove: {
            className: "bg-gray-700 text-white p-2 px-6 m-4 rounded",
            text: "REMOVE",
            type: "button",

        },
        profileForm: {
            className: "bg-gray-700 text-white p-2 px-6 m-4 rounded",
            text: "UPDATE PROFILE",
            type: "submit",

        },
        changePassword: {
            className: "bg-green-700 text-white p-2 px-6 m-4 rounded",
            text: "CHANGE PASSWORD",
            type: "submit",

        },
        showUpdateProfile: {
            className: "bg-blue-600 text-white p-2 px-6 m-4 rounded hover:bg-blue-700",
            text: "UPDATE PROFILE",
            type: "button",

        },
        showUpdatePassword: {
            className: "bg-green-600 text-white p-2 px-6 m-4 rounded hover:bg-green-700",
            text: "UPDATE PASSWORD",
            type: "button",

        },
        deleteProfile: {
            className: "bg-red-600 text-white p-2 px-6 m-4 rounded hover:bg-red-700",
            text: "DELETE PROFILE",
            type: "button",

        },
        showMore: {
            className: "bg-gray-700 text-white px-3 m-3 rounded",
            text: "Show more...",
            type: `${t('button.homeMainShowMore')}`,
        },
       accept: {
            className: "bg-blue-900 text-white p-2 px-2 m-6 rounded hover:bg-blue-700",
            text: "Accept",
            type: "submit",

        },
        refuse: {
            className: "bg-blue-900 text-white p-2 px-2 m-6 rounded hover:bg-blue-700",
            text: "Refuse",
            type: "submit",

        },
        saveSelection: {
            className: "bg-blue-900 text-white p-2 px-2 m-6 rounded hover:bg-blue-700",
            text: "Save selection",
            type: "submit",

        },

        attractionSearch: {
            className: "bg-blue-500 text-white font-bold p-4 rounded-r-full text-lg transition-colors hover:bg-blue-600",
            text: "SEARCH",
            type: "submit",

        },
    };

    const buttonConfig = config[id];


    if (!buttonConfig) {
        return null; // Or render a default button or an error message
    }

    const { className, type, text, isDisabled } = buttonConfig;

    useEffect(() => {
        const init = async () => {
            const translatedText = await translateChatGPT(text, currentLang)
            setBtnText(translatedText)
        }
        if (currentLang !== "en") {
            init()
        }
        if (currentLang === "en") {
            setBtnText(text)
        }

    }, [currentLang])
    return (
        <button disabled={isDisabled ? isDisabled : false} className={className} type={type} onClick={onClick}>
            {btnText}

        </button>
    );

};

export default Button;
