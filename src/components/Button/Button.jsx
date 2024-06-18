import React from 'react'

const Button = ({ id, onClick }) => {
    const config = {
        book: {
            className: "inline-block px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300",
            type: "button",
            text: "Book",
        },
        updatedFlight: {
            className: "text-blue-500 hover:underline",
            type: "submit",
            text: "Updated",
        },
        createFlight: {
            className: "bg-blue-500 text-white p-2 rounded",
            type: "submit",
            text: "Create",
        },
        clearFlight: {
            className: " bg-grey-500 text-white p-2 rounded",
            text: "Clear",
            type: "button",
        },
        deleteFlight: {
            className: "text-red-500 hover:underline",
            text: "Delete",
            type: "button",
        },
        searchButton: {
            className: " bg-blue-500 text-white p-2 rounded",
            text: "Search",
            type: "button",
        }
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
