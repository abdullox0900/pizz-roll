import { NavLink } from 'react-router-dom'
import MainSection from '../../components/MainSection/MainSection'

const Favorites = () => {
    return (
        <MainSection sectionClass='flex flex-col items-center justify-between h-95vh  mb-[20px]'>
            <h3 className='text-[22px] font-bold text-center mt-[35px]'>Избранное</h3>

            <div>
                <div className='text-[22px] font-bold'>У вас ещё нет товаров в избранном</div>
                <div className='text-center'>Найдите товары в каталоге</div>
            </div>

            <NavLink to={'/'} className='bg-blue-500 w-full text-center rounded-[10px] py-[8px] text-[18px] text-white font-semibold'>В каталог</NavLink>
        </MainSection>
    )
}

export default Favorites
