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
                    <h1 className='text-white text-3xl sm:text-5xl text-gradient'>Events that are <br/>currently running.</h1>
                </div>
            </div>
            <div className='flex-1 flex flex-col justify-start items-center'>
                <ServiceCard
                color="bg-[#2952b3]"
                title='Lifetime campaigns'
                icon={<BsShieldFillCheck fontSize={21} className='text-white'/>}
                subtitle='These campaigns are set by the Admin. They will run forever and the fund will be disbursed every quarter.'
                nav={navigate}
                type='lifetime events'
                />
                <ServiceCard
                color="bg-[#8945f8]"
                title='Urgent(limited time) campaigns'
                icon={<BiSearchAlt fontSize={21} className='text-white'/>}
                subtitle='These campaigns are set by the Admin. They will run for a limited time and the fund will be disbursed at the end of the campaign.'
                nav={navigate}
                type='limited events'
                />
                <ServiceCard
                color="bg-[#f84550]"
                title='Users fundraising'
                icon={<RiHeart2Fill fontSize={21} className='text-white'/>}
                subtitle='These funds are rise by the Users. They will run in a previous set time and the fund will be sent directly to the owner(who raised fund) wallet.'
                nav={navigate}
                type='users events'
                />
            </div>
        </div>
    )
}

export default Services;