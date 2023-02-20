import image1 from '../assets/image1.svg';
import image2 from '../assets/image2.svg';
import image3 from '../assets/image3.svg';
import image4 from '../assets/image4.svg';
import { NavLink } from "react-router-dom";
const IdeaCard = ({title,subtitle,ImgLink}) =>(
    <div className="flex flex-row justify-start items-center white-glassmorphism p-3 m-2 hover:shadow-xl p-[24px]">
        <div className='ml-5 flex flex-col flex-1'>
            <h1 className='mt-2 text-lg text-white'>{title}</h1>
            <p className='mt-2 text-sm md:w-9/12 text-[#d7d3d3]'>{subtitle}</p>
            <NavLink className="my-[10px] text-[#3f51db]" to='/create/users'>Bắt đầu gây quỹ</NavLink>
        </div>
        <div className="min-w-[70px] h-20">
            <img src={ImgLink} alt="true"/>
        </div>
    </div>
)
const Ideas = () =>{
    return(
        <div className="flex flex-col sm:py-10 py-6 justify-center items-center gradient-bg-ideas">
            <div>
            <h1 className="text-2xl sm:text-4xl text-white text-gradient py-2">Ý tưởng cho bạn</h1></div>
            <div>
            <p className="text-white text-[16px] font-light text-base">Có nhiều cách để làm điều tốt</p></div>
            <div className="grid grid-cols-2 w-full mt-10 px-[20px] lg:px-[36px] gap-6">
                <IdeaCard title="Giúp những người cần bạn"
                subtitle="Cung cấp hỗ trợ trực tiếp cho một cá nhân, gia đình hoặc cộng đồng bằng cách thanh toán chi phí y tế hoặc cung cấp hỗ trợ tài chính."
                ImgLink={image1}
                />
                <IdeaCard title="Hãy hành động trong trường hợp khẩn cấp"
                subtitle="Gây quỹ để đối phó với thảm họa thiên nhiên và khủng hoảng nhân đạo. Tạo sự khác biệt trong vài phút."
                ImgLink={image2}/>

                <IdeaCard title="Tham gia một sự kiện từ thiện"
                subtitle="Chọn từ hàng trăm sự kiện chính thức bao gồm chạy marathon, đạp xe, ba môn phối hợp và đua xe…"
                ImgLink={image3}/>
                <IdeaCard title="Kỉ niệm 1 sự kiện"
                subtitle="Đánh dấu một sự kiện đặc biệt như sinh nhật, đám cưới hoặc kỳ thi cuối kỳ bằng cách nhờ bạn bè đóng góp thay vì quà tặng."
                ImgLink={image4}/>
            </div>
        </div>
    )
}

export default Ideas;