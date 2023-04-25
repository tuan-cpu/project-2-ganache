// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Voting {
    struct Candidate {
        string name;
        uint256 voteCount;
    }

    struct VotingEvent {
        string name;
        uint256 votingStart;
        uint256 votingEnd;
        address owner;
        uint id;
    }

    struct EventsAndCandidate {
        Candidate[] candidates;
        uint _eventIndex;
    }

    struct EventsAndVoters {
        address voter_address;
        uint[] _eventIndex;
    }
    mapping(address => EventsAndVoters) voters;
    EventsAndCandidate[] public eventAndCandidate;

    uint256 eventCount;

    VotingEvent[] public votingEvents;
    address owner;

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    function addEvent(
        string memory _name,
        uint256 votingStart,
        uint256 votingEnd
    ) public onlyOwner {
        eventCount += 1;
        votingEvents.push(
            VotingEvent({
                name: _name,
                votingStart: votingStart,
                votingEnd: votingEnd,
                owner: msg.sender,
                id: eventCount
            })
        );
    }

    function addCandidateToEvent(
        string memory _name,
        uint _eventIndex
    ) public onlyOwner {
        require(_eventIndex < eventAndCandidate.length, "Invalid event index");
        eventAndCandidate[_eventIndex].candidates.push(
            Candidate({name: _name, voteCount: 0})
        );
    }

    function vote(uint256 _candidateIndex, uint _eventIndex) public {
        require(_eventIndex < eventAndCandidate.length, "Invalid event index");
        require(
            _candidateIndex < eventAndCandidate[_eventIndex].candidates.length,
            "Invalid candidate index"
        );
        require(
            voters[msg.sender]._eventIndex.length == 0 ||
                !contains(voters[msg.sender]._eventIndex, _eventIndex),
            "Voter has already voted in this event"
        );

        eventAndCandidate[_eventIndex].candidates[_candidateIndex].voteCount++;
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

    function getAllVotesOfCandiatesOfEvent(
        uint256 _eventIndex
    ) public view returns (Candidate[] memory) {
        return eventAndCandidate[_eventIndex].candidates;
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
