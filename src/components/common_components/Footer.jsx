import { SiEthereum } from "react-icons/si";
const Footer = () => {
    return (
        <div className='w-full flex md:justify-center justify-between items-center flex-col p-4 gradient-bg-footer'>
            <div className='flex flex-[0.5] justify-center items-center text-white font-extrabold text-xl'>
                <SiEthereum /><span>Token Giving</span>
            </div>
            <div className='flex justify-center items-center flex-col mt-5'>
                <p className='text-white text-sm text-center'>Hợp tác phát triển</p>
                <p className='text-white text-sm text-center'>info@email.com</p>
            </div>
            <div className='sm:w-[90%] w-full h-[0.25px] bg-gray-400 mt-5' />
            <div className='sm:w-[90%] w-full flex justify-between items-center mt-3'>
                <p className='text-white text-sm text-center'>@tokengiving 2022-2023</p>
                <p className='text-white text-sm text-center'>All rights reserved</p>
            </div>
        </div>
    )
}

export default Footer;