import React from 'react'

const Button = ({ id, onClick }) => {
    const config = {
        book: {
            className: "flex justify-end inline-block px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300",
            type: "button",
            text: "Book",
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
            text: "Clear",
            type: "button",
        },
        delete: {
            className: "text-red-500 hover:underline",
            text: "Delete",
            type: "button",
        },
        searchButton: {
            className: " bg-blue-500 text-white p-2 rounded",
            text: "Search",
            type: "button",
        },
        continue: {
            className: "flex justify-end inline-block mt-4 text-white bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded-lg",
            text: "Continue",
            type: "button",
        },
    };

    const buttonConfig = config[id];
   

    if (!buttonConfig) {
        return null; // Or render a default button or an error message
    }

    const { className, type, text } = buttonConfig;

    return (
        <button className={className} type={type} onClick={onClick}>
            {text}
        </button>
    );
};

export default Button;
