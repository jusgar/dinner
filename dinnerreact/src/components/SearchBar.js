import React, { Component } from 'react';

class SearchBar extends Component {
    constructor(props){
        super(props);
    }
    render () {
        return (
            <div id="searchBarView" className="box-column">
					<div className="row">
						<div className="col-md-3">
							<div className="title">
								<h3>Find a dish </h3>
							</div>
						</div>
					</div>
					<div className="row searchbar">
						<div className="col-md-3">
							<div className="keywords">
								<input id="keyword" type="text" placeholder="Enter key words" /> 
							</div>
						</div>
						<div className="col-md-2">
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
						</div>
						<div className="col-md-2">
							<div className="Search">	
								<button id="searchButton" type="button" className="search">Search</button>
							</div>
						</div>
					</div>
					<div className="row"><br /></div>
					</div>	
        );
    }
}

export default SearchBar;