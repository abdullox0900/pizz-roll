import { IoSearch } from "react-icons/io5"

const Search = () => {
    return (
        <div className='py-[12px] px-[18px]  border-b-[1px] border-gray-300 rounded-b-[20px] mb-[15px]'>
            <div className='relative w-full py-[10px] bg-slate-200 rounded-[10px] '>
                <IoSearch className='absolute left-[7px] top-[10px] text-[24px] text-slate-400' />
                <input className='w-full pl-[35px] text-[14px] text-slate-500 bg-transparent outline-none' type="text" placeholder='Search...' />
            </div>
        </div>
    )
}

export default Search
