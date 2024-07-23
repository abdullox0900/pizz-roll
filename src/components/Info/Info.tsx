import React, { useEffect, useState } from 'react'
import { PiUserCircleDuotone } from 'react-icons/pi'
import { TbMoneybag } from 'react-icons/tb'
import MainSection from '../MainSection/MainSection'

interface User {
    id: string
    telegramId: string
    bonus: number
    name: string
    username: string
    profilePic: string
    createdAt: string
}

const Info: React.FC = () => {

    const [chatId, setChatId] = useState<string | null>(null)
    const [userData, setUserData] = useState<User | null>(null)

    // useEffect hook to initialize Telegram WebApp and set chat ID
    useEffect(() => {
        const tg = window.Telegram.WebApp
        tg.MainButton.text = "Changed Text"
        if (tg.initDataUnsafe && tg.initDataUnsafe.user) {
            setChatId(tg.initDataUnsafe.user.id.toString())
        }
    }, [])

    useEffect(() => {
        if (chatId) {
            fetch(`https://pizza-webapp-server.onrender.com/users/${chatId}`)
                .then((res) => {
                    if (!res.ok) {
                        throw new Error('Network response was not ok')
                    }
                    return res.json()
                })
                .then((data) => {
                    setUserData(data)
                })
                .catch((error) => {
                    console.error('There has been a problem with your fetch operation:', error)
                })
        }
    }, [chatId])

    return (
        <div>
            <MainSection>
                <div className='flex items-center justify-between bg-tg-theme-secondary-bg p-[10px] mb-[15px] rounded-[15px]'>
                    <div className='flex gap-[5px] items-center'>
                        <PiUserCircleDuotone className='text-[24px] text-tg-theme-text' />
                        <span className='text-[14px] font-semibold text-tg-theme-text'>{userData?.name || 'No Name'}</span>
                        {userData?.telegramId}
                    </div>
                    <div className='flex gap-[5px] items-center'>
                        <span className='text-[14px] text-tg-theme-text'>Bonus:</span>
                        <span className='flex items-center text-[12px] font-bold text-green-500'>
                            <TbMoneybag className='text-[14px] text-tg-theme-button' />{userData?.bonus || 0}
                        </span>
                    </div>
                </div>
            </MainSection>
        </div>
    )
}

export default Info
