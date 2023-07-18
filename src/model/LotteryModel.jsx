class LotteryModel{
    async createCoupon(lotteryContract, uid, pool_id){
        return await lotteryContract.createCoupon(uid, pool_id);
    }
    async addPrize(lotteryContract, input_proportions, input_items, entry_value){
        await lotteryContract.addPrize(input_proportions, input_items, entry_value);
    }
    async getPools(lotteryContract){
        return await lotteryContract.getPools();
    }
    async getCouponList(lotteryContract){
        return await lotteryContract.getCouponList();
    }
}
export default LotteryModel;