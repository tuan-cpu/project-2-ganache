import { ethers } from 'ethers';
const { ethereum } = window; 
class AuctionModel{
    async addItem(_itemID, auctionEndTime,auctionContract){
        try{
            if (!ethereum) return alert("Please install Metamask!");
            const txHash = await auctionContract.addItem(_itemID, auctionEndTime);
            console.log(`Loading - ${txHash.hash}`);
            await txHash.wait();
            console.log(`Success - ${txHash.hash}`);
        }catch (error) {
            console.log(error);
        }
    }
    async getAllItems(auctionContract){
        return await auctionContract.getAllItems();
    }
    async bid(_id, amount,auctionContract){
        try {
            if (!ethereum) return alert("Please install Metamask!");
            const parsedAmount = ethers.utils.parseEther(amount);
            const txHash = await auctionContract.bid(_id, {value: parsedAmount});
            console.log(`Loading - ${txHash.hash}`);
            await txHash.wait();
            console.log(`Success - ${txHash.hash}`);
        } catch (error) {
            console.log(error)
        }
    }
}

export default AuctionModel;