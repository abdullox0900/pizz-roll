import { CheckboxProps, RadioChangeEvent, notification } from 'antd'
import { useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from "swiper/react"
import Loading from '../../components/Loading/Loading'
import MainSection from '../../components/MainSection/MainSection'
import TelegramBackButton from '../../components/TelegramBackButton/TelegramBackButton'
import { useCart } from '../../context/CartContext'
import useFetchData from '../../hooks/useFetcher'

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

    const { data, loading } = useFetchData<any>(`http://localhost:3000/api/admin/pizzas/${id}`)
    const { addItem } = useCart()

    console.log(data)


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
                                <img className='w-full h-[400px] object-cover rounded-[20px] mt-[15px]' src={`http://localhost:3000${data?.imageUrl}`} alt="" />
                            </SwiperSlide>
                        </Swiper>
                        <div className='text-[18px] font-bold mb-[15px] tg-theme-text'>{data?.name}</div>
                        <div className='bg-tg-theme-secondary-bg p-[20px] rounded-[20px] mb-[20px]'>
                            <div className='text-blue-500 text-[22px] font-bold'>{data?.price} ₽</div>
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
