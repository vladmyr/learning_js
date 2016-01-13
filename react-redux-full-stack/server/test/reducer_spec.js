import {Map, fromJS} from "immutable"; // fromJS is required by Redux - to work with plain objects
import {expect} from "chai";

import reducer from "../src/reducer";

describe("reducer", function(){
    it("handles SET_ENTRIES", function(){
        const initialState = Map();
        const action = {
            type: "SET_ENTRIES",
            entries: ["Trainspotting"]
        };
        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(fromJS({
            entries: ["Trainspotting"]
        }));
    });

    it("handler NEXT", function(){
        const initialState = fromJS({
            entries: ["Trainspotting", "28 Days Later"]
        });
        const action = {
            type: "NEXT"
        };
        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(fromJS({
            vote: {
                pair: ["Trainspotting", "28 Days Later"]
            },
            entries: []
        }));
    });

    it("handler VOTE", function(){
        const initialState = fromJS({
            vote: {
                pair: ["Trainspotting", "28 Days Later"]
            },
            entries: []
        });
        const action = {
            type: "VOTE",
            entry: "Trainspotting"
        };
        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(fromJS({
            vote: {
                pair: ["Trainspotting", "28 Days Later"],
                tally: {
                    "Trainspotting": 1
                }
            },
            entries: []
        }));
    });

    it("has an initial state", function(){
        const action = {
            type: "SET_ENTRIES",
            entries: ["Trainspotting"]
        };
        const nextState = reducer(undefined, action);

        expect(nextState).to.equal(fromJS({
            entries: ["Trainspotting"]
        }));
    });

    it("can be used with reduce", function(){
        const actions = [
            { type: "SET_ENTRIES", entries: ["Trainspotting", "28 Days Later"] },
            { type: "NEXT" },
            { type: "VOTE", entry: "Trainspotting" },
            { type: "VOTE", entry: "28 Days Later" },
            { type: "VOTE", entry: "Trainspotting" },
            { type: "NEXT", entries: [] }
        ];
        const finalState = actions.reduce(reducer, Map());

        expect(finalState).to.equal(fromJS({
            winner: "Trainspotting"
        }));
    });
});