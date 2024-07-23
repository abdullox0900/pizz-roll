import { NavLink } from 'react-router-dom'

const Card = ({ data }: any) => {

    return (
        <ul className='grid grid-cols-2 gap-[10px]'>
            {
                data ? (
                    data?.map((item: any, index: number) => {
                        return (
                            <li className='w-[180px]' key={index} >
                                <NavLink to={`/inner/${item.id}`}>
                                    <img className='w-full h-[180px] rounded-[20px] mb-[10px]' src={'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'} alt="" />
                                    <h4 className='text-[14px] mb-[3px] tg-theme-text'>{item.name?.length > 20 ? item.name.slice(0, 20) + '...' : item.name}</h4>
                                    <p className='text-[11px] mb-[10px] tg-theme-text'>{item.description?.length > 45 ? item.description.slice(0, 45) + '...' : item.description}</p>
                                    <div className='text-[16px] font-bold tg-theme-text mb-[15px]'>{item.price + '₽'}</div>
                                    <button className='bg-blue-500 text-[14px] text-white w-full py-[5px] rounded-[8px]'>Купить</button>
                                </NavLink>
                            </li>
                        )
                    })
                ) : (
                    // <Loading /> ""
                    <></>
                )
            }
        </ul>
    )
}

export default Card
