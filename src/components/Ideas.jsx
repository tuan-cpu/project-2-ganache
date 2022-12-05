import image1 from '../assets/image1.svg'
import image2 from '../assets/image2.svg'
import image3 from '../assets/image3.svg'
import image4 from '../assets/image4.svg'
const IdeaCard = ({title,subtitle,ImgLink}) =>(
    <div className="flex flex-row justify-start items-center white-glassmorphism p-3 m-2 hover:shadow-xl p-[24px]">
        <div className='ml-5 flex flex-col flex-1'>
            <h1 className='mt-2 text-lg text-white'>{title}</h1>
            <p className='mt-2 text-sm md:w-9/12 text-[#d7d3d3]'>{subtitle}</p>
            <a className="my-[10px] text-[#3f51db]">Start fundraising</a>
        </div>
        <div className="min-w-[70px] h-20">
            <img src={ImgLink} alt/>
        </div>
    </div>
)
const Ideas = () =>{
    return(
        <div className="flex flex-col sm:py-10 py-6 justify-center items-center gradient-bg-ideas">
            <div>
            <h1 className="text-2xl sm:text-4xl text-white text-gradient py-2">Ideas to get you started</h1></div>
            <div>
            <p className="text-white text-[16px] font-light text-base">There are a lots of ways to make good things happen</p></div>
            <div className="grid grid-cols-2 w-full mt-10 px-[20px] lg:px-[36px] gap-6">
                <IdeaCard title="Help people in need"
                subtitle="Provide direct support to an individual, family or community by paying medical expenses or offering financial aid."
                ImgLink={image1}
                />
                <IdeaCard title="Take action in an emergency"
                subtitle="Raise funds in response to a natural disaster or humanitarian crisis. Make a difference in minutes."
                ImgLink={image2}/>

                <IdeaCard title="Take part in a charity event"
                subtitle="Choose from hundreds of official events including marathons, bike rides, Dryathlons and bake offs…"
                ImgLink={image3}/>
                <IdeaCard title="Celebrate an occasion"
                subtitle="Mark a special event like a birthday, wedding or final exam by asking friends for donations rather than gifts."
                ImgLink={image4}/>
            </div>
        </div>
    )
}

export default Ideas;