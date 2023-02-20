const commonStyle = "";
const SubFooter = () =>(
    <div className="flex justify-center items-center gradient-bg-transactions">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="grid grid-cols-1 p-[20px]">
                <p className="text-lg leading-6 text-white">Dành cho người gây quỹ & nhà tài trợ</p>
                <ul className="grid grid-cols-1 text-[#737373]">
                    <li>Quyên góp tiền cho một tổ chức từ thiện</li>
                    <li>Bắt đầu gọi vốn cộng đồng</li>
                    <li>Gây quỹ của bạn</li>
                    <li>Giúp đỡ và hỗ trợ</li>
                </ul>
            </div>
            <div className="grid grid-cols-1 p-[20px]">
                <p className="text-lg leading-6 text-white">Cho các tổ chức từ thiện</p>
                <ul className="grid grid-cols-1 text-[#737373]">
                    <li>Tham gia TokenGiving</li>
                    <li>Đăng nhập bằng tài khoản của tổ chức</li>
                    <li>Hỗ trợ và giúp đỡ cho các quỹ từ thiện</li>
                    <li>Đọc blog của chúng tôi</li>
                </ul>
            </div>
            <div className="grid grid-cols-1 p-[20px]">
                <p className="text-lg leading-6 text-white">Cho các công ti và đối tác</p>
                <ul className="grid grid-cols-1 text-[#737373]">
                    <li>Hợp tác gây quỹ</li>
                    <li>Sự kiện đối tác</li>
                    <li>Công cục nhà phát triển</li>
                </ul>
            </div>
            <div className="grid grid-cols-1 p-[20px]">
                <p className="text-lg leading-6 text-white">Về TokenGiving</p>
                <ul className="grid grid-cols-1 text-[#737373]">
                    <li>Chúng tôi là ai</li>
                    <li>Công việc tại TokenGiving</li>
                    <li>Trung tâm kĩ thuật số</li>
                </ul>
            </div>
        </div>
    </div>
)

export default SubFooter;