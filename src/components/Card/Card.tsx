import { NavLink } from 'react-router-dom'

const Card = ({ data = [1, 2, 3] }: any) => {

    let imgUrl = 'https://admin.webbot.shop/storage/2024/02/11/ff4765178193cee55b5c44b63b0d7c4424ff378f.jpg'

    return (
        <ul className='grid grid-cols-2 gap-[10px]'>
            {
                data?.map((item: any, index: number) => {
                    return (
                        <li className='w-[200px]' key={index} >
                            <NavLink to={'/inner'}>
                                <img className='w-full h-[180px] rounded-[20px] mb-[10px]' src={imgUrl} alt="" />
                                <h4 className='text-[14px] mb-[3px]'>{item.name ? item.name : '🔥Пицца из половинок'}</h4>
                                <p className='text-[11px] mb-[10px]'>{item.description ? item.description : 'Соберите свою пиццу 35 см с двумя разными вкусами'}</p>
                                <div className='text-[16px] font-bold'>{item.price ? item.price : '550 ₽'}</div>
                                <div className='flex gap-[4px] items-center text-[12px] font-bold text-gray-400 mb-[10px]'>650 ₽ <span className='text-[11px] font-normal text-blue-500'>-15%</span></div>
                                <button className='bg-blue-500 text-[14px] text-white w-full py-[5px] rounded-[8px]'>Купить</button>
                            </NavLink>
                        </li>
                    )
                })
            }
        </ul>
    )
}

export default Card
