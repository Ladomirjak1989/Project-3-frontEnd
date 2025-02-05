import { useEffect, useState } from "react";


export default function useToken() {
    const [token, setToken] = useState(null);
    useEffect(() => {
        const token = document.cookie
            .split('; ')
            .find((item) => {

                return item.startsWith('token=')

            })
            ?.split('=')[1]
        if (token) {
            setToken(token)
            localStorage.setItem('token', token)
        }
    })

}