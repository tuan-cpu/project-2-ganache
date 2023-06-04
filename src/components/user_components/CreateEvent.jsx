import { useState, useEffect } from "react";
import { allStates } from "../../utils/state";
import { City } from 'country-state-city';
import { storage } from "../../utils/firebase.js";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { ToastContainer, toast } from 'react-toastify';
import tags from "../../utils/tags";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../../controller/AuthProvider";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
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
const CreateEvent = () => {
    const { user } = useAuthContext();
    const { createEvent } = useDataContext();
    const navigate = useNavigate();
    let { type } = useParams();
    useEffect(() => {
        let authToken = sessionStorage.getItem('Auth Token')
        if (!authToken) {
            navigate('/login')
        }
        if (type !== 'users' && user.role !== 'admin') {
            navigate('/');
        }
    }, []);
    const [userInfoShow, setUserInfoShow] = useState(true);
    const [eventInfoShow, setEventInfoShow] = useState(false);
    const [categoryInfoShow, setCategoryInfoShow] = useState(false);
    const [chosenState, setChosenState] = useState();
    const [allCities, setAllCities] = useState();
    const [chosenCity, setChosenCity] = useState();
    const [confirm, setConfirm] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        wallet: "",
        tag: "",
        title: "",
        story: "",
        event: "",
        state: "",
        city: "",
        image: "",
        amount: 0,
        supporters: [],
        start: "",
        end: "",
        user_id: user.id,
        status: false
    });
    const [formState, setFormState] = useState({
        name: true,
        wallet: true,
        tag: true,
        title: true,
        story: true,
        event: true,
        state: true,
        city: true,
        image: true
    });
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    useEffect(() => {
        setAllCities(City.getCitiesOfState("VN", chosenState));
    }, [chosenState]);

    const handleChange = (e, name) => {
        setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
    }
    const [imageShow, setImageShow] = useState(false);
    const [percent, setPercent] = useState(0);
    const [file, setFile] = useState("");
    const handleUpload = () => {
        setFormData((prevState) => ({ ...prevState, start: startDate, end: endDate }));
        if (!file) {
            toast.error("Please choose an image first!");
            return;
        }
        const storageRef = ref(storage, `eventImages/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
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
                        setFormData((prevState) => ({ ...prevState, image: url }));
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
        await createEvent(data);
        toast.success("Submission complete!");
    }
    return (
        <div className="gradient-bg-transactions grid md:grid-cols-2 grid-cols-1 p-5 gap-[10px] min-h-screen">
            {userInfoShow ?
                <div className="flex flex-col">
                    <div className="flex flex-col">
                        <p className="text-bold text-3xl text-white">Thông tin người tạo sự kiện</p>
                        <Input placeholder='Tên' name='name' type='text' handleChange={handleChange} />
                        {!formState.name ? (
                            <div className="flex items-center gap-[10px]">
                                <AiOutlineExclamationCircle fontSize={17} color='#ff0000' />
                                <p className="text-[#ff0000] text-sm">Dòng này không được trống!</p>
                            </div>
                        ) : ""}
                        <Input placeholder='Địa chỉ ví' name='wallet' type='text' handleChange={handleChange} />
                        {!formState.wallet ? (
                            <div className="flex items-center gap-[10px]">
                                <AiOutlineExclamationCircle fontSize={17} color='#ff0000' />
                                <p className="text-[#ff0000] text-sm">Dòng này không được trống!</p>
                            </div>
                        ) : ""}
                        <button
                            type="button"
                            onClick={() => {
                                if (!formData.name) setFormState((prevState) => ({ ...prevState, name: false }));
                                if (!formData.wallet) setFormState((prevState) => ({ ...prevState, wallet: false }));
                                if (formData.name && formData.wallet) {
                                    setCategoryInfoShow(true);
                                    setFormState((prevState) => ({ ...prevState, name: true }));
                                    setFormState((prevState) => ({ ...prevState, wallet: true }));
                                };
                            }}
                            className="text-white mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer mb-[20px] hover:bg-red-600">
                            Tiếp theo</button>
                    </div>
                    {categoryInfoShow ?
                        <div className="flex flex-col">
                            <p className="text-bold text-3xl text-white">Chọn 1 nhãn phân loại</p>
                            <select id="category"
                                onChange={(e) => setFormData((prevState) => ({ ...prevState, tag: e.target.value }))}
                                className="mt-[10px] bg-gray-50 border border-white text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option selected disabled>Chọn 1 nhãn</option>
                                {tags.map((tag) => tag.id !== 1 && <option key={tag.id} value={tag.name}>{tag.name}</option>)}
                            </select>
                            {!formState.tag ? (
                                <div className="flex items-center gap-[10px] pt-[10px]">
                                    <AiOutlineExclamationCircle fontSize={17} color='#ff0000' />
                                    <p className="text-[#ff0000] text-sm">Phải chọn 1 nhãn!</p>
                                </div>
                            ) : ""}
                            <button
                                type="button"
                                onClick={() => {
                                    if (!formData.tag) setFormState((prevState) => ({ ...prevState, tag: false }));
                                    else {
                                        setEventInfoShow(true);
                                        setFormState((prevState) => ({ ...prevState, tag: true }));
                                    }
                                }}
                                className="text-white mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer mb-[20px] hover:bg-red-600">
                                Tiếp theo
                            </button>
                        </div> : ''}
                </div> : ''}
            {eventInfoShow ?
                <div className="flex flex-col">
                    <div className="flex flex-col">
                        <p className="text-white text-bold text-3xl">Thông tin sự kiện</p>
                        <Input placeholder='Tiêu đề' name='title' type='text' handleChange={handleChange} />
                        {!formState.title ? (
                            <div className="flex items-center gap-[10px]">
                                <AiOutlineExclamationCircle fontSize={17} color='#ff0000' />
                                <p className="text-[#ff0000] text-sm">Dòng này không được trống!</p>
                            </div>
                        ) : ""}
                        <Input placeholder='Sự kiện' name='event' type='text' handleChange={handleChange} />
                        {!formState.event ? (
                            <div className="flex items-center gap-[10px] pb-[10px]">
                                <AiOutlineExclamationCircle fontSize={17} color='#ff0000' />
                                <p className="text-[#ff0000] text-sm">Dòng này không được trống!</p>
                            </div>
                        ) : ""}
                        <div className='my-1'>
                            <p className="text-bold text-xl text-white">Thời điểm bắt đầu</p>
                            <div>
                                <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} showTimeSelect />
                            </div>
                            <p className="text-bold text-xl text-white my-1">Thời điểm kết thúc</p>
                            <div>
                                <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} showTimeSelect />
                            </div>
                        </div>
                        <textarea placeholder="Bối cảnh" name="story" className="text-white bg-transparent border-white"
                            onChange={(e) => setFormData((prevState) => ({ ...prevState, story: e.target.value }))}
                        />
                        {!formState.story ? (
                            <div className="flex items-center gap-[10px] pt-[10px]">
                                <AiOutlineExclamationCircle fontSize={17} color='#ff0000' />
                                <p className="text-[#ff0000] text-sm">Dòng này không được trống!</p>
                            </div>
                        ) : ""}
                        <p className="text-white pt-[10px]">Chọn địa điểm tổ chức(không bắt buộc)</p>
                        <div className="grid grid-cols-2 gap-[10px]">
                            <select id="states"
                                onChange={(e) => {
                                    setChosenState(e.target.value);
                                    setFormData((prevState) => ({ ...prevState, state: e.target.value }));
                                }}
                                className="mt-[10px] bg-gray-50 border border-white text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option selected disabled>Chọn tỉnh</option>
                                {allStates.map((state, index) => <option key={state.isoCode} value={state.isoCode}>{state.name}</option>)}
                            </select>
                            {chosenState ?
                                <select id="cities"
                                    onChange={(e) => {
                                        setChosenCity(e.target.value);
                                        setFormData((prevState) => ({ ...prevState, city: e.target.value }))
                                    }}
                                    className="mt-[10px] bg-gray-50 border border-white text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option selected>Chọn thành phố</option>
                                    {allCities.map((city, index) => <option key={city.name} value={city.name}>{city.name}</option>)}
                                </select> : ''}
                        </div>
                        <button
                            type="button"
                            onClick={() => {
                                if (!formData.title) setFormState((prevState) => ({ ...prevState, title: false }));
                                if (!formData.story) setFormState((prevState) => ({ ...prevState, story: false }));
                                if (!formData.event) setFormState((prevState) => ({ ...prevState, event: false }));
                                if (formData.title && formData.story && formData.event) {
                                    setImageShow(true);
                                    setFormState((prevState) => ({ ...prevState, title: true }));
                                    setFormState((prevState) => ({ ...prevState, story: true }));
                                    setFormState((prevState) => ({ ...prevState, event: true }));
                                }
                            }}
                            className="text-white mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer mb-[20px] hover:bg-red-600">Tiếp theo</button>
                    </div>
                    {imageShow ? <div className="flex flex-col">
                        <p className="text-white text-bold text-3xl">Chọn ảnh bìa sự kiện</p>
                        <Input type="file" name="image" handleChange={(e) => {
                            setFile(e.target.files[0]);
                        }} accept="" />
                        <p className="text-white">{percent} % hoàn thành</p>
                        <button
                            type="button"
                            onClick={handleUpload}
                            className="text-white mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer mb-[20px] hover:bg-red-600">Tiếp theo</button>
                    </div> : ''}
                </div> : ''}
            <ToastContainer />
        </div>
    )
}
export default CreateEvent;