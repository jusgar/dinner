import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import { Row, Col, Container } from 'react-bootstrap';

class SearchBar extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Row>
        <Col md="3">
          <div className="title">
            <h3>Find a dish </h3>
          </div>
        </Col>
        <Col md="3">
          <input id="keyword" type="text" placeholder="Enter key words" />
        </Col>
        <Col md="2">
          <select id="searchType" className="windowall">
            <option value="">All</option>
            <option value="appetizer">Appetizer</option>
            <option value="main course">Main Course</option>
            <option value="side dish">Side dish</option>
            <option value="salad">Salad</option>
            <option value="bread">Bread</option>
            <option value="breakfast">Breakfast</option>
            <option value="soup">Soup</option>
            <option value="beverage">Beverage</option>
            <option value="sauce">Sauce</option>
            <option value="drink">Drink</option>
            <option value="dessert">Dessert</option>
          </select>
        </Col>
        <Col md="4">
          <Button id="searchButton" type="button" className="search">
            Search
          </Button>
        </Col>
      </Row>
    );
  }
}

export default SearchBar;
