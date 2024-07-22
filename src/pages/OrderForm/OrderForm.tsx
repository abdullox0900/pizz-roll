// import { Checkbox } from 'antd'
import React, { useEffect, useState } from 'react'
import InputMask from 'react-input-mask'
import TelegramBackButton from '../../components/TelegramBackButton/TelegramBackButton'

interface TelegramWebApp {
    ready: () => void
    initDataUnsafe?: {
        user?: {
            id: number
        }
    }
}

interface Window {
    Telegram?: {
        WebApp: TelegramWebApp
    }
}

declare const window: Window

const useTelegramWebApp = () => {
    const tg = window.Telegram?.WebApp

    return {
        getChatId: () => tg?.initDataUnsafe?.user?.id || null,
        ready: () => {
            if (tg?.ready) tg.ready()
        },
        sendData: async (data: object) => {
            const url = 'YOUR_API_ENDPOINT' // Bu yerda o'zingizning API endpoint manzilingizni kiriting

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })

            const result = await response.json()
            if (!response.ok) {
                console.error('Ошибка при отправке данных на API:', result.message)
            }
        },
    }
}

interface OrderItem {
    productId: number
    quantity: number
    price: number
}

interface OrderData {
    telegramId: number | null
    userPhone: string
    userAddress: string
    orderItems: OrderItem[]
}

const OrderForm: React.FC = () => {
    const [name, setName] = useState<string>('')
    const [phone, setPhone] = useState<string>('')
    const [address, setAddress] = useState<string>('')
    const [comment, setComment] = useState<string>('')


    const telegramWebApp = useTelegramWebApp()

    useEffect(() => {
        telegramWebApp.ready()
    }, [])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const telegramId = telegramWebApp.getChatId()
        const orderData: OrderData = {
            telegramId,
            userPhone: phone,
            userAddress: address,
            orderItems: []
        }

        await telegramWebApp.sendData(orderData)
        console.log('Отладка: данные заказа', orderData)
    }

    const inputStyle = "w-full bg-white rounded-lg px-4 py-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border border-gray-300"
    const labelStyle = "block text-gray-700 text-sm font-bold mb-2"

    return (
        <>
            <TelegramBackButton />
            <h3 className='text-[22px] font-bold text-center my-[30px]'>Оформление заказа</h3>
            <form onSubmit={handleSubmit} className="bg-gray-100 rounded-[15px] p-6 max-w-md mx-auto space-y-6">
                <div>
                    <label htmlFor="name" className={labelStyle}>Имя</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                        className={inputStyle}
                        placeholder="Введите ваше имя"
                        required
                    />
                </div>

                <div>
                    <div>
                        <label htmlFor="phone" className={labelStyle}>Телефон</label>
                        <InputMask
                            mask="+7 (999) 999-99-99"
                            value={phone}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}
                            className={inputStyle}
                            placeholder="Введите ваш телефон"
                            required
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="address" className={labelStyle}>Адрес</label>
                    <input
                        type="text"
                        id="address"
                        value={address}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAddress(e.target.value)}
                        className={inputStyle}
                        placeholder="Укажите адрес"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="comment" className={labelStyle}>Комментарий</label>
                    <textarea
                        id="comment"
                        value={comment}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setComment(e.target.value)}
                        className={`${inputStyle} h-24 resize-none`}
                        placeholder="Оставьте комментарий"
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
                >
                    Отправить заказ
                </button>
            </form>
        </>
    )
}

export default OrderForm