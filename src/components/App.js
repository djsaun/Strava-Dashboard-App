import React, { Component } from 'react';
import '../css/App.css';
import Activity from './Activity';
import axios from 'axios';
import { fastest } from 'sw-toolbox';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activities: [],
      rides: [],
      runs: [],
      postsNum: '200'
    };

    this.convertMetersPerSecondToMilesPerHour = this.convertMetersPerSecondToMilesPerHour.bind(this);
    this.displayFastestRuns = this.displayFastestRuns.bind(this);
    this.displayFastestRides = this.displayFastestRides.bind(this);
  }

  // Strava returns time in meters per second
  // Convert to miles per hour
  convertMetersPerSecondToMilesPerHour(time) {
    let convertedTime = time * 2.2369;

    return convertedTime.toFixed(2);
  }

  retrieveActivities(id, resultsNum) {
    axios
    .get(`https://www.strava.com/api/v3/athletes/${id}/activities`, {
      params: {
        access_token: process.env.REACT_APP_STRAVA_ACCESS_TOKEN,
        per_page: `${resultsNum}`
      }
    })
    .then(response => {
      const activities = response.data;
      this.setState({activities});

      activities.map(activity => {
        if (activity.type === 'Ride') {
          this.setState({rides: [...this.state.rides, activity]});
        }

        if (activity.type === 'Run') {
          this.setState({runs: [...this.state.runs, activity]});
        }
      })
    });
  }

  displayFastestRuns() {
    let fastestRuns = this.state.runs;

    fastestRuns.sort((a, b) => {
      return b.average_speed - a.average_speed;
    });

    this.setState({
      activities: fastestRuns
    });
  }

  displayFastestRides() {
    let fastestRides = this.state.rides;

    fastestRides.sort((a, b) => {
      return b.average_speed - a.average_speed;
    });

    this.setState({
      activities: fastestRides
    });
  }

  componentDidMount() {
    this.retrieveActivities(process.env.REACT_APP_STRAVA_ID, this.state.postsNum);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Strava Stats Viewer</h1>
        </header>
        <div>
          <button onClick={this.displayFastestRuns}>Display Fastest Runs</button>
          <button onClick={this.displayFastestRides}>Display Fastest Rides</button>
        </div>
        <div className="App-intro">
          {this.state.activities.map(activity => {
            return <Activity key={activity.id} data={activity} convertTime={this.convertMetersPerSecondToMilesPerHour} />
          })}
        </div>
      </div>
    );
  }
}

export default App;
