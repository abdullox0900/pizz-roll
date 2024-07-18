import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

declare global {
    interface Window {
        Telegram: {
            WebApp: TelegramWebApp
        }
    }
}

const TelegramBackButton: React.FC = () => {

    const navigate = useNavigate()

    useEffect(() => {
        const telegram = (window as any).Telegram.WebApp

        if (telegram && telegram.BackButton) {
            telegram.BackButton.show()

            const handleBackClick = () => {
                navigate(-1)
            }

            telegram.BackButton.onClick(handleBackClick)

            return () => {
                telegram.BackButton.offClick(handleBackClick)
                // telegram.BackButton.hide()
            }
        }
    }, [])

    return null
}

export default TelegramBackButton