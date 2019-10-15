import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Dishes extends Component {
    constructor(props){
        super(props);
        this.state = {
            dishes: [],
        }
    }

    // fetch dishes

    createDish = dish => {
        return (
            <div class="col-sm-6 col-md-2" key={dish.id}>
                <div class="thumbnail">
                    <img src={dish.image} alt={dish.title} />
                    <div class="caption">
                        <h5></h5>
                        <p><Link to={`/${dish.id}`}>Show details</Link></p>
                    </div>
                </div>
            </div>
        )
    }

    render () {
        const dishesToRender = this.state.dishes.map(dish => this.createDish(dish)); 
        return (
            <>
                {dishesToRender}
            </>
        );
    }
}

export default Dishes;