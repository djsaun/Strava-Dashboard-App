import React, { Component } from 'react';
import '../css/App.css';
import Activity from './Activity';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activities: [],
    };
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
      console.log(activities)
    });
  }

  componentDidMount() {
    this.retrieveActivities(process.env.REACT_APP_STRAVA_ID, '20');
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Strava Stats Viewer</h1>
        </header>
        <div className="App-intro">
          {this.state.activities.map(activity => {
            return <Activity key={activity.id} data={activity} />
          })}
        </div>
      </div>
    );
  }
}

export default App;
