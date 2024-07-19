import type { CheckboxProps, RadioChangeEvent } from 'antd'
import { Checkbox, Radio } from 'antd'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from "swiper/react" // Importing Swiper and SwiperSlide components from swiper
import MainSection from '../../components/MainSection/MainSection'
import TelegramBackButton from '../../components/TelegramBackButton/TelegramBackButton'


const Inner = () => {

    const [radioValue, setRadioValue] = useState(1)

    const product: string[] = ['https://admin.webbot.shop/storage/2024/02/11/ff4765178193cee55b5c44b63b0d7c4424ff378f.jpg', 'https://admin.webbot.shop/storage/2024/02/11/ff4765178193cee55b5c44b63b0d7c4424ff378f.jpg', 'https://admin.webbot.shop/storage/2024/02/11/ff4765178193cee55b5c44b63b0d7c4424ff378f.jpg']
    const info: string[] = ['Помидоры 🍅', 'Авокадо 🥑', 'Сыр 🧀', 'Ветчина 🥓', 'Оливки 🫒', 'Зелень 🥬', 'Картошка 🥔', 'Мясо 🥩', 'Острый перец 🌶']

    const onChange: CheckboxProps['onChange'] = (e) => {
        console.log(`checked = ${e.target.checked}`)
    }

    const onChangeRadio = (e: RadioChangeEvent) => {
        console.log('radio checked', e.target.value)
        setRadioValue(e.target.value)
    }

    const [quantity, setQuantity] = useState(0)

    const handleAddToCart = () => {
        setQuantity(1)
    }

    const incrementQuantity = () => {
        setQuantity(prevQuantity => prevQuantity + 1)
    }

    const decrementQuantity = () => {
        setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 0))
    }

    return (
        <MainSection>
            <TelegramBackButton />

            <Swiper className="mySwiper mb-[25px]"
                pagination={{
                    dynamicBullets: true,
                }}
                modules={[Pagination]}>
                {
                    product.map((item: string, index: number) => {
                        return (
                            <SwiperSlide key={index}>
                                <img className='w-full h-[400px] object-cover rounded-[20px] mt-[15px]' src={item} alt="" />
                            </SwiperSlide>
                        )
                    })
                }
            </Swiper>
            <div className='text-[18px] font-bold mb-[15px]'>🔥Пицца из половинок</div>
            <div className='bg-aliceblue p-[20px] rounded-[20px] mb-[20px]'>
                <div className='text-blue-500 text-[22px] font-bold'>550 ₽</div>
                <span className='text-gray-500 font-bold line-through'>650 ₽</span>
                <span className='text-[14px] text-green-600 ml-[4px] font-semibold'>-15%</span>
            </div>
            <div className='bg-aliceblue p-[20px] rounded-[20px] mb-[20px]'>
                <div className='text-[16px] font-semibold'>Размер пиццы</div>
                <span className='text-gray-500 text-[12px]'>Выберите размер пиццы:</span>
                <Radio.Group className='flex flex-col gap-[5px] mt-[10px]' onChange={onChangeRadio} value={radioValue}>
                    <div className='flex items-center justify-between'>
                        <Radio value={1}>Маленькая</Radio>
                        <span className='text-[14px]'>+0 ₽</span>
                    </div>
                    <div className='flex items-center justify-between'>
                        <Radio value={2}>Средняя</Radio>
                        <span className='text-[14px]'>+150 ₽</span>
                    </div><div className='flex items-center justify-between'>
                        <Radio value={3}>Большая</Radio>
                        <span className='text-[14px]'>+250 ₽</span>
                    </div>
                </Radio.Group>

                <div className='text-[16px] font-semibold mt-[15px]'>Добавки</div>
                <span className='text-gray-500 text-[12px] '>Выберите добавки к пицце:</span>
                <div className='flex flex-col gap-[5px] mt-[10px]'>
                    <div className='flex items-center justify-between'>
                        <Checkbox onChange={onChange}>Не нужно</Checkbox>
                        <span className='text-[14px]'>+0 ₽</span>
                    </div>
                    <div className='flex items-center justify-between'>
                        <Checkbox onChange={onChange}>Шампиньоны</Checkbox>
                        <span className='text-[14px]'>+50 ₽</span>
                    </div>
                </div>
            </div>
            <div className='bg-aliceblue p-[20px] rounded-[20px] mb-[20px]'>
                <div className='mb-[20px]'> Демонстрация наполнения</div>

                <div className='mb-[20px]'>В состав входят:</div>

                <div className='flex flex-col gap-[30px]'>
                    {
                        info.map((item: string) => {
                            return (
                                <span>{item}</span>
                            )
                        })
                    }
                </div>
            </div>
            <div className='bg-aliceblue p-[20px] rounded-[20px] mb-[150px]'>
                <div className='text-[16px] font-bold'>Отзывы</div>
            </div>

            <div className='fixed left-0 bottom-0 w-full p-[15px] bg-white border-t-[1px] border-gray-300 rounded-t-[15px]'>
                {quantity === 0 ? (
                    <button className=' bg-blue-500 text-[14px] text-white w-full py-[5px] rounded-[8px]' onClick={handleAddToCart}>Добавить в корзину</button>
                ) : (
                    <div className='grid grid-cols-2 gap-[10px]'>
                        <div className='w-full flex justify-between items-center border-[1px] p-[4px] rounded-[8px]'>
                            <button className='flex items-center justify-center w-[25px] h-[25px] bg-aliceblue rounded-[5px] text-[12px]' onClick={decrementQuantity}>-</button>
                            <span className='text-[12px]'>{quantity} шт</span>
                            <button className='flex items-center justify-center w-[25px] h-[25px] bg-aliceblue rounded-[5px] text-[12px]' onClick={incrementQuantity}>+</button>
                        </div>
                        <NavLink to={'/pizza_basket'} className='inline-block text-center bg-blue-500 text-[14px] text-white w-full p-[5px] rounded-[8px]' onClick={handleAddToCart}>Добавить в корзину</NavLink>
                    </div>
                )}
            </div>
        </MainSection>
    )
}

export default Inner
