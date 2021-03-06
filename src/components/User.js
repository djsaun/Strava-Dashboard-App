import React, { Component } from 'react';

class User extends Component {
  render() {
    const fullName = `${this.props.firstname} ${this.props.lastname}`;

    const rides = `${this.props.rides}`;
    // console.log(this.props.runs.distance);
    return(
      <div className="user">
        <div className="user-left">
          <img src={this.props.image} alt={fullName}/>
          <h3>{fullName}</h3>
        </div>
        <div className="user-right">
          <p>Location: {this.props.city}, {this.props.state}</p>
          <p>Followers: {this.props.follower_count}</p>
          <p>Friends: {this.props.friend_count}</p>
        </div>
        <div className="rides">
          {rides}
        </div>
      </div>
    )
  }
}

export default User;
