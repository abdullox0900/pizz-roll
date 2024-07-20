import confetti from 'canvas-confetti'
import React, { useEffect, useState } from 'react'
import './BonusNotification.css'

const BonusNotification: React.FC = () => {
    const [visible, setVisible] = useState<boolean>(true)

    useEffect(() => {
        if (visible) {
            // Define a function to trigger confetti
            const triggerConfetti = () => {
                confetti({
                    origin: { x: Math.random(), y: Math.random() },
                })
            }

            // Trigger confetti in a synchronized and slower manner
            const intervals = [0, 1000, 2000, 3000] // Interval times in milliseconds
            intervals.forEach((interval, index) => {
                setTimeout(() => {
                    triggerConfetti()
                }, interval)
            })

            // Hide notification after 7 seconds
            const timer = setTimeout(() => {
                setVisible(false)
            }, 7000)

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
