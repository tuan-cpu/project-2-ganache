import sponsor1 from '../assets/sponsor1.svg';
import sponsor2 from '../assets/sponsor2.svg';
const Sponsor = () =>(
    <div className="px-[12px] py-[30px] gradient-bg-transactions">
        <div className="grid grid-cols-1 mx-[20px] sm:mx-[28px] lg:mx-[36px] flex justify-center items-center justify-items-center">
            <div className="mb-[24px] px-[12px]">
                <p className="font-light text-center text-white">Tham gia <span className="font-normal">25,788 quỹ từ thiện</span>, tổ chức và trường học trên TokenGiving</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 w-3/4">
                <div className='pr-[20px] pb-[20px]'><img src={sponsor1} alt="true"/></div>
                <div className='pb-[20px]'><img src={sponsor2} alt="true"/></div>
            </div>
            <div className='px-[12px] pb-[20px]'>
                <p className="text-xl md:text-3xl text-white">Bạn làm cho tổ chức từ thiện?</p>
            </div>
            <button type="button" 
            className="inline-block px-6 py-2 border-2 
            border-gray-200 text-gray-200 font-medium text-xs 
            leading-tight uppercase rounded hover:bg-black 
            hover:bg-opacity-5 focus:outline-none focus:ring-0 
            transition duration-150 ease-in-out"><p className='py-[10px] px-[100px] font-semibold'>Tham gia ngay</p></button>
        </div>
    </div>
)

export default Sponsor;