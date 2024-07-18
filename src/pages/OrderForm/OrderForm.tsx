import { Checkbox } from 'antd'
import React, { useState } from 'react'

const OrderForm: React.FC = () => {
    const [name, setName] = useState<string>('')
    const [phone, setPhone] = useState<string>('')
    const [address, setAddress] = useState<string>('')
    const [comment, setComment] = useState<string>('')
    const [callBeforeDelivery, setCallBeforeDelivery] = useState<boolean>(false)
    const [username, setUsername] = useState<string>('')

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const orderData = {
            name,
            phone,
            address,
            comment,
            callBeforeDelivery,
            username
        }

        try {
            const response = await fetch('https://your-api-server.com/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(orderData)
            })

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const responseData = await response.json()
            console.log('Order submitted successfully!', responseData)
            alert('Order submitted successfully!')
        } catch (error) {
            console.error('Failed to submit order:', error)
            alert('Failed to submit order')
        }
    }

    const inputStyle = "w-full bg-white rounded-lg px-4 py-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border border-gray-300"
    const labelStyle = "block text-gray-700 text-sm font-bold mb-2"

    return (
        <>
            <h3 className='text-[22px] font-bold text-center my-[30px]'>Оформление заказа</h3>
            < form onSubmit={handleSubmit} className="bg-gray-100 rounded-[15px] p-6 max-w-md mx-auto space-y-6" >
                <div>
                    <label htmlFor="name" className={labelStyle}>Имя</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={inputStyle}
                        placeholder="Введите ваше имя"
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
                    ></Checkbox>
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
            </ form>
        </>
    )
}

export default OrderForm
