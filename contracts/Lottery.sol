// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.9;

contract Lottery{
    struct Coupon {
        uint8 group;
        // Add more properties as needed
    }

    Coupon[] public couponList;

    function createCoupon() public {
        uint256[] memory rates = new uint256[](7);
        rates[0] = 53;
        rates[1] = 20;
        rates[2] = 12;
        rates[3] = 8;
        rates[4] = 4;
        rates[5] = 2;
        rates[6] = 1;

        uint8 group = selectGroup(rates);
        couponList.push(Coupon(group));
    }

    function selectGroup(uint256[] memory rates) private view returns (uint8) {
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