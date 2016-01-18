import {List, Map} from "immutable";

/**
 * Set state action handler
 * @param   {Immutable.Map|Object}  state
 * @param   {Immutable.Map|Object}  newState
 * @returns {Immutable.Map}
 */
function setState(state, newState){
    return state.merge(newState);
}

/**
 * Vote for the entry
 * @param   {Immutable.Map} state
 * @param   {String}        entry
 * @returns {Immutable.Map}
 */
function vote(state, entry){
    const currentPair = state.getIn(["vote", "pair"]);

    if(currentPair && currentPair.includes(entry)){
        return state.set("hasVoted", entry);
    } else {
        return state;
    }
}

function resetVote(state){
    const hasVoted = state.get("hasVoted");
    // creates an instance of Immutable.List
    // from items returned form the Immutable.Map instance
    const currentPair = state.getIn(["vote", "pair"], List());

    if(hasVoted && !currentPair.includes(hasVoted)){
        return state.remove("hasVoted");
    } else {
        return state;
    }
}

export default function(state = Map(), action){
    switch(action.type){
        case "SET_STATE":
            return resetVote(setState(state, action.state));
        case "VOTE":
            return vote(state, action.entry);
    }

    return state;
}