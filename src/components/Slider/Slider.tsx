const Slider = () => {
    return (
        <div className='w-full overflow-y-scroll scrollbar-hide flex gap-[12px]'>
            <div className='flex-none w-[320px] h-[150px] bg-red-500 rounded-[20px] ml-[12px]'></div>
            <div className='flex-none w-[320px] h-[150px] bg-green-500 rounded-[20px]'></div>
            <div className='flex-none w-[320px] h-[150px] bg-orange-500 rounded-[20px]'></div>
            <div className='flex-none w-[320px] h-[150px] bg-red-500 rounded-[20px] mr-[12px]'></div>
        </div>
    )
}

export default Slider
