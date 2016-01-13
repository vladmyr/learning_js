import {List, Map} from "immutable";
import {expect} from "chai";

import {setEntries, next, vote} from "../src/core";

//let EntryNames = {
//    Trainspotting: "Trainspotting",
//    TwEiDaysLater: "28 Days Later",
//    Sunshine: "Sunshine"
//};

describe("application logic", function(){
    // action "set entries"
    describe("setEntries", function(){
        // set entries from Immutable.List
        it("adds the entries to the state", function(){
            const state = Map();
            const entries = List.of("Trainspotting", "28 Days Later");
            const nextState = setEntries(state, entries);

            expect(nextState).to.equal(Map({
                entries: List.of("Trainspotting", "28 Days Later")
            }));
        });

        // set entries from regular Array
        it("converts to immutable", function(){
            const state = Map();
            const entries = ["Trainspotting", "28 Days Later"];
            const nextState = setEntries(state, entries);

            expect(nextState).to.equal(Map({
                entries: List.of("Trainspotting", "28 Days Later")
            }));
        });
    });

    // action "next"
    describe("next", function(){
        // tree state - pick first two entries from the list
        it("takes the next two entries under vote", function(){
            const state = Map({
                entries: List.of("Trainspotting", "28 Days Later", "Sunshine")
            });
            const nextState = next(state);

            expect(nextState).to.equal(Map({
                vote: Map({
                    pair: List.of("Trainspotting", "28 Days Later")
                }),
                entries: List.of("Sunshine")
            }));
        });
    });

    // action "vote"
    describe("vote", function(){
        // tree state - create tally
        it("creates a tally for the voted entry", function(){
            const state = Map({
                vote: Map({
                    pair: List.of("Trainspotting", "28 Days Later")
                }),
                entries: List()
            });
            const nextState = vote(state, "Trainspotting");

            expect(nextState).to.equal(Map({
                vote: Map({
                    pair: List.of("Trainspotting", "28 Days Later"),
                    tally: Map({
                        "Trainspotting": 1
                    })
                }),
                entries: List()
            }));
        });

        // tree state - add tally for voting state
        it("adds to existing tally for the voted entry", function(){
            const state = Map({
                vote: Map({
                    pair: List.of("Trainspotting", "28 Days Later"),
                    tally: Map({
                        "Trainspotting": 3,
                        "28 Days Later": 2
                    })
                }),
                entries: List()
            });
            const nextState = vote(state, "Trainspotting");

            expect(nextState).to.equal(Map({
                vote: Map({
                    pair: List.of("Trainspotting", "28 Days Later"),
                    tally: Map({
                        "Trainspotting": 4,
                        "28 Days Later": 2
                    })
                }),
                entries: List()
            }));
        });
    });

    // tree state - moving to the next pair
});