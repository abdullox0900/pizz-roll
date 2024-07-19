import { Minus, Plus } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import TelegramBackButton from '../../components/TelegramBackButton/TelegramBackButton'
import { useCart } from '../../context/CartContext'

interface CartItem {
    name: string
    size: string
    extras: string
    price: number
    quantity: number
    image: string
}

export interface PizzaData {
    product_name: string
    product_img: string
    product_price: string
    product_urls: string[]
    product_discount: string
    product_description: string
    productId: string
}

const PizzaBasket: React.FC = () => {
    const { items, removeItem } = useCart()
    const [cartItems, setCartItems] = useState<CartItem[]>([])

    const [useBonus, setUseBonus] = useState(false)
    const [bonusAmount, setBonusAmount] = useState(500)

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const canUseBonus = subtotal >= 800
    const totalWithBonus = Math.max(0, subtotal - (useBonus && canUseBonus ? bonusAmount : 0))

    useEffect(() => {
        if (!canUseBonus) {
            setUseBonus(false)
        }
    }, [canUseBonus])

    useEffect(() => {
        setBonusAmount(500)
    }, [])

    useEffect(() => {
        const formattedItems = items.map(item => ({
            name: item.product_name,
            size: 'Маленькая', // Bu qiymatlarni mos ravishda o'zgartiring
            extras: 'Не нужно', // Bu qiymatlarni mos ravishda o'zgartiring
            price: parseFloat(item.product_price), // product_price ni son tipiga o'tkazamiz
            quantity: 1, // Dastlabki qiymatni mos ravishda belgilang
            image: item.product_img,
        }))
        setCartItems(formattedItems)
    }, [items])

    const updateQuantity = (index: number, newQuantity: number) => {
        const updatedItems = [...cartItems]
        if (newQuantity === 0) {
            const itemToRemove = updatedItems[index]
            removeItem(itemToRemove.name)
            updatedItems.splice(index, 1)
        } else {
            updatedItems[index].quantity = newQuantity
        }
        setCartItems(updatedItems)
    }

    return (
        <div className="bg-tg-theme-secondary-bg">
            <TelegramBackButton />
            <h2 className="text-2xl font-bold p-4 border-b tg-theme-text">Корзина</h2>
            <div className="divide-y">
                {cartItems.map((item, index) => (
                    <div key={index} className="flex flex-col items-start justify-between p-4">
                        <div className='flex items-center mb-[15px]'>
                            <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg mr-4" />
                            <div className="flex-grow">
                                <h3 className="font-semibold text-lg tg-theme-text">🔥{item.name}</h3>
                                <p className="text-sm text-gray-500">Размер пиццы: {item.size}</p>
                                <p className="text-sm text-gray-500">Добавки: {item.extras}</p>
                                <p className="font-bold mt-1 tg-theme-text">{item.price} ₽</p>
                            </div>
                        </div>
                        <div className="flex items-center border rounded-full">
                            <button onClick={() => updateQuantity(index, item.quantity - 1)} className="p-2">
                                <Minus className='tg-theme-text' size={16} />
                            </button>
                            <span className="mx-2 min-w-[20px] text-center tg-theme-text">{item.quantity}</span>
                            <button onClick={() => updateQuantity(index, item.quantity + 1)} className="p-2">
                                <Plus className='tg-theme-text' size={16} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="p-4 bg-tg-theme-secondary-bg bg-gray-50 fixed w-full bottom-0">
                <div className="flex justify-between mb-2">
                    <span className='tg-theme-text'>Сумма заказа</span>
                    <span className="font-bold tg-theme-text">{subtotal} ₽</span>
                </div>
                <div className="flex justify-between mb-2">
                    <span className='tg-theme-text'>Доставка</span>
                    <span className='tg-theme-text'>Бесплатно</span>
                </div>
                <div className={`flex items-center justify-between mb-4 ${!canUseBonus ? 'opacity-50' : ''}`}>
                    <span className='tg-theme-text'>
                        Оплатить бонусами ({bonusAmount} ₽)
                        {!canUseBonus && (
                            <span className="text-sm text-red-500 block ">
                                Доступно при заказе от 800 ₽
                            </span>
                        )}
                    </span>
                    <label className={`flex items-center ${canUseBonus ? 'cursor-pointer' : 'cursor-not-allowed'}`}>
                        <div className="relative">
                            <input
                                type="checkbox"
                                className="sr-only"
                                checked={useBonus}
                                onChange={() => canUseBonus && setUseBonus(!useBonus)}
                                disabled={!canUseBonus}
                            />
                            <div className={`block w-14 h-8 rounded-full ${useBonus && canUseBonus ? 'bg-blue-500' : 'bg-gray-300'} transition-colors duration-300`}></div>
                            <div className={`absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform duration-300 ease-in-out ${useBonus && canUseBonus ? 'transform translate-x-6' : ''}`}></div>
                        </div>
                    </label>
                </div>
                <div className="flex justify-between text-lg font-bold mb-4">
                    <span className='tg-theme-text'>Итого</span>
                    <span className='tg-theme-text'>{totalWithBonus} ₽</span>
                </div>
                <NavLink to={'/pizza_order'} className="inline-block text-center w-full bg-blue-500 text-white py-3 rounded-lg font-semibold">
                    Продолжить
                </NavLink>
            </div>
        </div>
    )
}

export default PizzaBasket
