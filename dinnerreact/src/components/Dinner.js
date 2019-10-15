import React, { Component } from 'react';
import SearchBar from "./SearchBar";
import SideBar from "./SideBar";
import Dishes from "./Dishes";

class Dinner extends Component {
    constructor(props){
        super(props);
    }
    render () {
        return (
            <>
                <div className="row">
                    <div className="col-md-2"><SideBar /></div>
                    <div className="col-md-10"><SearchBar /></div>
                </div>
                <div className="row">
                    <div className="col-md-2"></div>
                    <div className="col-md-10"><Dishes /></div>
                </div>
            </>
        );
    }
}

export default Dinner;