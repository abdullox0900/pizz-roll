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

    // const handleDeleteOrder = async (orderId: string) => {
    //     // Здесь должна быть логика удаления заказа
    //     console.log(`Удаление заказа с ID: ${orderId}`)
    //     // После успешного удаления, обновите список заказов
    //     setOrders(orders.filter(order => order._id !== orderId))
    // }

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Загрузка...</div>
    }

    return (
        <div className="p-4 bg-gray-100 min-h-screen">
            <TelegramBackButton />
            <h2 className="text-2xl font-bold mb-4 text-gray-800">История заказов</h2>
            {orders.length === 0 ? (
                <p className="text-center text-gray-600">У вас пока нет заказов.</p>
            ) : (
                <ul className="space-y-4">
                    {orders.map((order) => (
                        <li key={order._id} className="bg-white shadow rounded-lg p-4 relative">
                            {/* <button
                                onClick={() => handleDeleteOrder(order._id)}
                                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                            >
                                <FaTrash />
                            </button> */}
                            <p className="font-semibold text-blue-600">ID заказа: {order._id}</p>
                            <p className="text-gray-600">Дата: {new Date(order.date).toLocaleString()}</p>
                            <p className="font-bold text-green-600">Общая сумма: {order?.totalPrice} ₽</p>
                            <p className="text-gray-600">Использованные бонусы: {order.usedBonus}</p>
                            <h4 className="font-semibold mt-2 text-gray-800">Состав заказа:</h4>
                            <ul className="list-disc list-inside">
                                {order.items.map((item, index) => (
                                    <li key={index} className="flex items-center my-2">
                                        <img src={'https://int.bandg.com/assets/img/default-product-img.png?w=400&h=225&scale=both&mode=max'} alt={item?.name} className="w-12 h-12 object-cover rounded mr-2" />
                                        <div>
                                            <p className="font-medium">{item?.name}</p>
                                            <p className="text-sm text-gray-600">Количество: {item?.quantity}</p>
                                            <p className="text-sm text-gray-600">Цена: {item?.pizzaId?.price} ₽</p>
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
