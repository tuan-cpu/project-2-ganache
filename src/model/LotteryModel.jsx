import { ethers } from "ethers";
const { ethereum } = window;
class LotteryModel{
    async createCoupon(lotteryContract, user_id, pool_index, amount){
        try {
            if (!ethereum) return alert("Please install Metamask!");
            const parsedAmount = ethers.utils.parseEther(amount.toString());
            const transaction = await lotteryContract.createCoupon(user_id,pool_index, {value: parsedAmount});
            const receipt = await transaction.wait();
            const coupon = receipt.events[0].args;
            return coupon;
        } catch (error) {
            alert('Error:', error);
            alert('Thử lại sau');
        }
    }
    async addPrize(lotteryContract, input_proportions, input_items, entry_value){
        await lotteryContract.addPrize(input_proportions, input_items, entry_value);
    }
    async getPools(lotteryContract){
        const result = await lotteryContract.getPools();
        return result;
    }
    async getCouponList(lotteryContract){
        return await lotteryContract.getCouponList();
    }
}
export default LotteryModel;