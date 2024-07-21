import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import { SlBasket } from "react-icons/sl"
import { Badge } from 'antd'



const FloatingBasket: React.FC = () => {
    const { items } = useCart()
    const location = useLocation()

    if (items.length === 0 || location.pathname === '/pizza_basket' || location.pathname === '/pizza_order') return null

    return (
        <NavLink
            to="/pizza_basket"
            className="fixed z-10 right-[20px] bottom-[60px] bg-blue-500 rounded-full shadow-lg"
        >
            <Badge count={items.length}>
                <div className='flex items-center justify-center w-[45px] h-[45px] text-white '>
                    <SlBasket className='text-[18px]' />
                </div>
            </Badge>

        </NavLink>
    )
}

export default FloatingBasket