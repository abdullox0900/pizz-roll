import confetti from 'canvas-confetti'
import React, { useEffect, useState } from 'react'
import './BonusNotification.css'

const BonusNotification: React.FC = () => {
    const [visible, setVisible] = useState<boolean>(true)

    useEffect(() => {
        if (visible) {
            // Confetti effektini sekinroq va ko'proq vaqt davomida ko'rsatish
            const triggerConfetti = () => {
                confetti({
                    particleCount: 50,
                    spread: 70,
                    origin: { y: 0.6 },
                    gravity: 1.5,
                    scalar: 1.2,
                    ticks: 2000
                })
            }

            // Confetti effektini bir necha marta ishga tushirish
            const intervals = [0, 1000, 1000]
            intervals.forEach((interval) => {
                setTimeout(triggerConfetti, interval)
            })

            // Xabarnomani 10 soniyadan keyin yashirish
            const timer = setTimeout(() => {
                setVisible(false)
            }, 10000)

            return () => clearTimeout(timer)
        }
    }, [visible])

    return (
        <div className={`notification ${visible ? 'show' : 'hide'}`}>
            <p>Вам начислен <span className="bonus-amount">500</span> бонусов!</p>
        </div>
    )
}

export default BonusNotification