import {INITIAL_STATE, setEntries, next, vote} from "./core";

/**
 * Core reducer
 * @param {Immutable.Map}   state
 * @param {Object}          [action]
 */
export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "SET_ENTRIES":
      return setEntries(state, action.entries);
    case "NEXT":
      return next(state);
    case "VOTE":
      return state.update("vote", function(voteState){
        return vote(voteState, action.entry);
      });
  }

  return state;
}
