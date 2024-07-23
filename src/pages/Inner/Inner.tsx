import { Checkbox, CheckboxProps, Radio, RadioChangeEvent, notification } from 'antd'
import { useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from "swiper/react"
import Loading from '../../components/Loading/Loading'
import MainSection from '../../components/MainSection/MainSection'
import TelegramBackButton from '../../components/TelegramBackButton/TelegramBackButton'
import { useCart } from '../../context/CartContext'
import useFetchData from '../../hooks/useFetcher'
import { PizzaData } from '../../types/type'

type NotificationType = 'success' | 'info' | 'warning' | 'error'

const Inner = () => {
    const [radioValue, setRadioValue] = useState(1)
    const { id } = useParams()

    const info: string[] = ['Помидоры 🍅', 'Авокадо 🥑', 'Сыр 🧀', 'Ветчина 🥓', 'Оливки 🫒', 'Зелень 🥬', 'Картошка 🥔', 'Мясо 🥩', 'Острый перец 🌶']

    const onChange: CheckboxProps['onChange'] = (e) => {
        console.log(`checked = ${e.target.checked}`)
    }

    const onChangeRadio = (e: RadioChangeEvent) => {
        console.log('radio checked', e.target.value)
        setRadioValue(e.target.value)
    }

    const [api, contextHolder] = notification.useNotification()

    const openNotificationWithIcon = (type: NotificationType) => {
        api[type]({
            message: 'Продукт был успешно добавлен в корзину.',
            description: (
                <span>
                    <NavLink to="/pizza_basket" style={{ color: '#1890ff' }}>Перейти в корзину</NavLink>
                </span>
            ),
        })
    }

    const { data, loading } = useFetchData<PizzaData>(`https://pizza-webapp-server.onrender.com/products/${id}`)
    const { addItem } = useCart()

    return (
        <MainSection>
            {contextHolder}
            <TelegramBackButton />
            {loading ? <Loading /> : (
                data ? (
                    <>
                        <Swiper className="mySwiper mb-[25px]"
                            pagination={{
                                dynamicBullets: true,
                            }}
                            modules={[Pagination]}>
                            <SwiperSlide>
                                <img className='w-full h-[400px] object-cover rounded-[20px] mt-[15px]' src={'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'} alt="" />
                            </SwiperSlide>
                        </Swiper>
                        <div className='text-[18px] font-bold mb-[15px] tg-theme-text'>{data?.name}</div>
                        <div className='bg-tg-theme-secondary-bg p-[20px] rounded-[20px] mb-[20px]'>
                            <div className='text-blue-500 text-[22px] font-bold'>{data?.price} ₽</div>
                        </div>
                        <div className='bg-tg-theme-secondary-bg p-[20px] rounded-[20px] mb-[20px]'>
                            <div className='text-[16px] font-semibold tg-theme-text'>Размер пиццы</div>
                            <span className='text-gray-500 text-[12px] tg-theme-text'>Выберите размер пиццы:</span>
                            <Radio.Group className='flex flex-col gap-[5px] mt-[10px]' onChange={onChangeRadio} value={radioValue}>
                                <div className='flex items-center justify-between'>
                                    <Radio value={1} className='tg-theme-text'>Маленькая</Radio>
                                    <span className='text-[14px] tg-theme-text'>+0 ₽</span>
                                </div>
                                <div className='flex items-center justify-between'>
                                    <Radio value={2} className='tg-theme-text'>Средняя</Radio>
                                    <span className='text-[14px] tg-theme-text'>+150 ₽</span>
                                </div>
                                <div className='flex items-center justify-between'>
                                    <Radio value={3} className='tg-theme-text'>Большая</Radio>
                                    <span className='text-[14px] tg-theme-text'>+250 ₽</span>
                                </div>
                            </Radio.Group>
                            <div className='text-[16px] font-semibold mt-[15px] tg-theme-text'>Добавки</div>
                            <span className='text-gray-500 text-[12px]'>Выберите добавки к пицце:</span>
                            <div className='flex flex-col gap-[5px] mt-[10px]'>
                                <div className='flex items-center justify-between'>
                                    <Checkbox onChange={onChange} className='tg-theme-text'>Не нужно</Checkbox>
                                    <span className='text-[14px] tg-theme-text'>+0 ₽</span>
                                </div>
                                <div className='flex items-center justify-between'>
                                    <Checkbox onChange={onChange} className='tg-theme-text'>Шампиньоны</Checkbox>
                                    <span className='text-[14px] tg-theme-text'>+50 ₽</span>
                                </div>
                            </div>
                        </div>
                        <div className='bg-tg-theme-secondary-bg  p-[20px] rounded-[20px] mb-[20px]'>
                            <div className='mb-[20px] tg-theme-text'> Демонстрация наполнения</div>
                            <div className='mb-[20px] tg-theme-text'>В состав входят:</div>
                            <div className='flex flex-col gap-[30px]'>
                                {info.map((item: string, index: number) => (
                                    <span key={index} className='tg-theme-text'>{item}</span>
                                ))}
                            </div>
                        </div>
                        <div className='bg-tg-theme-secondary-bg p-[20px] rounded-[20px] mb-[150px]'>
                            <div className='text-[16px] font-bold tg-theme-text'>Отзывы</div>
                        </div>
                        <div className='fixed left-0 bottom-0 w-full p-[20px] bg-tg-theme-secondary-bg rounded-t-[15px]'>
                            <button className=' bg-blue-500 text-[14px] text-white w-full py-[7px] rounded-[8px]' onClick={() => {
                                addItem(data)
                                openNotificationWithIcon('success')
                            }} >Добавить в корзину</button>
                        </div>
                    </>
                ) : (
                    <Loading />
                )
            )}
        </MainSection>
    )
}

export default Inner
