import React, { Component } from 'react';

class Activity extends Component {
  render(props) {
    return(
      <div className="activity">
        <h3>{this.props.data.name}</h3>
      </div>
    )
  }
}

export default Activity;
