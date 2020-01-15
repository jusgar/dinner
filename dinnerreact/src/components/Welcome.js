import React from 'react';
import { Link } from 'react-router-dom';
import './Welcome.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Container } from 'react-bootstrap';

function Welcome() {
  return (
    <Container>
      <Row>
        <Col md="4"></Col>
        <Col md="4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi non
          facilisis neque. Vestibulum molestie nisl vel fermentum molestie. Nam
          aliquam efficitur quam, in fermentum elit ultrices sed. Aliquam luctus
          purus eu est hendrerit, a porttitor justo volutpat. Aliquam aliquam
          sed mi quis elementum.
        </Col>
        <Col md="4"></Col>
      </Row>
      <Row>
        <Col md="4"></Col>
        <Col md="4" contentbutton>
          <Link to="/dinner">
            <button
              id="showDinnerBtn"
              type="button"
              className="createNewbutton"
            >
              Create new dinner
            </button>
          </Link>
        </Col>
        <Col md="4"></Col>
      </Row>
    </Container>
  );
}

export default Welcome;

/*<br />
    <div className="row ">
        <div className="col-md-4 welcomeViewBox"></div>
        <div className="col-md-4 content welcomeViewBox">
            <h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi non facilisis neque. Vestibulum
            molestie nisl vel fermentum molestie. Nam aliquam efficitur quam, in fermentum elit ultrices
            sed. Aliquam luctus purus eu est hendrerit, a porttitor justo volutpat. Aliquam aliquam sed mi
            quis elementum.
                    </h4>
        </div>
        <div className="col-md-4 welcomeViewBox"></div>
    </div>
    <div className="row">
        <div className="col-md-4"></div>
        <div className="col-md-4 contentbutton">
            <Link to="/dinner"><button id="showDinnerBtn" type="button" className="createNewbutton">Create new dinner</button></Link>
        </div>
        <div className="col-md-4"></div>
    </div>*/
