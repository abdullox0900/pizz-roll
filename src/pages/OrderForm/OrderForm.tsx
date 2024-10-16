import { notification } from 'antd'
import React, { useEffect, useState } from 'react'
import InputMask from 'react-input-mask'
import { useNavigate } from 'react-router-dom'
import TelegramBackButton from '../../components/TelegramBackButton/TelegramBackButton'
import { API_BASE_URL } from '../../config/api'
import { useBonus } from '../../context/BonusContext'
import { useCart } from '../../context/CartContext'


const OrderForm: React.FC = () => {
    const [name, setName] = useState<string>('')
    const [phone, setPhone] = useState<string>('')
    const [address, setAddress] = useState<string>('')
    const [comment, setComment] = useState<string>('')
    const [telegramId, setTelegramId] = useState<string>('')
    const navigate = useNavigate()

    const { items } = useCart()
    const { useBonus: isUsingBonus } = useBonus()

    const inputStyle = "w-full bg-white rounded-lg px-4 py-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border border-gray-300"
    const labelStyle = "block text-gray-700 text-sm font-bold mb-2"

    const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0)

    useEffect(() => {
        const tg = window.Telegram.WebApp
        if (tg.initDataUnsafe && tg.initDataUnsafe?.user) {
            setTelegramId(tg.initDataUnsafe?.user?.id?.toString())
        }
    }, [])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const orderData = {
            telegramId: telegramId || '',
            items: items.filter(item => item && item?._id).map(item => ({
                pizzaId: item._id,
                quantity: item.quantity
            })),
            totalPrice: totalPrice,
            name: name,
            phone: phone,
            address: address,
            usedBonus: isUsingBonus ? 500 : 0
        }

        try {
            const response = await fetch(`${API_BASE_URL}/api/webapp/order`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData),
            })

            if (response.ok) {
                const result = await response.json()
                console.log('Order created:', result)
                notification.success({
                    message: 'Заказ успешно оформлен',
                    description: 'Ваш заказ был успешно размещен. Спасибо за покупку!',
                    duration: 3,
                })
                setTimeout(() => {
                    navigate(`/order-history/${telegramId}`)
                }, 3000)
            } else {
                const errorData = await response.json()
                console.error('Ошибка при оформлении заказа:', errorData.message)
                notification.error({
                    message: 'Ошибка при оформлении заказа',
                    description: 'Произошла ошибка при размещении вашего заказа. Пожалуйста, попробуйте еще раз.',
                    duration: 3,
                })
            }
        } catch (error) {
            console.error('Ошибка при отправке заказа:', error)
            notification.error({
                message: 'Ошибка соединения',
                description: 'Произошла ошибка при отправке заказа. Пожалуйста, проверьте ваше интернет-соединение и попробуйте снова.',
                duration: 3,
            })
        }
    }

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
