class LotteryModel{
    async createCoupon(lotteryContract, uid){
        return await lotteryContract.createCoupon(uid);
    }
}
export default LotteryModel;