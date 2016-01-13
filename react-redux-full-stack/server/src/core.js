import {List, Map} from "immutable";

/**
 * Set entries
 * @param   {Immutable.Map}   state
 * @param   {Immutable.List|Array}  entries
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
    const entries = state.get("entries");

    return state.merge({
        vote: Map({
            pair: entries.take(2)
        }),
        entries: entries.skip(2)
    });
}

export function vote(state, entry){
    return state.updateIn(
        ["vote", "tally", entry],
        0,
        function(tally){
            return ++tally;
        }
    );
}