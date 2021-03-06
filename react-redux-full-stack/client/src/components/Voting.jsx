import React from "react";
import PureRenderMixin from "react-addons-pure-render-mixin";
import {connect} from "react-redux";

import Winner from "./Winner";
import Vote from "./Vote";
import * as actionCreators from "../action_creators";

// pure component is an equivalent of pure function
export const Voting = React.createClass({
  mixins: [PureRenderMixin],
  render: function(){
    return <div>
      {this.props.winner
        ? <Winner ref="winner" winner={this.props.winner} />
        : <Vote {...this.props} />}
    </div>
  }
});

function mapStateToProps(state){
  return {
    pair: state.getIn(["vote", "pair"]),
    hasVoted: state.get("hasVoted"),
    winner: state.get("winner")
  };
}

// connected/smart component wraps pure component with some logic
export const VotingContainer = connect(
    mapStateToProps,
    actionCreators
)(Voting);