import { NavLink } from 'react-router-dom'
import { API_BASE_URL } from '../../config/api'

const Card = ({ data }: any) => {

    return (
        <ul className='grid grid-cols-2 gap-[10px]'>
            {
                data ? (
                    data?.map((item: any, index: number) => {
                        return (
                            <li className='w-[180px] min-h-[250px] border-[1px] border-slate-200 rounded-[20px] p-[10px]' key={index} >
                                <NavLink to={`/inner/${item._id}`} className="flex flex-col justify-between h-full">
                                    <div>
                                        <img className='w-full h-[180px] rounded-[5px] mb-[10px] object-cover' src={`${API_BASE_URL}${item.imageUrl}`} alt="" />
                                        {/* ... rest of the item JSX ... */}
                                    </div>
                                    <button className='bg-blue-500 text-[14px] text-white w-full py-[5px] rounded-[8px]'>Купить</button>
                                </NavLink>
                            </li>
                        )
                    })
                ) : (
                    <></>
                )
            }
        </ul>
    )
}

export default Card
