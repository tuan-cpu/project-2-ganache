// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
contract Auction{
    address payable public beneficiary;
    uint itemCount = 0;
    struct Item {
        uint id;
        uint highestBid;
        address highestBidder;
        uint auctionEndTime;
        bool ended;
    }
    Item[] items;

    event highestBidIncrease(address bidder, uint amount);
    event auctionEnded(address winner, uint amount);

    constructor(address payable _beneficiary){
        beneficiary = _beneficiary;
    }


    function addItem(uint id, uint auctionEndTime) public {
        items.push(Item(id,0,msg.sender,block.timestamp + auctionEndTime, false));
    }
    function getAllItems() public view returns (Item[] memory){
        return items;
    }

    function getItem(uint _id) public view returns (Item memory){
        return items[_id];
    }
    function bid(uint _id) public payable{
        require(block.timestamp < items[_id].auctionEndTime, "Auction has been ended!");
        require(msg.value > items[_id].highestBid, "Invalid bid!");
        if(items[_id].highestBid != 0){
            payable(items[_id].highestBidder).transfer(items[_id].highestBid);
        }
        items[_id].highestBidder = msg.sender;
        items[_id].highestBid = msg.value;
        emit highestBidIncrease(msg.sender, msg.value);
    }
    
    function auctionEnd(uint _id) public {
        require(!items[_id].ended && block.timestamp < items[_id].auctionEndTime, 'Auction has been ended!');
        items[_id].ended = true;
        emit auctionEnded(items[_id].highestBidder,items[_id].highestBid);
        beneficiary.transfer(items[_id].highestBid);
    }
 }