import {expect} from "chai";
import {List, Map} from "immutable";

describe("immutability", function(){
  // number test
  describe("number", function(){
    let increment = function(currentState){
      return currentState + 1;
    };

    it("is immutable", function(){
      let state = 42;
      let nextState = increment(state);

      expect(nextState).to.equal(43);
      expect(state).to.equal(42);
    });
  });

  // immutable list test
  describe("List", function(){
    let addMovie = function(currentState, movie){
      return currentState.push(movie);
    };

    it("is immutable", function(){
      let state = List.of("Trainspotting", "28 Days Later");
      let nextState = addMovie(state, "Sunshine");

      expect(nextState).to.equal(List.of(
        "Trainspotting",
        "28 Days Later",
        "Sunshine"
      ));

      expect(state).to.equal(List.of(
        "Trainspotting",
        "28 Days Later"
      ));
    });
  });

  // immutable map test
  describe("a tree", function(){
    let addMovie = function(currentState, movie){
      //return currentState.set("movies", currentState.get("movies").push(movie));
      return currentState.update("movies", function(movies){
        return movies.push(movie);
      });
    };

    it("is immutable", function(){
      let state = Map({
        movies: List.of("Trainspotting", "28 Days Later")
      });
      let nextState = addMovie(state, "Sunshine");

      expect(nextState).to.equal(Map({
        movies: List.of(
          "Trainspotting",
          "28 Days Later",
          "Sunshine"
        )
      }));

      expect(state).to.equal(Map({
        movies: List.of(
          "Trainspotting",
          "28 Days Later"
        )
      }));
    })
  })
});