import { PiUserCircleDuotone } from "react-icons/pi"
import Search from '../../components/Search/Search'
import Slider from '../../components/Slider/Slider'
import MainSection from '../../components/MainSection/MainSection'
import { IoIosArrowForward } from "react-icons/io"
import Card from '../../components/Card/Card'
import { NavLink } from 'react-router-dom'

// Пицца🍕
// Бургеры🍔
// Закуски🍟
// Десерты🍰
// Напитки🥤
// Акции🤑

const NavigationFood = [
    {
        name: 'Пицца🍕',
        path: '/'
    },
    {
        name: 'Бургеры🍔',
        path: '/'
    },
    {
        name: 'Закуски🍟',
        path: '/'
    },
    {
        name: 'Десерты🍰',
        path: '/'
    },
    {
        name: 'Напитки🥤',
        path: '/'
    },
    {
        name: 'Акции🤑',
        path: '/'
    },
]

function Home() {

    function one() {

    }

    return (
        <>
            <Search />
            <MainSection>
                <div className='flex items-center justify-between bg-slate-200 p-[10px] mb-[15px] rounded-[15px]'>
                    <div className='flex gap-[5px] items-center'>
                        <PiUserCircleDuotone className='text-[24px]' />
                        <span className='text-[14px] font-semibold'>Abdulloh</span>
                    </div>
                    <NavLink to={'/profile'} className='flex gap-[5px] items-center'>
                        <span>Profile</span>
                        <IoIosArrowForward />
                    </NavLink>
                </div>
            </MainSection>
            <Slider />
            <ul className='w-full overflow-y-scroll scrollbar-hide flex gap-[20px] px-[12px] my-[25px]'>
                {
                    NavigationFood.map((item: any, index) => {
                        return (
                            <li key={index} className='flex-none w-[100px] text-white py-[5px] px-[8px] rounded-[10px] bg-blue-500'>{item.name}</li>
                        )
                    })
                }
            </ul>
            <MainSection>
                <h4 className='text-[16px] font-bold mb-[15px]'>Пицца🍕</h4>
                <Card />
            </MainSection>
        </>
    )
}

export default Home