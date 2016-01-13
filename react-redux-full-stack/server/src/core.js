import {List, Map} from "immutable";

/**
 * Inner function. Get the winner of the vote or return both entries in case votes are equal
 * @param   {Immutable.Map} vote
 * @returns {Array<String>}
 */
let getWinners = function(vote){
    if (!vote) {
        return [];
    }

    const [a,b] = vote.get("pair");
    const aVotes = vote.getIn(["tally", a], 0);
    const bVotes = vote.getIn(["tally", b], 0);

    if (aVotes > bVotes) {
        return [a]
    } else if(aVotes < bVotes) {
        return [b]
    } else {
        return [a, b];
    }
};

/** Initial state */
export const INITIAL_STATE = Map();

/**
 * Set entries
 * @param   {Immutable.Map}   state
 * @param   {Immutable.List<String>|Array<String>}  entries
 * @returns {Map}
 */
export function setEntries(state, entries){
    return state.set("entries", List(entries));
}

/**
 * Go to next state
 * @param {Immutable.Map} state
 */
export function next(state){
    const entries = state
        .get("entries")
        .concat(getWinners(state.get("vote")));

    if(entries.size === 1) {
        // Morphing old state is preferred among creating new Immutable.Map instance
        // as there might be some not related stuff at some given point of time
        return state
            .remove("vote")
            .remove("entries")
            .set("winner", entries.first());
    } else {
        return state.merge({
            vote: Map({
                pair: entries.take(2)
            }),
            entries: entries.skip(2)
        });
    }
}

/**
 * Do vote
 * @param   {Immutable.Map} state
 * @param   {String}        entry
 * @returns {Immutable.Map}
 */
export function vote(state, entry){
    return state.updateIn(
        ["vote", "tally", entry],
        0,
        function(tally){
            return ++tally;
        }
    );
}