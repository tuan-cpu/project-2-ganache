import { useState, useEffect } from "react";
import { allStates } from "../utils/state";
import { City } from 'country-state-city';
import { storage, db } from "../utils/firebase.js";
import { ref, uploadBytesResumable } from "firebase/storage";
import { doc, collection, setDoc } from "firebase/firestore";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { ToastContainer, toast } from 'react-toastify';
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
const categories = ["Animals and pets", "Art and culture", "Education", "International aid", "Disability", "Local community", "Sports", "Health and medical"]
const CreateEvent = () => {
    const [userInfoShow, setUserInfoShow] = useState(true);
    const [eventInfoShow, setEventInfoShow] = useState(false);
    const [categoryInfoShow, setCategoryInfoShow] = useState(false);
    const [chosenState, setChosenState] = useState();
    const [allCities, setAllCities] = useState();
    const [chosenCity, setChosenCity] = useState();
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
        amount:0,
        supporters:[],
    });
    const [formState, setFormState] = useState({
        name: true,
        wallet: true,
        category: true,
        title: true,
        story: true,
        event: true,
        state: true,
        city: true,
        image: true
    });
    useEffect(() => {
        setAllCities(City.getCitiesOfState("VN", chosenState));
    }, [chosenState]);

    const handleChange = (e, name) => {
        setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
    }
    const [imageShow, setImageShow] = useState(false);
    const [submitShow,setSubmitShow] = useState(false);
    const [percent, setPercent] = useState(0);
    const [file, setFile] = useState("");
    const handleUpload = () => {
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
            ()=>submit(formData)
        );   
    }
    const submit = async (data) => {
        const ref = doc(collection(db, 'users events'));
        await setDoc(ref, data);
        toast.success("Submission complete!");
    }
    return (
        <div className="gradient-bg-transactions grid md:grid-cols-2 grid-cols-1 p-5 gap-[10px] min-h-screen">
            {userInfoShow ?
                <div className="flex flex-col">
                    <div className="flex flex-col">
                        <p className="text-bold text-3xl text-white">User Info</p>
                        <Input placeholder='Name' name='name' type='text' handleChange={handleChange} />
                        {!formState.name ? (
                            <div className="flex items-center gap-[10px]">
                                <AiOutlineExclamationCircle fontSize={17} color='#ff0000' />
                                <p className="text-[#ff0000] text-sm">This field must not be blank!</p>
                            </div>
                        ) : ""}
                        <Input placeholder='Wallet Address' name='wallet' type='text' handleChange={handleChange} />
                        {!formState.wallet ? (
                            <div className="flex items-center gap-[10px]">
                                <AiOutlineExclamationCircle fontSize={17} color='#ff0000' />
                                <p className="text-[#ff0000] text-sm">This field must not be blank!</p>
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
                            Next</button>
                    </div>
                    {categoryInfoShow ?
                        <div className="flex flex-col">
                            <p className="text-bold text-3xl text-white">Choose a category</p>
                            <select id="category"
                                onChange={(e) => setFormData((prevState) => ({ ...prevState, tag: e.target.value }))}
                                className="mt-[10px] bg-gray-50 border border-white text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option selected>Choose a category</option>
                                {categories.map((cat, index) => <option key={cat} value={cat}>{cat}</option>)}
                            </select>
                            {!formState.category ? (
                                <div className="flex items-center gap-[10px]">
                                    <AiOutlineExclamationCircle fontSize={17} color='#ff0000' />
                                    <p className="text-[#ff0000] text-sm">Must choose a category!</p>
                                </div>
                            ) : ""}
                            <button
                                type="button"
                                onClick={() => {
                                    if (!formData.category) setFormState((prevState) => ({ ...prevState, category: false }));
                                    else {
                                        setEventInfoShow(true);
                                        setFormState((prevState) => ({ ...prevState, category: true }));
                                    }
                                }}
                                className="text-white mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer mb-[20px] hover:bg-red-600">
                                Next
                            </button>
                        </div> : ''}
                </div> : ''}
            {eventInfoShow ?
                <div className="flex flex-col">
                    <div className="flex flex-col">
                        <p className="text-white text-bold text-3xl">Event Info</p>
                        <Input placeholder='Title' name='title' type='text' handleChange={handleChange} />
                        {!formState.title ? (
                            <div className="flex items-center gap-[10px]">
                                <AiOutlineExclamationCircle fontSize={17} color='#ff0000' />
                                <p className="text-[#ff0000] text-sm">This field must not be blank!</p>
                            </div>
                        ) : ""}
                        <Input placeholder='Event' name='event' type='text' handleChange={handleChange} />
                        {!formState.event ? (
                            <div className="flex items-center gap-[10px]">
                                <AiOutlineExclamationCircle fontSize={17} color='#ff0000' />
                                <p className="text-[#ff0000] text-sm">This field must not be blank!</p>
                            </div>
                        ) : ""}
                        <textarea placeholder="Story" name="story" className="text-white bg-transparent border-white"
                            onChange={(e) => setFormData((prevState) => ({ ...prevState, story: e.target.value }))}
                        />
                        {!formState.story ? (
                            <div className="flex items-center gap-[10px]">
                                <AiOutlineExclamationCircle fontSize={17} color='#ff0000' />
                                <p className="text-[#ff0000] text-sm">This field must not be blank!</p>
                            </div>
                        ) : ""}
                        <p className="text-white pt-[10px]">Choose event location(not mandatory)</p>
                        <div className="grid grid-cols-2 gap-[10px]">
                            <select id="states"
                                onChange={(e) => {
                                    setChosenState(e.target.value);
                                    setFormData((prevState) => ({ ...prevState, state: e.target.value }));
                                }}
                                className="mt-[10px] bg-gray-50 border border-white text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option selected>Choose a State</option>
                                {allStates.map((state, index) => <option key={state.isoCode} value={state.isoCode}>{state.name}</option>)}
                            </select>
                            {chosenState ?
                                <select id="cities"
                                    onChange={(e) => {
                                        setChosenCity(e.target.value);
                                        setFormData((prevState) => ({ ...prevState, city: e.target.value }))
                                    }}
                                    className="mt-[10px] bg-gray-50 border border-white text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option selected>Choose a City</option>
                                    {allCities.map((city, index) => <option key={city.name} value={city.name}>{city.name}</option>)}
                                </select> : ''}
                        </div>
                        <button
                            type="button"
                            onClick={() => {
                                if (!formData.title) setFormState((prevState) => ({ ...prevState, title: false }));
                                if (!formData.story) setFormState((prevState) => ({ ...prevState, story: false }));
                                if (!formData.event) setFormState((prevState) => ({ ...prevState, event: false }));
                                if(formData.title && formData.story && formData.event){
                                    setImageShow(true);
                                    setFormState((prevState) => ({ ...prevState, title: true }));
                                    setFormState((prevState) => ({ ...prevState, story: true }));
                                    setFormState((prevState) => ({ ...prevState, event: true }));
                                }
                            }}
                            className="text-white mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer mb-[20px] hover:bg-red-600">Next</button>
                    </div>
                    {imageShow ? <div className="flex flex-col">
                        <p className="text-white text-bold text-3xl">Choose a cover image</p>
                        <Input type="file" name="image" handleChange={(e) => {
                            setFile(e.target.files[0]);
                            setFormData((prevState) => ({ ...prevState, image: e.target.files[0].name }));
                        }} accept="" />
                        <p className="text-white">{percent} % done</p>
                        <button
                            type="button"
                            onClick={handleUpload}
                            className="text-white mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer mb-[20px] hover:bg-red-600">Next</button>
                    </div> : ''}
                </div> : ''}
                <ToastContainer/>
        </div>
    )
}
export default CreateEvent;