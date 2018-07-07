import React, { Component } from 'react';
import '../css/Activity.css';

class Activity extends Component {
  render(props) {
    return(
      <div className="activity">
        <h3>{this.props.data.name}</h3>
        <p>Average Speed: {this.props.convertTime(this.props.data.average_speed)}</p>
      </div>
    )
  }
}

export default Activity;
