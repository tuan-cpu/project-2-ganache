// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.9;

contract Lottery{
    address payable public owner;
    constructor(address payable _owner){
        owner = _owner;
    }
    struct Coupon {
        uint8 pool_id;
        uint8 group;
        string uid;
    }
    struct Pool {
        uint id;
        uint256[] rates;
        uint256[] items;
        uint256 entry_value;
    }
    uint256 public poolCount;
    Coupon[] private  couponList;
    uint256[] private  rates;
    uint256[] private  items;
    Pool[] private pools;
    function clearPool() private {
        delete rates;
    }
    function addPrize(uint256[] memory input_proportions, uint256[] memory input_items, uint256 entry_value) public {
        require(msg.sender == owner, 'Unauthorized!');
        clearPool();
        for (uint8 i = 0; i < input_proportions.length; i++){
            rates.push(input_proportions[i]);
            items.push(input_items[i]);
        }
        pools.push(Pool(poolCount,rates, items, entry_value));
        poolCount++;
    }
    function getPools() public view returns (Pool[] memory){
        return pools;
    }
    function getCouponList() public  view returns (Coupon[] memory){
        return couponList;
    }
    function createCoupon(string memory uid, uint8 pool_id) public payable  {
        require(msg.value >= pools[pool_id].entry_value, "Insufficient entry fee");
        payable(owner).transfer(msg.value);
        uint8 group = selectGroup();
        couponList.push(Coupon(pool_id,group,uid));
    }
    function selectGroup() private view returns (uint8) {
        uint256 randomValue = uint256(keccak256(abi.encodePacked(block.timestamp, block.difficulty, msg.sender))) % 100;
        uint256 cumulativeRate = 0;
        for (uint8 i = 0; i < rates.length; i++) {
            cumulativeRate += rates[i];

            if (randomValue < cumulativeRate) {
                return i;
            }
        }
        // Default to the last group if no match is found
        return uint8(rates.length - 1);
    }
}