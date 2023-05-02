// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.9;

contract Transactions {

    //Transaction
    uint256 transactionCount;

    event Transfer(address from, address receiver, uint amount, string message, uint256 timestamp, string keyword);
  
    struct TransferStruct {
        address sender;
        address receiver;
        uint amount;
        string message;
        uint256 timestamp;
        string keyword;
    }

    TransferStruct[] transactions;

    function addToBlockchain(address payable receiver, uint amount, string memory message,string memory keyword) public {
        transactionCount += 1;
        transactions.push(TransferStruct(msg.sender, receiver, amount, message, block.timestamp, keyword));

        emit Transfer(msg.sender, receiver, amount, message, block.timestamp, keyword);
    }

    function getAllTransactions() public view returns (TransferStruct[] memory) {
        return transactions;
    }

    function getTransactionCount() public view returns (uint256) {
        return transactionCount;
    }


    //Voting
    struct Candidate {
        string name;
        string _userIndex;
        uint256 voteCount;
        uint _eventIndex;
    }

    struct VotingEvent {
        string name;
        uint256 votingStart;
        uint256 votingEnd;
        address owner;
        uint id;
    }
    struct VoterAndEvents {
        address voter_address;
        uint[] _eventIndex;
    }
    mapping(address => VoterAndEvents) voters;
    Candidate[] candidates;
    uint256 eventCount;
    VotingEvent[] public votingEvents;

    function addEvent(
        string memory _name,
        uint256 _durationInMinutes
    ) public {
        eventCount += 1;
        votingEvents.push(
            VotingEvent({
                name: _name,
                votingStart: block.timestamp,
                votingEnd: block.timestamp + (_durationInMinutes * 1 minutes),
                owner: msg.sender,
                id: eventCount
            })
        );
    }

    function addCandidate(
        string memory _candidateName,
        string memory _userIndex,
        uint _eventIndex
    ) public {
        candidates.push(Candidate(_candidateName,_userIndex,0,_eventIndex));
    }

    function vote(uint256 _candidateIndex, uint _eventIndex) public {
        require(_eventIndex < votingEvents.length, "Invalid event index");
        require(
            voters[msg.sender]._eventIndex.length == 0 ||
                !contains(voters[msg.sender]._eventIndex, _eventIndex),
            "Voter has already voted in this event"
        );

        candidates[_candidateIndex].voteCount++;
        voters[msg.sender]._eventIndex.push(_eventIndex);
    }

    function contains(
        uint[] memory arr,
        uint element
    ) private pure returns (bool) {
        for (uint i = 0; i < arr.length; i++) {
            if (arr[i] == element) {
                return true;
            }
        }
        return false;
    }

    function getAllEvents () public view returns (VotingEvent[] memory){
        return votingEvents;
    }

    function getAllCandidates() public view returns (Candidate[] memory) {
        return candidates;
    }

    function getVotingStatusOfEvent(
        uint256 _eventIndex
    ) public view returns (bool) {
        return (block.timestamp >= votingEvents[_eventIndex].votingStart &&
            block.timestamp < votingEvents[_eventIndex].votingEnd);
    }

    function getRemainingTimeOfEvent(
        uint256 _eventIndex
    ) public view returns (uint256) {
        require(
            block.timestamp >= votingEvents[_eventIndex].votingStart,
            "Voting has not started yet."
        );
        if (block.timestamp >= votingEvents[_eventIndex].votingEnd) {
            return 0;
        }
        return votingEvents[_eventIndex].votingEnd - block.timestamp;
    }
}