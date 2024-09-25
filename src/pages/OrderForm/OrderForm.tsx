import React, { useEffect, useState } from 'react'
import InputMask from 'react-input-mask'
import TelegramBackButton from '../../components/TelegramBackButton/TelegramBackButton'
import { API_BASE_URL } from '../../config/api'
import { useCart } from '../../context/CartContext'

interface OrderItem {
    productId: number
    quantity: number
    price: number
}

interface OrderData {
    telegramId: number
    userPhone: string
    userAddress: string
    userBonus: number
    useBonus: boolean
    orderItems: OrderItem[]
}

interface User {
    id: string
    telegramId: string
    bonus: number
    name: string
    username: string
    profilePic: string
    createdAt: string
}

const OrderForm: React.FC = () => {
    const [name, setName] = useState<string>('')
    const [phone, setPhone] = useState<string>('')
    const [address, setAddress] = useState<string>('')
    const [comment, setComment] = useState<string>('')
    const [useBonus, setUseBonus] = useState<boolean>(false)
    const [telegramId, setTelegramId] = useState<User | string>('')

    const { items } = useCart()

    const inputStyle = "w-full bg-white rounded-lg px-4 py-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border border-gray-300"
    const labelStyle = "block text-gray-700 text-sm font-bold mb-2"

    useEffect(() => {
        const tg = window.Telegram.WebApp
        tg.MainButton.text = "Changed Text"
        if (tg.initDataUnsafe && tg.initDataUnsafe.user) {
            setTelegramId(tg.initDataUnsafe.user.id.toString())
        }
    }, [])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const orderData = {
            userId: 5397518546,
            items: items.map(item => ({
                pizzaId: item.id,
                quantity: item.quantity
            })),
            totalPrice: items.reduce((total, item) => total + item.price * item.quantity, 0),
            name: name,
            phone: phone,
            address: address,
            usedBonus: useBonus ? useBonus : 0 // Misol uchun, 200 bonus ishlatiladi
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
                console.log('Buyurtma muvaffaqiyatli joylashtirildi')
                const tg = window.Telegram.WebApp
                tg.MainButton.setText('Buyurtma qabul qilindi')
                // tg.MainButton.show()
                setTimeout(() => {
                    // tg.close()
                }, 3000)
            } else {
                console.error('Buyurtmani joylashtirish muvaffaqiyatsiz tugadi')
            }
        } catch (error) {
            console.error('Buyurtmani yuborishda xatolik:', error)
        }
    }

    return (
        <>
            <TelegramBackButton />
            <h3 className='text-[22px] font-bold text-center my-[30px]'>Оформление заказа</h3>
            <form onSubmit={handleSubmit} className="bg-gray-100 rounded-[15px] p-6 max-w-md mx-auto space-y-6">
                {/* Form fields remain the same */}
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

                <div>
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            checked={useBonus}
                            onChange={(e) => setUseBonus(e.target.checked)}
                            className="mr-2"
                        />
                        <span className={labelStyle}>Использовать бонусы</span>
                    </label>
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
