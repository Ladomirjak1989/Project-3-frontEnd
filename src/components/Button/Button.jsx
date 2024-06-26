import React from 'react'

const Button = ({ id, onClick }) => {
    const config = {
        book: {
            className: "flex justify-end inline-block px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300",
            type: "button",
            text: "BOOK",
        },
        updated: {
            className: "bg-blue-500 text-white p-2 rounded",
            type: "submit",
            text: "Updated",
        },
        create: {
            className: "bg-blue-500 text-white p-2 rounded",
            type: "submit",
            text: "Create",
        },
        clear: {
            className: "  bg-gray-700 text-white p-2 px-6 m-4 rounded",
            text: "CLEAR",
            type: "button",
        },
        delete: {
            className: "text-red-500 hover:underline",
            text: "Delete",
            type: "button",
        },
        searchButton: {
            className: " bg-blue-500 text-white p-2 px-6 m-4 rounded",
            text: "SEARCH",
            type: "submit",
        },
        continue: {
            className: "flex justify-end inline-block mt-4 text-white bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded-lg",
            text: "CONTINUE",
            type: "button",
        },
        send: {
            className: "px-4 py-2 bg-sky-300 rounded-r-lg hover:bg-sky-400 transition duration-300",
            text: "SEND",
            type: "submit",
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
            text: "Update",
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
    };

    const buttonConfig = config[id];


    if (!buttonConfig) {
        return null; // Or render a default button or an error message
    }

    const { className, type, text, isDisabled } = buttonConfig;
    

    return (
        <button disabled={isDisabled ? isDisabled : false} className={className} type={type} onClick={onClick}>
            {text}
        </button>
    );
};

export default Button;
