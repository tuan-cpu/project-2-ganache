import React, { useState, useEffect } from 'react';
import { Header, Button } from '..';
import tags from '../../common/utils/tags';
import { allStates } from '../../common/utils/state';
import { City } from 'country-state-city';
import { useStateContext } from '../../controller/ContextProvider';
import { storage, db } from '../../common/utils/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, collection, setDoc } from "firebase/firestore";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Input = ({ placeholder, name, type, value, handleChange }) => (
  <input
    placeholder={placeholder}
    type={type}
    name={name}
    onChange={(e) => handleChange(e, name)}
    value={value}
    className="my-2 w-full rounded-sm p-2 outline-none bg-transparent dark:text-white dark:border-white text-sm white-glassmorphism"
    required
  />
)

const AdminCreateEventForm = () => {
  const { currentColor } = useStateContext();
  const [chosenState, setChosenState] = useState();
  const [allCities, setAllCities] = useState();
  const [chosenCity, setChosenCity] = useState();
  const [file, setFile] = useState();
  const [percent, setPercent] = useState(0);
  const [confirm, setConfirm] = useState(false);
  const [eventType, setEventType] = useState();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [formData, setFormData] = useState({
    name: "Admin",
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
    end: ""
  });
  const handleChange = (e, name) => {
    setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
  }
  const handleUpload = () => {
    if (eventType === 'limited') {
      setFormData((prevState) => ({ ...prevState, start: startDate, end: endDate }));
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
    setAllCities(City.getCitiesOfState("VN", chosenState));
  }, [chosenState]);
  useEffect(() => {
    if (confirm) {
      submit(formData);
      toast.success("Submission complete!");
    }
  }, [confirm]);
  const submit = async (data) => {
    const ref = doc(collection(db, `events/${eventType}/database`));
    await setDoc(ref, data);
  }
  return (
    <div>
      <Header category="Form" title='Create event' />
      <div className='flex flex-col'>
        <Input placeholder='Tên quỹ' name='title' type='text' handleChange={handleChange} />
        <select id="type"
          onChange={(e) => setEventType(e.target.value)}
          className="mt-[10px] bg-gray-50 border dark:border-white text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <option selected disabled>Loại quỹ</option>
          <option key='lifetime' value='lifetime'>Vĩnh viễn</option>
          <option key='limited' value='limited'>Khẩn cấp (giới hạn thời gian)</option>
        </select>
        {eventType === 'limited' ? (
          <div className='my-1'>
            <p className="text-bold text-xl dark:text-white">Thời điểm bắt đầu</p>
            <div className='grid grid-cols-2 my-1'>
              <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} showTimeSelect />
            </div>
            <p className="text-bold text-xl dark:text-white my-1">Thời điểm kết thúc</p>
            <div className='grid grid-cols-2'>
              <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} showTimeSelect />
            </div>
          </div>
        ) : ''}
        <Input placeholder='Sự kiện chính' name='event' type='text' handleChange={handleChange} />
        <textarea placeholder="Bối cảnh" name="story" className="dark:text-white bg-transparent dark:border-white"
          onChange={(e) => setFormData((prevState) => ({ ...prevState, story: e.target.value }))}
        />
        <Input placeholder='Địa chỉ ví' name='wallet' type='text' handleChange={handleChange} />
        <p className="text-bold text-xl dark:text-white">Chọn 1 nhãn phân loại</p>
        <select id="category"
          onChange={(e) => setFormData((prevState) => ({ ...prevState, tag: e.target.value }))}
          className="mt-[10px] bg-gray-50 border dark:border-white text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <option selected disabled>Chọn 1 nhãn</option>
          {tags.map((tag) => tag.id !== 1 && <option key={tag.id} value={tag.name}>{tag.name}</option>)}
        </select>
        <p className="dark:text-white text-xl pt-[10px]">Chọn địa điểm tổ chức(không bắt buộc)</p>
        <div className="grid grid-cols-2 gap-[10px]">
          <select id="states"
            onChange={(e) => {
              setChosenState(e.target.value);
              let state = allStates.find(item => item.isoCode === e.target.value);
              console.log(state.name);
              setFormData((prevState) => ({ ...prevState, state: state.name }));
            }}
            className="mt-[10px] bg-gray-50 border dark:border-white text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option selected disabled>Chọn tỉnh</option>
            {allStates.map((state, index) => <option key={index} value={state.isoCode}>{state.name}</option>)}
          </select>
          {chosenState ?
            <select id="cities"
              onChange={(e) => {
                setChosenCity(e.target.value);
                setFormData((prevState) => ({ ...prevState, state: e.target.value }));
              }}
              className="mt-[10px] bg-gray-50 border dark:border-white text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option selected>Chọn thành phố</option>
              {allCities && allCities.map((city, index) => <option key={index} value={city.name}>{city.name}</option>)}
            </select> : ''}
        </div>
        <div className="flex flex-col">
          <p className="dark:text-white text-bold text-xl">Chọn ảnh bìa sự kiện</p>
          <Input type="file" name="image" handleChange={(e) => {
            setFile(e.target.files[0]);
          }} accept="" />
          <p className="dark:text-white">{percent} % hoàn thành</p>
          <div className='mt-6'>
            <Button color='white' bgColor={currentColor} text='Hoàn thành' borderRadius='10px' size='md' customFunction={handleUpload} />
          </div>
        </div>
      </div>
      <ToastContainer/>
    </div>
  )
}

export default AdminCreateEventForm