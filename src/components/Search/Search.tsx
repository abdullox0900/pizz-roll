import { Badge } from 'antd'
import { IoSearch } from "react-icons/io5"
import { SlBasket } from "react-icons/sl"
import { NavLink } from 'react-router-dom'

const Search = () => {
    return (
        <div className='flex items-center justify-between gap-[15px] py-[12px] px-[18px]  border-b-[1px] border-slate-400 rounded-b-[20px] mb-[15px]'>
            <div className='relative w-full py-[10px] bg-tg-theme-secondary-bg rounded-[10px] border-[1px]'>
                <IoSearch className='absolute left-[7px] top-[10px] text-[24px] text-slate-400' />
                <input className='w-full pl-[35px] text-[14px] text-slate-500 bg-transparent outline-none' type="text" placeholder='Search...' />
            </div>
            <NavLink to='pizza_basket'>
                <Badge count={1}>
                    <SlBasket className='text-[25px] text-slate-500' />
                </Badge>
            </NavLink>
        </div>
    )
}

export default Search
