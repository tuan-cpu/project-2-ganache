import { ethers } from "ethers";
const { ethereum } = window;
class LotteryModel{
    async createCoupon(lotteryContract, uid, pool_id, amount){
        try {
            if (!ethereum) return alert("Please install Metamask!");
            const parsedAmount = ethers.utils.parseEther(amount.toString());
            await lotteryContract.createCoupon(uid,pool_id, {value: parsedAmount});
        } catch (error) {
            console.log(error)
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