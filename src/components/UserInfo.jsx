import { useContext } from "react";
import { TransactionContext } from "../context/TransactionContext";
import Transactions from "./Transactions";
import 'tw-elements';
const UserInfo = () => {
    const { transactions, user } = useContext(TransactionContext);
    return (
        <div className="gradient-bg-transactions md:p-20 py-12 px-4">
            <h1 className="text-xl sm:text-3xl text-white text-gradient py-1">Thông tin người dùng</h1>
            <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">Tên người dùng: {user.displayName}</p>
            <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">Email: {user.email}</p>
            <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">Loại tài khoản: {user.provider}</p>
            <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">Lịch sử quyên góp:</p>
            <ul>
                {user.donation_detail.map((item, index) => {
                    return (
                        <div key={index}>
                            <p className="md:space-x-1 space-y-1 md:space-y-0 mb-4">
                            <button className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out" 
                            type="button" 
                            data-bs-toggle="collapse" 
                            data-bs-target={`#multiCollapse${index}`} 
                            aria-expanded="false" 
                            aria-controls={`multiCollapse${index}`}>{item.event_id}</button>
                            </p>
                            <div className="collapse multi-collapse pb-2.5" id={`multiCollapse${index}`}>
                                <div className="block p-6 rounded-lg shadow-lg bg-white">
                                    <p>Amount: {item.amount} ETH</p>
                                    <p>Donated time: {Date(item.timestamp.toDate().getTime())}</p>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </ul>
        </div>
    )
}

export default UserInfo;