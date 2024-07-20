import './Loading.css' // Importing CSS file for loading spinner styles

// Loading functional component
function Loading() {

    return (
        <div className='fixed top-0 left-0 w-full h-screen bg-white flex justify-center items-center'>
            <div className="simple-spinner">
                <span></span>
            </div>
        </div>
    )
}

export default Loading