import { useState, useEffect } from "react";
import cccd from '../assets/cccd.jpg';
import cccd2 from '../assets/cccd2.jpg';
import { NavLink } from "react-router-dom";
import QrScanner from "qr-scanner";
import { ToastContainer, toast } from 'react-toastify';
import { storage } from "../../utils/firebase.js";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { useAuthContext } from "../../controller/AuthProvider";
import { useDataContext } from "../../controller/DataProvider";
const Input = ({ placeholder, name, type, value, handleChange }) => (
    <input
        placeholder={placeholder}
        type={type}
        name={name}
        onChange={(e) => handleChange(e, name)}
        value={value}
        className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-white text-sm white-glassmorphism"
        required
    />
)
const VerifyUser = () => {
    const { user } = useAuthContext();
    const { createVerifyInquiry } = useDataContext();
    useEffect(() => {
        let authToken = sessionStorage.getItem('Auth Token')
        if (!authToken) {
            navigate('/login')
        }
    }, []);
    const [file1, setFile1] = useState("");
    const [file2, setFile2] = useState("");
    const [status, setStatus] = useState(true);
    const [percent, setPercent] = useState(0);
    const [confirm, setConfirm] = useState(false);
    const [formData, setFormData] = useState({
        user_id: "",
        file1: "",
        qr_info: ""
    })
    useEffect(() => {
        if (file2 !== "")
            QrScanner.scanImage(file2)
                .then(result => {
                    setFormData((prevState) => ({ ...prevState, qr_info: result }));
                })
                .catch(error => setStatus(false));
    }, [file2]);
    const handleUpload = () => {
        if (!file1 || !file2) {
            toast.error("Chọn ảnh trước khi upload!");
            return;
        }
        const storageRef = ref(storage, `userInfoImage/${user.id}/${file1.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file1);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const percent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );

                // update progress
                setPercent(percent);
            },
            (err) => console.log(err),
            () => {
                getDownloadURL(storageRef)
                    .then((url) => {
                        console.log('File available at', url);
                        setFormData((prevState) => ({ ...prevState, file1: url }));
                        setFormData((prevState) => ({ ...prevState, user_id: user.id }));
                        setConfirm(true);
                    });
            }
        );
    }
    useEffect(() => {
        if (confirm) {
            submit(formData);
        }
    }, [confirm]);
    const submit = async (data) => {
        await createVerifyInquiry(data);
        toast.success("Submission complete!");
    }
    return (
        <div className="flex flex-col gradient-bg-transactions md:p-20 py-12 px-4">
            <div className="grid md:grid-cols-2 grid-cols-1">
                <div>
                    <h1 className="text-xl sm:text-3xl text-white text-gradient py-1">Hướng dẫn xác thực</h1>
                    <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
                        Để xác thực người dùng, bạn phải upload 2 ảnh sau:
                        <br />- 1 ảnh mặt trước căn cước
                        <br />- 1 ảnh phóng to mã QR trên căn cước (càng nét càng tốt)
                        <br />Vì đây là quy trình rất quan trọng trong việc chống giả mạo, lừa đảo, đội ngũ admin sẽ
                        kiểm tra thông tin căn cước của bạn để xác định độ chính xác.
                        <br />Đây không phải là quy trình tự động, có thể mất từ 1 đến 2 ngày.
                        <br />Mọi thắc mắc xin liên hệ chúng tôi qua đường link sau: <NavLink to={'/requestInquiry'}>Yêu cầu</NavLink>
                    </p>
                </div>
                <div>
                    <h1 className="text-xl sm:text-3xl text-white text-gradient py-1">Ảnh mẫu</h1>
                    <div className="flex flex-row">
                        <div className="flex flex-col">
                            <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">Ảnh mặt trước căn cước</p>
                            <img alt="true" src={cccd} width={150} height={150} />
                        </div>
                        <div className="flex flex-col">
                            <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">Ảnh phóng to mã QR</p>
                            <img alt="true" src={cccd2} width={150} height={150} />
                        </div>
                    </div>
                </div>
            </div>
            <h1 className="text-xl sm:text-3xl text-white text-gradient py-1">Upload ảnh của bạn</h1>
            <div className="grid sm:grid-cols-2 grid-cols-1">
            <div>
                <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">Ảnh mặt trước căn cước:</p>
                <Input type="file" name="image" handleChange={(e) => {
                    setFile1(e.target.files[0]);
                }} accept="" />
            </div>
            <div>
            <div>
                <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">Ảnh phóng to mã QR:</p>
                <Input type="file" name="image" handleChange={(e) => {
                    setFile2(e.target.files[0]);
                }} accept="" />
            </div>
            {status ? '' : (
                <div className="flex items-center gap-[10px]">
                    <AiOutlineExclamationCircle fontSize={17} color='#ff0000' />
                    <p className="text-[#ff0000] text-sm">Hãy chọn ảnh QR khác rõ hơn!</p>
                </div>
            )}
            </div>
            </div>
            <p className="text-white">{percent} % hoàn thành</p>
            <button
                type="button"
                onClick={handleUpload}
                className="text-white mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer mb-[20px] hover:bg-red-600 items-center">
                Gửi yêu cầu
            </button>
            <ToastContainer />
        </div>
    )
}

export default VerifyUser;