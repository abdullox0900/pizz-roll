import React, { useEffect } from 'react'

declare global {
    interface Window {
        Telegram: {
            WebApp: TelegramWebApp
        }
    }
}

const TelegramBackButton: React.FC = () => {
    useEffect(() => {
        const telegram = (window as any).Telegram.WebApp

        if (telegram && telegram.BackButton) {
            telegram.BackButton.show()

            const handleBackClick = () => {
                console.log('Orqaga tugmasi bosildi')
            }

            telegram.BackButton.onClick(handleBackClick)

            return () => {
                telegram.BackButton.offClick(handleBackClick)
                telegram.BackButton.hide()
            }
        }
    }, [])

    return null
}

export default TelegramBackButton