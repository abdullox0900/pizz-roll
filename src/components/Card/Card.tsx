import { NavLink } from 'react-router-dom'
import Loading from '../Loading/Loading'

const Card = ({ data }: any) => {

    return (
        <ul className='grid grid-cols-2 gap-[10px]'>
            {
                data ? (
                    data?.map((item: any, index: number) => {
                        return (
                            <li className='w-[180px]' key={index} >
                                <NavLink to={`/inner/${item.productId}`}>
                                    <img className='w-full h-[180px] rounded-[20px] mb-[10px]' src={item.product_img} alt="" />
                                    <h4 className='text-[14px] mb-[3px] tg-theme-text'>{item.product_name.length > 20 ? item.product_name.slice(0, 20) + '...' : item.product_name}</h4>
                                    <p className='text-[11px] mb-[10px] tg-theme-text'>{item.product_description.length > 45 ? item.product_description.slice(0, 45) + '...' : item.product_description}</p>
                                    <div className='text-[16px] font-bold tg-theme-text'>{item.product_price + '₽'}</div>
                                    <div className='flex gap-[4px] items-center text-[12px] font-bold text-gray-400 mb-[10px]'>{item.product_discount} ₽ <span className='text-[11px] font-normal text-blue-500'>-15%</span></div>
                                    <button className='bg-blue-500 text-[14px] text-white w-full py-[5px] rounded-[8px]'>Купить</button>
                                </NavLink>
                            </li>
                        )
                    })
                ) : (
                    <Loading />
                )
            }
        </ul>
    )
}

export default Card
