import { Checkbox } from 'antd'
import React, { useEffect, useState } from 'react'
import TelegramBackButton from '../../components/TelegramBackButton/TelegramBackButton'

const useTelegramWebApp = () => {
    const tg = (window as any).Telegram?.WebApp

    return {
        ready: () => {
            if (tg?.ready) tg.ready()
        },
        sendData: (data: string) => {
            if (tg?.sendData) tg.sendData(data)
        },
        // Добавьте здесь другие методы Telegram Web App API, если они вам нужны
    }
}

const OrderForm: React.FC = () => {
    const [name, setName] = useState<string>('')
    const [phone, setPhone] = useState<string>('')
    const [address, setAddress] = useState<string>('')
    const [comment, setComment] = useState<string>('')
    const [callBeforeDelivery, setCallBeforeDelivery] = useState<boolean>(false)
    const [username, setUsername] = useState<string>('')

    const telegramWebApp = useTelegramWebApp()

    useEffect(() => {
        telegramWebApp.ready()
    }, [])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const orderData = {
            name,
            phone,
            address,
            comment,
            callBeforeDelivery,
            username
        }

        telegramWebApp.sendData(JSON.stringify(orderData))
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
                        onChange={(e) => setName(e.target.value)}
                        className={inputStyle}
                        placeholder="Введите ваше имя"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="phone" className={labelStyle}>Телефон</label>
                    <input
                        type="tel"
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className={inputStyle}
                        placeholder="Введите ваш телефон"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="address" className={labelStyle}>Адрес</label>
                    <input
                        type="text"
                        id="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
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
                        onChange={(e) => setComment(e.target.value)}
                        className={`${inputStyle} h-24 resize-none`}
                        placeholder="Оставьте комментарий"
                    ></textarea>
                </div>

                <div className="flex items-center">
                    <Checkbox
                        checked={callBeforeDelivery}
                        onChange={(e) => setCallBeforeDelivery(e.target.checked)}
                        className="form-checkbox h-5 w-5 text-blue-600"
                    />
                    <label htmlFor="callBeforeDelivery" className="ml-2 block text-gray-700">
                        Позвонить перед доставкой
                    </label>
                </div>

                <div>
                    <label htmlFor="username" className={labelStyle}>Укажите ваш @username</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className={inputStyle}
                        placeholder="Ваше имя пользователя в Телеграм"
                    />
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