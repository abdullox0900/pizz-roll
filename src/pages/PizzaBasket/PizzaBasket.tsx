import { Minus, Plus, Trash } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import TelegramBackButton from '../../components/TelegramBackButton/TelegramBackButton'
import { API_BASE_URL } from '../../config/api'
import { CartItem, useCart } from '../../context/CartContext'

interface PizzaData extends CartItem {
    size?: string
    extras?: string
}

const PizzaBasket: React.FC = () => {
    const { items, removeItem, updateItem } = useCart()
    const [cartItems, setCartItems] = useState<PizzaData[]>([])
    const [useBonus, setUseBonus] = useState(false)
    const bonusAmount = 500 // Statik qiymat sifatida belgilaymiz

    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    const canUseBonus = subtotal >= 800
    const totalWithBonus = Math.max(0, subtotal - (useBonus && canUseBonus ? bonusAmount : 0))

    useEffect(() => {
        const formattedItems = items.map(item => ({
            ...item,
            quantity: item.quantity || 1,
        }))
        setCartItems(formattedItems)
        localStorage.setItem('cartItems', JSON.stringify(formattedItems))
    }, [items])

    useEffect(() => {
        if (!canUseBonus) {
            setUseBonus(false)
        }
    }, [canUseBonus])

    const updateQuantity = (index: number, newQuantity: number) => {
        const updatedItems = [...cartItems]
        updatedItems[index].quantity = Math.max(1, newQuantity)
        setCartItems(updatedItems)
        updateItem(updatedItems[index]._id, updatedItems[index])
        localStorage.setItem('cartItems', JSON.stringify(updatedItems))
    }

    const handleRemoveItem = (index: number) => {
        const itemToRemove = cartItems[index]
        removeItem(itemToRemove._id)
    }

    const isCartEmpty = cartItems.length === 0

    return (
        <div className="bg-gray-100 min-h-screen pb-24">
            <TelegramBackButton />
            <h2 className="text-2xl font-bold p-4 border-b text-gray-800">Корзина</h2>
            <div className="divide-y">
                {cartItems.map((item, index) => (
                    <div key={item._id} className="flex flex-col items-start justify-between p-4">
                        <div className='flex items-center mb-[15px] w-full'>
                            <img src={`${API_BASE_URL}${item.imageUrl}`} alt={item.name} className="w-20 h-20 object-cover rounded-lg mr-4" />
                            <div className="flex-grow">
                                <h3 className="font-semibold text-lg text-gray-800">{item.name}</h3>
                                <p className="font-bold mt-1 text-gray-800">{item.price} ₽</p>
                            </div>
                        </div>
                        <div className="flex justify-between w-full">
                            <div className="flex items-center border rounded-full">
                                <button onClick={() => updateQuantity(index, item.quantity - 1)} className="p-2">
                                    <Minus className='text-gray-600' size={16} />
                                </button>
                                <span className="mx-2 min-w-[20px] text-center text-gray-800">{item.quantity}</span>
                                <button onClick={() => updateQuantity(index, item.quantity + 1)} className="p-2">
                                    <Plus className='text-gray-600' size={16} />
                                </button>
                            </div>
                            <button onClick={() => handleRemoveItem(index)} className="p-2">
                                <Trash className='text-red-500' size={16} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="p-4 bg-white fixed w-full bottom-0">
                <div className="flex justify-between mb-2">
                    <span className='text-gray-600'>Сумма заказа</span>
                    <span className="font-bold text-gray-800">{subtotal} ₽</span>
                </div>
                <div className="flex justify-between mb-2">
                    <span className='text-gray-600'>Доставка</span>
                    <span className='text-gray-800'>Бесплатно</span>
                </div>
                <div className="flex items-center justify-between mb-2">
                    <span className='text-gray-600'>
                        Использовать бонусы (500 ₽)
                        {!canUseBonus && (
                            <span className="text-xs text-red-500 block">
                                Доступно при заказе от 800 ₽
                            </span>
                        )}
                    </span>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={useBonus}
                            onChange={() => setUseBonus(!useBonus)}
                            disabled={!canUseBonus}
                        />
                        <div className={`w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer ${useBonus && canUseBonus ? 'peer-checked:after:translate-x-full peer-checked:bg-blue-600' : ''} after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600`}></div>
                    </label>
                </div>
                <div className="flex justify-between text-lg font-bold mb-4">
                    <span className='text-gray-800'>Итого</span>
                    <span className='text-gray-800'>{totalWithBonus} ₽</span>
                </div>
                <NavLink
                    to={isCartEmpty ? '#' : '/pizza_order'}
                    className={`inline-block text-center w-full py-3 rounded-lg font-semibold ${isCartEmpty
                        ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                        : 'bg-blue-500 text-white'
                        }`}
                    onClick={(e) => isCartEmpty && e.preventDefault()}
                >
                    Продолжить
                </NavLink>
            </div>
        </div>
    )
}

export default PizzaBasket
