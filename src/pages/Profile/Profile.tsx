import { FaHistory } from "react-icons/fa"
import { IoIosArrowForward } from 'react-icons/io'
import { MdFavoriteBorder } from "react-icons/md"
import { PiUserCircleDuotone } from 'react-icons/pi'
import { NavLink } from 'react-router-dom'
import MainSection from '../../components/MainSection/MainSection'


const Profile = () => {
    const telegramId = '5397518546' // Bu qiymatni dinamik olish kerak

    return (
        <MainSection>
            <div className='flex items-center w-full h-[120px] mt-[20px] p-[20px] mb-[15px] rounded-[15px] bg-gray-100'>
                <PiUserCircleDuotone className='text-[75px] text-blue-500' />
                <span className='text-[22px] font-bold ml-4'>Abdullox</span>
            </div>
            <div className='grid grid-cols-2 gap-[15px]'>
                <NavLink to={'/orders'} className='flex flex-col justify-between h-[170px] p-[20px] bg-gray-100 rounded-[15px] hover:bg-gray-200 transition-colors'>
                    <div className='flex items-center justify-center w-[80px] h-[80px] rounded-[12px] bg-white'>
                        {/* <FaRegFileLines className='text-[40px] text-blue-500' /> */}
                    </div>
                    <div className='flex items-center justify-between'>
                        <span className='font-bold'>Мои Заказы</span>
                        <IoIosArrowForward className='text-gray-500 text-[18px]' />
                    </div>
                </NavLink>
                <NavLink to={'/favorites'} className='flex flex-col justify-between h-[170px] p-[20px] bg-gray-100 rounded-[15px] hover:bg-gray-200 transition-colors'>
                    <div className='flex items-center justify-center w-[80px] h-[80px] rounded-[12px] bg-white'>
                        <MdFavoriteBorder className='text-[40px] text-red-500' />
                    </div>
                    <div className='flex items-center justify-between'>
                        <span className='font-bold'>Избранное</span>
                        <IoIosArrowForward className='text-gray-500 text-[18px]' />
                    </div>
                </NavLink>
                <NavLink to={`/order-history/${telegramId}`} className='flex flex-col justify-between h-[170px] p-[20px] bg-gray-100 rounded-[15px] hover:bg-gray-200 transition-colors'>
                    <div className='flex items-center justify-center w-[80px] h-[80px] rounded-[12px] bg-white'>
                        <FaHistory className='text-[40px] text-green-500' />
                    </div>
                    <div className='flex items-center justify-between'>
                        <span className='font-bold'>История заказов</span>
                        <IoIosArrowForward className='text-gray-500 text-[18px]' />
                    </div>
                </NavLink>
            </div>
        </MainSection>
    )
}

export default Profile
