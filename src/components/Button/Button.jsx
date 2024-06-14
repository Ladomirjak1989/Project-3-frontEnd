import React from 'react'

const Button = ({ id }) => {

    const config = {
        book: {
            className: "inline-block px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300",
            type: "button",
            text: "Book",

        }

    }
    const { className, type, text } = config[id]
    return (
        <button className={className} type={type} >
            {text} 
            </button>
    )
}

export default Button