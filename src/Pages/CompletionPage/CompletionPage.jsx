import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


const CompletionPage = () => {
    const navigate = useNavigate()
    useEffect(() => {
        setTimeout(() => {
            navigate("/")
        }, 5000)


    }, [])
    return (

        <div>✅ Payment Was Successful!</div>
    )
}

export default CompletionPage