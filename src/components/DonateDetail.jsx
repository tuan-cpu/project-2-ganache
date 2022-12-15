import avatar from '../assets/avatar.svg';
const DonateDetail = () => {
    return (
        <div className="lg:px-[14px] xl:px-[60px] grid lg:grid-cols-3 grid-cols-1 gradient-bg-transactions gap-[10px]">
            <div className="relative w-full lg:col-span-2">
                <img src="https://images.justgiving.com/image/a28fdd3f-5d8f-413c-824c-cb00f23d381a.jpg?template=PagesUIFeatureImage" alt="true"
                    className="w-full " />
            </div>
            <div className="grid grid-cols-1">
                <section className="flex justify-start lg:justify-center items-center text-left self-stretch flex-row w-full p-[18px]">
                    <figcaption>
                        <p className="text-red-500  text-3xl">£283,508</p>
                        <div className="text-slate-400">
                            <div>raised</div>
                            by
                            <span className="font-bold"> 3727 supporters</span>
                        </div>
                    </figcaption>
                </section>
                <section className="flex p-[18px] items-center flex-col">
                    <button
                        type="button"
                        onClick={() => { }}
                        className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer hover:bg-red-500">
                        Give now
                    </button>
                    <button
                        type="button"
                        onClick={() => { }}
                        className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer hover:bg-slate-400">
                        Share
                    </button>
                </section>
            </div>
            <div className="lg:col-span-2 text-white">
                <div class="inline-flex justify-center items-center w-full">
                    <hr class="mb-[20px] w-full h-px bg-gray-200 border-0 dark:bg-gray-700" />
                </div>
                <section className="max-w-[1240px] mx-auto">
                    <header className="font-semibold text-4xl pb-[20px]">Story</header>
                    <p>
                        <span className="text-slate-400">Here we go! I'm popping on my hiking boots and scaling the 3 highest mountains in the UK!
                            The 3 Peaks Challenge is no small task but I'm so excited, and a little bit terrified,
                            to be doing it all in aid of Global's Make Some Noise. For the past few years,
                            I have had the privilege of meeting incredible people who do truly life-changing work.
                            Right now, so many people across the UK are living in crisis and they need our help.
                            They have inspired me to take on the toughest challenge of my life! </span>
                    </p>
                    <h2 className="p-[20px] text-white font-medium text-center text-3xl">Share this story</h2>
                    <div className="flex items-center">
                        <button
                            type="button"
                            onClick={() => { }}
                            className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer hover:bg-blue-600">
                            Facebook
                        </button>
                        <button
                            type="button"
                            onClick={() => { }}
                            className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer hover:bg-blue-400">
                            Twitter
                        </button>
                    </div>
                </section>
            </div>
            <div className="text-white">
                <div class="inline-flex justify-center items-center w-full">
                    <hr class="mb-[20px] w-full h-px bg-gray-200 border-0 dark:bg-gray-700" />
                </div>
                <section className="max-w-[1240px] mx-auto flex flex-col">
                    <header className="font-semibold text-4xl pb-[20px]">
                        Supporters
                        <span className="float-right">3727</span>
                    </header>
                    <ul>
                        <li className="list-none flex w-full max-h-[100px]">
                            <div className="py-[15px] mr-[10px] basis-9">
                                <img src={avatar} alt="true" />
                            </div>
                            <section className="py-[15px] w-full flex flex-col">
                                <h2 className="font-normal text-white">
                                    Anonymous
                                    <span className="float-right text-slate-400">18 minutes ago</span>
                                </h2>
                                <p className="text-red-500  text-xl pb-[10px]">£2,00</p>
                                <div class="inline-flex justify-center items-center w-full">
                                    <hr class="mb-[20px] w-full h-px bg-gray-200 border-0 dark:bg-gray-700" />
                                </div>
                            </section>
                        </li>
                        <li className="list-none flex w-full max-h-[100px]">
                            <div className="py-[15px] mr-[10px] basis-9">
                                <img src={avatar} alt="true" />
                            </div>
                            <section className="py-[15px] w-full flex flex-col">
                                <h2 className="font-normal text-white">
                                    Anonymous
                                    <span className="float-right text-slate-400">18 minutes ago</span>
                                </h2>
                                <p className="text-red-500  text-xl pb-[10px]">£2,00</p>
                                <div class="inline-flex justify-center items-center w-full">
                                    <hr class="mb-[20px] w-full h-px bg-gray-200 border-0 dark:bg-gray-700" />
                                </div>
                            </section>
                        </li>
                        <li className="list-none flex w-full max-h-[100px]">
                            <div className="py-[15px] mr-[10px] basis-9">
                                <img src={avatar} alt="true" />
                            </div>
                            <section className="py-[15px] w-full flex flex-col">
                                <h2 className="font-normal text-white">
                                    Anonymous
                                    <span className="float-right text-slate-400">18 minutes ago</span>
                                </h2>
                                <p className="text-red-500  text-xl pb-[10px]">£2,00</p>
                                <div class="inline-flex justify-center items-center w-full">
                                    <hr class="mb-[20px] w-full h-px bg-gray-200 border-0 dark:bg-gray-700" />
                                </div>
                            </section>
                        </li>
                        <li className="list-none flex w-full max-h-[100px]">
                            <div className="py-[15px] mr-[10px] basis-9">
                                <img src={avatar} alt="true" />
                            </div>
                            <section className="py-[15px] w-full flex flex-col">
                                <h2 className="font-normal text-white">
                                    Anonymous
                                    <span className="float-right text-slate-400">18 minutes ago</span>
                                </h2>
                                <p className="text-red-500  text-xl pb-[10px]">£2,00</p>
                                <div class="inline-flex justify-center items-center w-full">
                                    <hr class="mb-[20px] w-full h-px bg-gray-200 border-0 dark:bg-gray-700" />
                                </div>
                            </section>
                        </li>
                    </ul>
                </section>
            </div>
        </div>
    )
}

export default DonateDetail;