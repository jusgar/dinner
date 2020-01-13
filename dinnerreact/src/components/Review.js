import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

class Review extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    if (this.props.location && this.props.location.state) {
      console.log(this.props.location.state);
    }
  }

  render() {
    return <></>;
  }
}

export default Review;
