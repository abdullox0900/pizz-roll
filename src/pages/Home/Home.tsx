import React from 'react'
import { PiUserCircleDuotone } from "react-icons/pi"
import { TbMoneybag } from "react-icons/tb"
import Card from '../../components/Card/Card'
import MainSection from '../../components/MainSection/MainSection'
import Search from '../../components/Search/Search'
import Slider from '../../components/Slider/Slider'
import { ScrollContext } from '../../context/ScrollContext'

// Navigatsiya uchun ma'lumotlar
const NavigationFood = [
    {
        name: 'Пицца🍕',
        refName: 'homeRef'
    },
    {
        name: 'Бургеры🍔',
        refName: 'burgersRef'
    },
    {
        name: 'Закуски🍟',
        refName: 'snacksRef'
    },
]

function Home() {
    const context = React.useContext(ScrollContext)
    if (!context) return <div>Loading...</div>
    const { scrollToSection, homeRef, burgersRef, snacksRef } = context

    // Referenslarni obyekt sifatida o'zgartirish
    const refs = { homeRef, burgersRef, snacksRef }

    return (
        <>
            <Search />
            <MainSection>
                <div className='flex items-center justify-between bg-slate-200 p-[10px] mb-[15px] rounded-[15px]'>
                    <div className='flex gap-[5px] items-center'>
                        <PiUserCircleDuotone className='text-[24px]' />
                        <span className='text-[14px] font-semibold'>Abdulloh</span>
                    </div>
                    <div className='flex gap-[5px] items-center'>
                        <span className='text-[14px]'>Bonus:</span>
                        <span className='flex items-center text-[12px] font-bold text-green-500'> <TbMoneybag className='text-[14px]' />500</span>
                    </div>
                </div>
            </MainSection>
            <Slider />
            <ul className='w-full overflow-y-scroll scrollbar-hide flex gap-[20px] px-[12px] my-[25px]'>
                {
                    NavigationFood.map((item, index) => {
                        return (
                            <li key={index} onClick={() => scrollToSection(refs[item.refName])} className='flex-none w-[110px] text-white py-[5px] px-[8px] rounded-[10px] bg-blue-500'>{item.name}</li>
                        )
                    })
                }
            </ul>
            <MainSection>
                <h4 className='text-[16px] font-bold mb-[15px]' ref={homeRef}>Пицца🍕</h4>
                <Card />

                <h4 className='text-[16px] font-bold mt-[25px] mb-[15px]' ref={burgersRef}>Бургеры🍔</h4>
                <Card />

                <h4 className='text-[16px] font-bold mt-[25px] mb-[15px]' ref={snacksRef}>Закуски🍟</h4>
                <Card />
            </MainSection>
        </>
    )
}

export default Home
