import React, { useEffect, useMemo, useState } from 'react'
import Card from '../../components/Card/Card'
import Info from '../../components/Info/Info'
import Loading from '../../components/Loading/Loading'
import MainSection from '../../components/MainSection/MainSection'
import Search from '../../components/Search/Search'
import Slider from '../../components/Slider/Slider'
import { API_BASE_URL } from '../../config/api'
import { ScrollContext } from '../../context/ScrollContext'
import useFetchData from '../../hooks/useFetcher'

interface Category {
    _id: string
    name: string
}

interface PizzaData {
    _id: string
    name: string
    price: number
    description: string
    imageUrl: string
    categoryId: string
}

function Home() {
    const context = React.useContext(ScrollContext)
    if (!context) return <Loading />
    const { scrollToSection } = context

    const [activeIndex, setActiveIndex] = useState<number>(0)
    const [categories, setCategories] = useState<Category[]>([])
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

    const { data: pizzasData, loading: pizzasLoading } = useFetchData<PizzaData[]>(`${API_BASE_URL}/api/admin/pizzas`)
    const { data: categoriesData, loading: categoriesLoading } = useFetchData<Category[]>(`${API_BASE_URL}/api/admin/categories`)

    useEffect(() => {
        if (categoriesData) {
            const allPizzasCategory: Category = { _id: 'all', name: 'Все пиццы' }
            setCategories([allPizzasCategory, ...categoriesData])
            setSelectedCategory('all')
        }
    }, [categoriesData])

    const filteredPizzas = useMemo(() => {
        if (!pizzasData) return []
        if (!selectedCategory || selectedCategory === 'all') return pizzasData
        return pizzasData.filter((pizza) => pizza.categoryId === selectedCategory)
    }, [pizzasData, selectedCategory])

    if (pizzasLoading || categoriesLoading) return <Loading />

    console.log('Selected Category:', selectedCategory)
    console.log('Filtered Pizzas:', filteredPizzas)

    return (
        <>
            <Search />
            <Info />
            <Slider />
            <ul className='w-full overflow-y-scroll scrollbar-hide flex gap-[20px] px-[12px] my-[25px]'>
                {categories.map((category, index) => {
                    const isActive = category._id === selectedCategory
                    return (
                        <li
                            key={category._id}
                            onClick={() => {
                                setSelectedCategory(category._id)
                                setActiveIndex(index)
                                scrollToSection(context.homeRef)
                            }}
                            className={`flex-none w-[110px] py-[5px] px-[8px] rounded-[10px] text-center cursor-pointer
                                ${isActive ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'}`}
                        >
                            {category.name}
                        </li>
                    )
                })}
            </ul>
            <MainSection>
                <h4 className='text-[16px] font-bold mb-[15px] text-gray-800' ref={context.homeRef}>
                    {categories.find(cat => cat._id === selectedCategory)?.name || 'Все пиццы'}
                </h4>
                <Card data={filteredPizzas} />
            </MainSection>
        </>
    )
}

export default React.memo(Home)
