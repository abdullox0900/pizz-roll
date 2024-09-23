import { NavLink } from 'react-router-dom'

const Card = ({ data }: any) => {

    return (
        <ul className='grid grid-cols-2 gap-[10px]'>
            {
                data ? (
                    data?.map((item: any, index: number) => {
                        return (
                            <li className='w-[180px] min-h-[250px] border-[1px] border-slate-200 rounded-[20px] p-[10px]' key={index} >
                                <NavLink to={`/inner/${item.id}`} className="flex flex-col justify-between h-full">
                                    <div>
                                        <img className='w-full h-[180px] rounded-[5px] mb-[10px] object-cover' src={`http://localhost:3000${item.imageUrl}`} alt="" />
                                        <h4 className='text-[14px] mb-[3px] tg-theme-text'>{item.name?.length > 20 ? item.name.slice(0, 20) + '...' : item.name}</h4>
                                        <p className='text-[11px] mb-[10px] tg-theme-text'>{item.description?.length > 45 ? item.description.slice(0, 45) + '...' : item.description}</p>
                                        <div className='text-[16px] font-bold tg-theme-text mb-[15px]'>{item.price + '₽'}</div>
                                    </div>
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
