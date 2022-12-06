const commonStyle = "";
const SubFooter = () =>(
    <div className="flex justify-center items-center gradient-bg-transactions">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="grid grid-cols-1 p-[20px]">
                <p className="text-lg leading-6 text-white">For Fundraisers & Donors</p>
                <ul className="grid grid-cols-1 text-[#737373]">
                    <li>Raise money for a charity</li>
                    <li>Start crowdfunding</li>
                    <li>Your fundraising</li>
                    <li>Help and support</li>
                </ul>
            </div>
            <div className="grid grid-cols-1 p-[20px]">
                <p className="text-lg leading-6 text-white">For Charities</p>
                <ul className="grid grid-cols-1 text-[#737373]">
                    <li>Join TokenGiving</li>
                    <li>Log in to your charity account</li>
                    <li>Help & support for charities</li>
                    <li>Read our charity blog</li>
                </ul>
            </div>
            <div className="grid grid-cols-1 p-[20px]">
                <p className="text-lg leading-6 text-white">For companies & partners</p>
                <ul className="grid grid-cols-1 text-[#737373]">
                    <li>Corporate fundraising</li>
                    <li>Event partners</li>
                    <li>Developer tool</li>
                </ul>
            </div>
            <div className="grid grid-cols-1 p-[20px]">
                <p className="text-lg leading-6 text-white">About TokenGiving</p>
                <ul className="grid grid-cols-1 text-[#737373]">
                    <li>Who we are</li>
                    <li>Careers at TokenGiving</li>
                    <li>Media centre</li>
                </ul>
            </div>
        </div>
    </div>
)

export default SubFooter;