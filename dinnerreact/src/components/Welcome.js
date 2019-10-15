import React from 'react';
import { Link } from "react-router-dom";
import './Welcome.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Welcome() {
    return (
        <div className="Welcome">
            <br />
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
            </div>
        </div>
    );
  }
  
  export default Welcome;
  