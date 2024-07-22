import React, { useEffect, useState } from 'react'

const Info: React.FC = () => {

    const [chatId, setChatId] = useState<string | null>(null)
    const [userData, setUserData] = useState<any | null>(null)


    // useEffect hook to initialize Telegram WebApp and set chat ID
    useEffect(() => {
        const tg = window.Telegram.WebApp
        tg.MainButton.text = "Changed Text"
        if (tg.initDataUnsafe && tg.initDataUnsafe.user) {
            setChatId(tg.initDataUnsafe.user.id.toString())
        }
    }, [])

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                if (chatId) {
                    const response = await fetch(`https://pizza-webapp-server.onrender.com/users/${chatId}`)
                    const data = await response.json()
                    setUserData(data)
                }
            } catch (error) {
                console.error('Error fetching user data:', error)
            }
        }

        fetchUserData()
    }, [])



    return (
        <div>
            <h1>Chat ID: {chatId}</h1>
            <span>{userData}</span>
        </div>
    )
}

export default Info
