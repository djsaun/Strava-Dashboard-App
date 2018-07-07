import React, {Component} from 'react';

class FilterBar extends Component {

  render(props) {
    return (
      <div>
        <form onChange={this.props.updateSpeedToggle}>
          <input type="radio" name="speed" id="fast" value="fast" />
          <label htmlFor="fast">Fast</label>
          <input type="radio" name="speed" id="slow" value="slow" />
          <label htmlFor="slow">Slow</label>
        </form>

        <form onChange={this.props.updateTypeToggle}>
          <input type="radio" name="type" id="ride" value="ride" />
          <label htmlFor="ride">Ride</label>
          <input type="radio" name="type" id="run" value="run" />
          <label htmlFor="run">Run</label>
        </form>

        <button onClick={this.props.displayFilteredActivities}>Update Results</button>
      </div>
    )
  }
}


export default FilterBar;
