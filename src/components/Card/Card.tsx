import React from 'react'
import { FaInfoCircle, FaShoppingCart } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'
import { API_BASE_URL } from '../../config/api'
import { useCart } from '../../context/CartContext'

interface CardProps {
    data: Array<{
        _id: string
        name: string
        price: number
        description: string
        imageUrl: string
    }>
}

const Card: React.FC<CardProps> = React.memo(({ data }) => {
    const { addToCart } = useCart()

    const cardStyle = `
        w-full max-w-[160px] min-h-[220px] rounded-[15px] p-[10px] shadow-md
        bg-white text-gray-800 hover:shadow-lg transition-all duration-300
    `

    const buttonStyle = `
        flex items-center justify-center px-2 py-1 rounded-full text-xs font-medium
        bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-200
    `

    const handleAddToCart = React.useCallback((item: any) => {
        addToCart(item)
    }, [addToCart])

    return (
        <ul className='grid grid-cols-2 gap-3 px-2'>
            {data?.map((item) => (
                <li key={item._id} className={cardStyle}>
                    <div className="flex flex-col h-full">
                        <img
                            className='w-full h-[140px] rounded-[10px] mb-[5px] object-cover'
                            src={`${API_BASE_URL}${item.imageUrl}`}
                            alt={item.name}
                        />
                        <h3 className="text-sm font-semibold mb-1 line-clamp-2">{item.name}</h3>
                        <p className="text-xs mb-2 flex-grow line-clamp-2 text-gray-600">{item.description}</p>
                        <div className="flex flex-col items-start mt-auto">
                            <span className="font-bold text-lg text-green-600 mb-1">{item.price} ₽</span>
                            <div className="flex flex-col gap-1 items-center w-full">
                                <NavLink to={`/inner/${item._id}`} className={buttonStyle}>
                                    <FaInfoCircle className="mr-1" /> Подробнее
                                </NavLink>
                                <button className={buttonStyle} onClick={() => handleAddToCart(item)}>
                                    <FaShoppingCart className="mr-1" /> В корзину
                                </button>
                            </div>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    )
})

export default Card
