import React, { useState } from 'react'
import { PiUserCircleDuotone } from "react-icons/pi"
import { TbMoneybag } from "react-icons/tb"
import Card from '../../components/Card/Card'
import Loading from '../../components/Loading/Loading'
import MainSection from '../../components/MainSection/MainSection'
import Search from '../../components/Search/Search'
import Slider from '../../components/Slider/Slider'
import { ScrollContext } from '../../context/ScrollContext'
import useFetchData from '../../hooks/useFetcher'
import { PizzaData } from '../PizzaBasket/PizzaBasket'

interface Refs {
    homeRef: React.RefObject<HTMLDivElement>
    burgersRef: React.RefObject<HTMLDivElement>
    snacksRef: React.RefObject<HTMLDivElement>
    [key: string]: React.RefObject<HTMLDivElement> // Qo'shimcha indeks imzosi
}

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

    const [activeIndex, setActiveIndex] = useState<number | null>(0)

    const refs: Refs = { homeRef, burgersRef, snacksRef }

    const { data, loading } = useFetchData('https://65c7cfb0e7c384aada6efcb0.mockapi.io/elements/products')

    loading ? <Loading /> : ''

    return (
        <>
            <Search />
            <MainSection>
                <div className='flex items-center justify-between bg-tg-theme-secondary-bg p-[10px] mb-[15px] rounded-[15px]'>
                    <div className='flex gap-[5px] items-center'>
                        <PiUserCircleDuotone className='text-[24px] text-tg-theme-text' />
                        <span className='text-[14px] font-semibold text-tg-theme-text'>Name</span>
                    </div>
                    <div className='flex gap-[5px] items-center'>
                        <span className='text-[14px] text-tg-theme-text'>Bonus:</span>
                        <span className='flex items-center text-[12px] font-bold text-green-500'>
                            <TbMoneybag className='text-[14px] text-tg-theme-button' />500
                        </span>
                    </div>
                </div>
            </MainSection>
            <Slider />
            <ul className='w-full overflow-y-scroll scrollbar-hide flex gap-[20px] px-[12px] my-[25px]'>
                {
                    NavigationFood.map((item, index) => {
                        const isActive = index === activeIndex
                        return (
                            <li key={index} onClick={() => {
                                scrollToSection(refs[item.refName])
                                setActiveIndex(index)
                            }} className={`flex-none w-[110px] text-tg-theme-hint py-[5px] px-[8px] rounded-[10px] ${isActive ? 'bg-tg-theme-button  text-white' : 'text-slate-400'}`}>
                                {item.name}
                            </li>
                        )
                    })
                }
            </ul>
            <MainSection>
                <h4 className='text-[16px] font-bold mb-[15px] tg-theme-text' ref={homeRef}>Пицца🍕</h4>
                <Card data={data} />

                {/* <h4 className='text-[16px] font-bold mt-[25px] mb-[15px] tg-theme-text' ref={burgersRef}>Бургеры🍔</h4>
                <Card />

                <h4 className='text-[16px] font-bold mt-[25px] mb-[15px] tg-theme-text' ref={snacksRef}>Закуски🍟</h4>
                <Card /> */}
            </MainSection>
        </>
    )
}

export default Home
