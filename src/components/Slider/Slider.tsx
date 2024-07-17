const Slider = () => {
    return (
        <div className='w-full overflow-y-scroll scrollbar-hide flex gap-[12px]'>
            <div className='flex-none w-[320px] h-[140px] bg-red-500 overflow-hidden rounded-[20px] ml-[12px]'>
                <img src="https://admin.webbot.shop/storage/2024/04/14/9216e4763413991548b86e2adfcdd79448f43ee5.png" alt="" />
            </div>
            <div className='flex-none w-[320px] h-[140px] bg-green-500 overflow-hidden rounded-[20px]'>
                <img src="https://admin.webbot.shop/storage/2024/04/14/6365d0aa580824e8d8b23a50208a48bd27f0b347.png" alt="" />
            </div>
            <div className='flex-none w-[320px] h-[140px] bg-green-500 overflow-hidden rounded-[20px]'>
                <img src="https://admin.webbot.shop/storage/2024/04/14/9216e4763413991548b86e2adfcdd79448f43ee5.png" alt="" />
            </div>
        </div>
    )
}

export default Slider
