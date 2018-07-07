import React, { Component } from 'react';
import '../css/App.css';
import FilterBar from './FilterBar';
import User from './User';
import Activity from './Activity';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        firstname: '',
        lastname: '',
        city: '',
        state: '',
        sex: '',
        follower_count: '',
        friend_count: ''
      },
      activities: [],
      displayedActivities: [],
      rides: [],
      runs: [],
      speed: '',
      activityType: '',
      postsNum: 200, // 200 is the max number of items that can be returned from the API at once
      postsPerPage: 10
    };

    this.convertMetersPerSecondToMilesPerHour = this.convertMetersPerSecondToMilesPerHour.bind(this);
    this.convertMeterstoMiles = this.convertMeterstoMiles.bind(this);
    this.updateSpeedToggle = this.updateSpeedToggle.bind(this);
    this.updateTypeToggle = this.updateTypeToggle.bind(this);
    this.displayFilteredActivities = this.displayFilteredActivities.bind(this);
  }

  // Strava returns time in meters per second
  // Convert to miles per hour
  convertMetersPerSecondToMilesPerHour(time) {
    let convertedTime = time * 2.2369;

    return convertedTime.toFixed(2);
  }

  // Strava returns distance in meters
  // Convert to miles
  convertMeterstoMiles(distance) {
    return (distance * 0.000621).toFixed(2)
  }

  retrieveUserData() {
    axios.get(`https://www.strava.com/api/v3/athlete`, {
      headers: {
        'Authorization': `Bearer ${process.env.REACT_APP_STRAVA_ACCESS_TOKEN}`
      }
    })
    .then(response => {
      const userData = response.data;

      this.setState({
        user: {
          firstname: userData.firstname,
          lastname: userData.lastname,
          city: userData.city,
          state: userData.state,
          sex: userData.sex,
          follower_count: userData.follower_count,
          friend_count: userData.friend_count
        }
      })
    })
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

      activities.slice(0, this.state.postsPerPage).map(activity => {
        return this.setState({displayedActivities: [...this.state.displayedActivities, activity]});
      })

      activities.map(activity => {
        if (activity.type === 'Ride') {
          return this.setState({rides: [...this.state.rides, activity]});
        }

        if (activity.type === 'Run') {
          return this.setState({runs: [...this.state.runs, activity]});
        }
      })
    });
  }

  // Filter results based on selected speed and type inputs
  displayFilteredActivities() {
    let type = this.state.activityType;
    let speed = this.state.speed;
    let filteredActivities;

    if (type === 'ride') {
      filteredActivities = this.state.rides;
    } else if (type === 'run') {
      filteredActivities = this.state.runs;
    } else {
      filteredActivities = this.state.displayedActivities;
    }

    filteredActivities = filteredActivities.slice(0, this.state.postsPerPage)

    if (speed !== '') {
      filteredActivities.sort((a, b) => {
        return (speed === 'fast' ? b.average_speed - a.average_speed : a.average_speed - b.average_speed)
      });
    }

    this.setState({
      displayedActivities: filteredActivities
    });
  }

  updateSpeedToggle(e) {
    this.setState({speed: e.target.value})
  }

  updateTypeToggle(e) {
    this.setState({activityType: e.target.value})
  }

  componentDidMount() {
    this.retrieveUserData();
    this.retrieveActivities(process.env.REACT_APP_STRAVA_ID, this.state.postsNum);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.activityType !== prevState.activityType || this.state.speed !== prevState.speed) {
      this.displayFilteredActivities();
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Strava Stats Viewer</h1>
        </header>
        <User />
        <FilterBar updateSpeedToggle={this.updateSpeedToggle} updateTypeToggle={this.updateTypeToggle} />
        <div className="activities">
          {this.state.displayedActivities.map(activity => {
            return <Activity key={activity.id} data={activity} convertTime={this.convertMetersPerSecondToMilesPerHour} convertDistance={this.convertMeterstoMiles} />
          })}
        </div>
      </div>
    );
  }
}

export default App;
