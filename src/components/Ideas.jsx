const Ideas = () =>{
    return(
        <div className="flex flex-col sm:py-10 py-6 justify-center items-center gradient-bg-ideas">
            <div>
            <h1 className="text-2xl sm:text-4xl text-white text-gradient py-2">Ideas to get you started</h1></div>
            <div>
            <p className="text-white text-[16px] font-light text-base">There are a lots of ways to make good things happen</p></div>
            <div className="grid grid-cols-2 w-full mt-10">
                <div className="text-white justify-center items-center flex">text</div>
                <div className="text-white justify-center items-center flex">text</div>
                <div className="text-white justify-center items-center flex">text</div>
                <div className="text-white justify-center items-center flex">text</div>
            </div>
        </div>
    )
}

export default Ideas;