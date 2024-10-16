import { Badge } from 'antd'
import React from 'react'
import { FaHistory } from "react-icons/fa"
import { IoSearch } from "react-icons/io5"
import { SlBasket } from "react-icons/sl"
import { NavLink } from 'react-router-dom'
import { useCart } from '../../context/CartContext'

const Search: React.FC = () => {
    const { items } = useCart()
    const telegramId = '5397518546' // Bu qiymatni dinamik olish kerak

    return (
        <div className='flex items-center justify-between gap-[15px] py-[12px] px-[18px] bg-gray-100 rounded-b-[20px] mb-[15px] shadow-md'>
            <div className='relative flex-grow'>
                <input
                    className='w-full py-[10px] pl-[35px] pr-[10px] bg-white rounded-full text-[14px] text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300'
                    type="text"
                    placeholder='Поиск...'
                />
                <IoSearch className='absolute left-[10px] top-1/2 transform -translate-y-1/2 text-[20px] text-gray-400' />
            </div>
            <div className='flex items-center gap-4'>
                <NavLink to={`/order-history/${telegramId}`}>
                    <FaHistory className='text-[25px] text-blue-500' />
                </NavLink>
                <NavLink to='pizza_basket'>
                    <Badge count={items.length}>
                        <SlBasket className='text-[25px] text-slate-500' />
                    </Badge>
                </NavLink>
            </div>
        </div>
    )
}

export default Search
