const { ethereum } = window;
class VotingModel {
    async getRemainingTimeOfEvent(id, votingContract) {
        return await votingContract.getRemainingTimeOfEvent(id);
    }
    async getVotingStatusOfEvent(id, votingContract) {
        return await votingContract.getVotingStatusOfEvent(id);
    }
    async getAllVotingEvents(votingContract) {
        const availableVotingEvents = await votingContract.getAllEvents();
        const availableCandidates = await votingContract.getAllCandidates();
        const structuredCandidates = availableCandidates.map((candidate, index) => (
            {
                name: candidate.name,
                _userIndex: candidate._userIndex,
                _eventIndex: candidate._eventIndex,
                voteCount: candidate.voteCount,
                _candidateIndex: index
            }
        ))
        const structuredEvents = availableVotingEvents.map((event, index) => {
            let candidates = [];
            for (const element of structuredCandidates) {
                if (parseInt(element._eventIndex, 16) === parseInt(event.id, 16)) candidates.push(element);
            }
            return (
                {
                    name: event.name,
                    votingStart: event.votingStart,
                    votingEnd: event.votingEnd,
                    id: index,
                    candidates: candidates
                }
            )
        })
        return structuredEvents;
    }
    async vote(_candidateIndex, _eventIndex, votingContract) {
        if (!ethereum) return alert("Please install Metamask!");
        const txHash = await votingContract.vote(_candidateIndex, _eventIndex);
        console.log(`Loading - ${txHash.hash}`);
        await txHash.wait();
        console.log(`Success - ${txHash.hash}`);
    }

    async addVotingEvent(_name, duration, votingContract) {
        if (!ethereum) return alert("Please install Metamask!");
        const txHash = await votingContract.addEvent(_name, duration);
        console.log(`Loading - ${txHash.hash}`);
        await txHash.wait();
        console.log(`Success - ${txHash.hash}`);
    }
    async addCandidate(_name, _userIndex, _eventIndex, votingContract) {
        if (!ethereum) return alert("Please install Metamask!");
        const txHash = await votingContract.addCandidate(_name, _userIndex, _eventIndex);
        console.log(`Loading - ${txHash.hash}`);
        await txHash.wait();
        console.log(`Success - ${txHash.hash}`);
    }
}

export default VotingModel;