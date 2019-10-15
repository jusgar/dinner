import React, { Component } from 'react';

class SideBar extends Component {
    constructor(props){
        super(props);
    }
    render () {
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
						<input id="numberOfGuests" type="number" min="1" max="999" className="numberofpeople" />
					</div>
				</div>
				<div id="sideBarViewTable"></div>
				<div className="row contentbutton">
					<br/>
					<button id="confirmDinnerButton" type="button" className="confirmButtonDisabled">Confirm Dinner</button>
				</div>	
			</div>
        );
    }
}

export default SideBar;