import React, { useEffect, useState } from 'react'
import Card from '../../components/Card/Card'
import Info from '../../components/Info/Info'
import Loading from '../../components/Loading/Loading'
import MainSection from '../../components/MainSection/MainSection'
import Search from '../../components/Search/Search'
import Slider from '../../components/Slider/Slider'
import { ScrollContext } from '../../context/ScrollContext'
import useFetchData from '../../hooks/useFetcher'

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

declare global {
    interface Window {
        Telegram: {
            WebApp: TelegramWebApp
        }
    }
}

// UserData interfeysi
interface UserData {
    name: string
    bonus: number
}

function Home() {
    const context = React.useContext(ScrollContext)
    if (!context) return <div>Loading...</div>
    const { scrollToSection, homeRef, burgersRef, snacksRef } = context

    const [activeIndex, setActiveIndex] = useState<number | null>(0)

    const refs: Refs = { homeRef, burgersRef, snacksRef }

    const { data, loading } = useFetchData('https://pizza-webapp-server.onrender.com/products')

    loading ? <Loading /> : ''

    return (
        <>
            <Search />
            <Info />
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
