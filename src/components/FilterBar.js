import React, {Component} from 'react';

class FilterBar extends Component {

  render(props) {
    return (
      <div>
        <form>
          <input onChange={this.props.updateSpeedToggle} type="radio" name="speed" id="fast" value="fast" />
          <label htmlFor="fast">Fast</label>
          <input onChange={this.props.updateSpeedToggle} type="radio" name="speed" id="slow" value="slow" />
          <label htmlFor="slow">Slow</label>
        
          <input onChange={this.props.updateTypeToggle} type="radio" name="type" id="ride" value="ride" />
          <label htmlFor="ride">Ride</label>
          <input onChange={this.props.updateTypeToggle} type="radio" name="type" id="run" value="run" />
          <label htmlFor="run">Run</label>
        </form>
      </div>
    )
  }
}


export default FilterBar;
