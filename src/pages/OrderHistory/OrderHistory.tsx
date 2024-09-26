import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import TelegramBackButton from '../../components/TelegramBackButton/TelegramBackButton'
import { API_BASE_URL } from '../../config/api'

interface PizzaItem {
    _id: string
    name: string
    description: string
    price: number
    imageUrl: string
    categoryId: string
}

interface OrderItem {
    pizzaId: PizzaItem
    name: string
    imageUrl: string
    quantity: number
}

interface Order {
    _id: string
    userId: string
    items: OrderItem[]
    totalPrice: number
    name: string
    phone: string
    address: string
    usedBonus: number
    date: string
}

const OrderHistory: React.FC = () => {
    const { telegramId } = useParams<{ telegramId: string }>()
    const [orders, setOrders] = useState<Order[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/webapp/user/history/${telegramId}`)
                if (!response.ok) {
                    throw new Error('Ошибка сети')
                }
                const data = await response.json()
                setOrders(data)
            } catch (error) {
                console.error('Ошибка при получении истории заказов:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchOrders()
    }, [telegramId])

    if (loading) {
        return <div>Загрузка...</div>
    }

    return (
        <div className="p-4">
            <TelegramBackButton />
            <h2 className="text-2xl font-bold mb-4">История заказов</h2>
            {orders.length === 0 ? (
                <p>У вас пока нет заказов.</p>
            ) : (
                <ul className="space-y-4">
                    {orders.map((order) => (
                        <li key={order._id} className="bg-white shadow rounded-lg p-4">
                            <p className="font-semibold">ID заказа: {order._id}</p>
                            <p>Дата: {new Date(order.date).toLocaleString()}</p>
                            <p>Общая сумма: {order.totalPrice} сум</p>
                            <p>Использованные бонусы: {order.usedBonus}</p>
                            <h4 className="font-semibold mt-2">Состав заказа:</h4>
                            <ul className="list-disc list-inside">
                                {order.items.map((item, index) => (
                                    <li key={index} className="flex items-center my-2">
                                        <img src={item.imageUrl} alt={item.name} className="w-12 h-12 object-cover rounded mr-2" />
                                        <div>
                                            <p>{item.name}</p>
                                            <p>Количество: {item.quantity}</p>
                                            <p>Цена: {item.pizzaId.price} сум</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default OrderHistory