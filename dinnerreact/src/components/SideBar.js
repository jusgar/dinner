import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import { Row, Col, Container } from 'react-bootstrap';

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
      <Row>
        <Col md="12">
          <div className="title">
            <h2>My Dinner </h2>
          </div>
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
          <Button
            id="confirmDinnerButton"
            type="button"
            onClick={this.next}
            className="confirmButtonDisabled"
          >
            Confirm Dinner
          </Button>
        </Col>
      </Row>
    );
  }
}

export default SideBar;
