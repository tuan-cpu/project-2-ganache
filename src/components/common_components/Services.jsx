import { BsShieldFillCheck } from 'react-icons/bs';
import { BiSearchAlt } from 'react-icons/bi';
import { RiHeart2Fill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

const ServiceCard = ({color,title,icon,subtitle,nav,type}) =>(
    <div className='flex flex-row justify-start items-center white-glassmorphism p-3 m-2 cursor-pointer hover:shadow-xl w-4/5' onClick={()=>{nav(`/event/${type}`)}}>
        <div className={`w-10 h-10 rounded-full flex justify-center items-center ${color}`}>
            {icon}
        </div>
        <div className='ml-5 flex flex-col flex-1 text-white'>
            <h1 className='mt-2 text-lg'>{title}</h1>
            <p className='mt-2 text-sm md:w-9/12'>{subtitle}</p>
        </div>
    </div>
)

const Services = () =>{
    const navigate = useNavigate();
    return(
        <div className='flex w-full justify-center items-center gradient-bg-services'>
            <div className='flex mf:flex-row flex-col items-center justify-between md:p-20 py-12 px-4'>
                <div className='flex-1 flex flex-col justify-start items-start'>
                    <h1 className='text-white text-3xl sm:text-5xl text-gradient'>Các sự kiện đang<br/>diễn ra.</h1>
                </div>
            </div>
            <div className='flex-1 flex flex-col justify-start items-center'>
                <ServiceCard
                color="bg-[#2952b3]"
                title='Sự kiện vĩnh viễn'
                icon={<BsShieldFillCheck fontSize={21} className='text-white'/>}
                subtitle='Các sự kiện này do Admin thiết lập. Chúng sẽ chạy mãi mãi và quỹ sẽ được giải ngân hàng quý.'
                nav={navigate}
                type='lifetime'
                />
                <ServiceCard
                color="bg-[#8945f8]"
                title='Sự kiện đột xuất'
                icon={<BiSearchAlt fontSize={21} className='text-white'/>}
                subtitle='Các sự kiện này do Admin thiết lập. Chúng sẽ chạy trong một thời gian giới hạn và quỹ sẽ được giải ngân khi kết thúc sự kiện.'
                nav={navigate}
                type='limited'
                />
                <ServiceCard
                color="bg-[#f84550]"
                title='Sự kiện gây quỹ của người dùng'
                icon={<RiHeart2Fill fontSize={21} className='text-white'/>}
                subtitle='Những khoản tiền này được tăng lên bởi người dùng. Chúng sẽ chạy trong một khoảng thời gian đã định trước đó và tiền sẽ được gửi trực tiếp đến ví của chủ sở hữu (người đã huy động vốn).'
                nav={navigate}
                type='users'
                />
            </div>
        </div>
    )
}

export default Services;