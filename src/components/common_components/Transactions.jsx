import React, { useEffect } from "react";
import { useTransactionContext } from "../../controller/TransactionProvider";
import { shortenAddress } from "../../common/utils/shortenAddress";

const TransactionCard = ({ addressFrom, timestamp, amount }) => {
    return (
        <div className="bg-[#181918] m-4 flex flex-1 
        flex-col p-3 rounded-md hover:shadow-2xl">
            <div className="flex flex-col items-center w-full mt-3">
                <div className="w-full mb-6 p-2">
                    <p className="text-white text-base">Từ: {shortenAddress(addressFrom)}</p>
                    <p className="text-white text-base">Số lượng: {amount} ETH</p>
                </div>
                <div className="bg-black p-3 px-5 w-max rounded-3xl -mt-5 shadow-2xl">
                    <p className="text-[#37c7da] font-bold">{timestamp}</p>
                </div>
            </div>
        </div>
    )
}

const Transactions = ({ message, from }) => {
    const { currentAccount, transactions } = useTransactionContext();
    return (
        <div className="flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions">
            <div className="flex flex-col py-12 px-4">
                {currentAccount ? (
                    <h3 className="text-white text-3xl text-center my-2">
                        Các giao dịch mới nhất
                    </h3>
                ) : (
                    <h3 className="text-white text-3xl text-center my-2">
                        Kết nối tài khoản của bạn
                    </h3>
                )}
                <div className="flex flex-wrap justify-center items-center mt-10">
                    {transactions.reverse().map((transaction, index) => {
                        if (transaction.message === message || transaction.addressFrom === from)
                            return (<TransactionCard key={index} {...transaction} />)
                    })}
                </div>
            </div>
        </div>
    )
}

export default Transactions;