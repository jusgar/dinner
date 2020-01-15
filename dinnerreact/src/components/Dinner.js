import React, { Component } from 'react';
import SideBar from './SideBar';
import SearchBar from './SearchBar';
import Dishes from './Dishes';
import { Row, Col, Container } from 'react-bootstrap';

const store = [];
let guests = 1;

class Dinner extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (this.props.location && this.props.location.state) {
      console.log(`saved ${this.props.location.state.id}`);
      store.push({
        id: this.props.location.state.id,
        description: this.props.location.state.text,
        title: this.props.location.state.name,
        image: this.props.location.state.img
      });
    }
    console.log(store);
    console.log(guests);
  }
  componentDidUpdate() {
    console.log(guests);
  }
  updateGuests(num) {
    guests = num;
  }

  review = () => {
    this.props.history.push({
      pathname: '/review',
      state: {
        menu: store,
        guests: guests
      }
    });
  };

  render() {
    return (
      <>
        <Row>
          <Col md="3">
            <SideBar
              menu={store}
              updateFn={this.updateGuests}
              currG={guests}
              nextFn={this.review}
            />
          </Col>
          <Col md="3"></Col>
          <Col md="9">
            <SearchBar />
          </Col>
        </Row>
        <Row>
          <Col md="3"></Col>
          <Col md="9">
            <Dishes />
          </Col>
        </Row>
      </>
    );
  }
}

export default Dinner;
