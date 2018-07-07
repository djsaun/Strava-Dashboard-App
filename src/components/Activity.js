import React, { Component } from 'react';
import dateFns from 'date-fns'
import '../css/Activity.css';

class Activity extends Component {
  render(props) {
    return(
      <div className="activity">
        <h3>{this.props.data.name}</h3>
        <p className="date">{dateFns.format(this.props.data.start_date, 'MM/DD/YYYY')}</p>
        <p>Average Speed: {this.props.convertTime(this.props.data.average_speed)} mph</p>
        <p>Total Distance: {this.props.convertDistance(this.props.data.distance)} miles</p>
      </div>
    )
  }
}

export default Activity;
