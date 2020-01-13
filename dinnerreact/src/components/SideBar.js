import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currG: props.currG
    };
    console.log(props);
  }

  update = event => {
    this.props.updateFn(event.target.value);
  };

  next = () => {
    this.props.nextFn();
  };

  render() {
    return (
      <div className="box-column" id="sideBarView">
        <div className="row">
          <div className="title">
            <h2>My Dinner </h2>
          </div>
        </div>
        <div className="row">
          <div className="title">
            <h4>People </h4>
            <input
              id="numberOfGuests"
              type="number"
              min="1"
              max="999"
              className="numberofpeople"
              onChange={this.update}
            />
          </div>
        </div>
        <div id="sideBarViewTable"></div>
        <div className="row contentbutton">
          <br />
          <Button
            id="confirmDinnerButton"
            type="button"
            onClick={this.next}
            className="confirmButtonDisabled"
          >
            Confirm Dinner
          </Button>
        </div>
      </div>
    );
  }
}

export default SideBar;
