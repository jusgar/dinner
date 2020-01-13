import React, { Component } from 'react';
import SearchBar from './SearchBar';
import SideBar from './SideBar';
import Dishes from './Dishes';

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
        <div className="row">
          <div className="col-md-2">
            <SideBar
              menu={store}
              updateFn={this.updateGuests}
              currG={guests}
              nextFn={this.review}
            />
          </div>
          <div className="col-md-10">
            <SearchBar />
          </div>
        </div>
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-10">
            <Dishes />
          </div>
        </div>
      </>
    );
  }
}

export default Dinner;
