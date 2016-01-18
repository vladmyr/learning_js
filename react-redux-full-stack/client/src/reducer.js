import {Map} from "immutable";

/**
 * Set state action handler
 * @param   {Immutable.Map|Object}  state
 * @param   {Immutable.Map|Object}  newState
 * @returns {Immutable.Map}
 */
function setState(state, newState){
    return state.merge(newState);
}

export default function(state = Map(), action){
    switch(action.type){
        case "SET_STATE":
            return setState(state, action.state);
    }

    return state;
}