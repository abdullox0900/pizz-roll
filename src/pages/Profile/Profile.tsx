import { FaRegFileLines } from "react-icons/fa6"
import { IoIosArrowForward } from 'react-icons/io'
import { MdFavoriteBorder } from "react-icons/md"
import { PiUserCircleDuotone } from 'react-icons/pi'
import { NavLink } from 'react-router-dom'
import MainSection from '../../components/MainSection/MainSection'


const Profile = () => {
    return (
        <MainSection>
            <div className='flex items-center w-full h-[120px] mt-[20px] p-[20px] mb-[15px] rounded-[15px] bg-aliceblue'>
                <PiUserCircleDuotone className='text-[75px]' />
                <span className='text-[22px] font-bold'>Abdullox</span>
            </div>
            <div className='grid grid-cols-2 gap-[15px]'>
                <NavLink to={'/orders'} className='flex flex-col justify-between h-[170px] p-[20px] bg-aliceblue rounded-[15px]'>
                    <div className='flex items-center justify-center w-[80px] h-[80px] rounded-[12px] bg-white'>
                        <FaRegFileLines className='text-[40px] text-cool_grey' />
                    </div>
                    <div className='flex items-center justify-between'>
                        <span className='font-bold'>Мои Заказы</span>
                        <IoIosArrowForward className='text-cool_grey text-[18px]' />
                    </div>
                </NavLink>
                <NavLink to={'/favorites'} className='flex flex-col justify-between h-[170px] p-[20px] bg-aliceblue rounded-[15px]'>
                    <div className='flex items-center justify-center w-[80px] h-[80px] rounded-[12px] bg-white'>
                        <MdFavoriteBorder className='text-[40px] text-cool_grey' />
                    </div>
                    <div className='flex items-center justify-between'>
                        <span className='font-bold'>Избранное</span>
                        <IoIosArrowForward className='text-cool_grey text-[18px]' />
                    </div>
                </NavLink>
            </div>
        </MainSection>
    )
}

export default Profile
