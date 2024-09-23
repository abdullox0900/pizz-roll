import { Minus, Plus, Trash } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import TelegramBackButton from '../../components/TelegramBackButton/TelegramBackButton'
import { useCart } from '../../context/CartContext'

export interface PizzaData {
    name: string
    price: number
    description: string
    id: number
    categoryId: number
    createdAt: string
    quantity: number
    size?: string
    extras?: string
}

const PizzaBasket: React.FC = () => {
    const { items, removeItem, updateItem } = useCart()
    const [cartItems, setCartItems] = useState<PizzaData[]>([])

    const [useBonus, setUseBonus] = useState(false)
    const [bonusAmount, setBonusAmount] = useState(500)

    // Calculate subtotal with quantity
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    const canUseBonus = subtotal >= 500
    const totalWithBonus = Math.max(0, subtotal - (useBonus && canUseBonus ? bonusAmount : 0))

    useEffect(() => {
        // Transform items to PizzaData format and update state
        const formattedItems = items.map(item => ({
            ...item,
            quantity: item.quantity || 1,
            product_price: item.price,  // Assuming 'price' from CartItem corresponds to 'product_price'
        }))
        setCartItems(formattedItems)
        // Update localStorage
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
        // Update the item in the cart context
        updateItem(updatedItems[index].id, updatedItems[index])
        // Update localStorage
        localStorage.setItem('cartItems', JSON.stringify(updatedItems))
    }

    const handleRemoveItem = (index: number) => {
        const itemToRemove = cartItems[index]
        removeItem(itemToRemove.id)
        // The cart context will update, triggering a re-render
    }

    useEffect(() => {
        setBonusAmount(500)
    }, [])

    const isCartEmpty = cartItems.length === 0

    return (
        <div className="bg-tg-theme-secondary-bg">
            <TelegramBackButton />
            <h2 className="text-2xl font-bold p-4 border-b tg-theme-text">Корзина</h2>
            <div className="divide-y">
                {cartItems.map((item: any, index) => (
                    <div key={index} className="flex flex-col items-start justify-between p-4">
                        <div className='flex items-center mb-[15px]'>
                            <img src={`http://localhost:3000${item.imageUrl}`} alt={item.name} className="w-20 h-20 object-cover rounded-lg mr-4" />
                            <div className="flex-grow">
                                <h3 className="font-semibold text-lg tg-theme-text">{item.name}</h3>
                                <p className="font-bold mt-1 tg-theme-text">{item.price} ₽</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 justify-between mb-2 gap-1">
                            <div className="flex items-center border rounded-full mr-2">
                                <button onClick={() => updateQuantity(index, item.quantity - 1)} className="p-2">
                                    <Minus className='tg-theme-text' size={16} />
                                </button>
                                <span className="mx-2 min-w-[20px] text-center tg-theme-text">{item.quantity}</span>
                                <button onClick={() => updateQuantity(index, item.quantity + 1)} className="p-2">
                                    <Plus className='tg-theme-text' size={16} />
                                </button>
                            </div>
                            <button onClick={() => handleRemoveItem(index)} className="p-2">
                                <Trash className='text-red-500' size={16} />
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