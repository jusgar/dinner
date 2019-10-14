import React from 'react';
import './Welcome.css';

function Welcome() {
    return (
        <div className="Welcome">
            <div className="row front">
                <div className="col-md-4"></div>
                <div className="col-md-4">	
                    <h1 className="text-center" style={{"padding": "35px"}}>Dinner planner</h1>
                </div>
                <div className="col-md-4"></div>
		    </div>
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
                    <button id="showDinnerBtn" type="button" className="createNewbutton">Create new dinner</button>
                </div>
                <div className="col-md-4"></div>
            </div>
        </div>
    );
  }
  
  export default Welcome;
  