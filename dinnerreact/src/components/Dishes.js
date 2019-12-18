import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

class Dishes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: [],
      error: false,
      errorMsg: '',
      loading: false
    };
  }
  componentDidMount() {
    this.fetchDishes({ quality: 'Legendary', health: 15 });
  }
  // fetch dishes
  fetchDishes = async params => {
    this.setState({ loading: true });
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const targetUrl = `https://omgvamp-hearthstone-v1.p.rapidapi.com/cards/qualities/${params.quality}?health=${params.health}`;
    const data = await fetch(proxyUrl + targetUrl, {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'omgvamp-hearthstone-v1.p.rapidapi.com',
        'x-rapidapi-key': '37e23f395amshef4b0440541150dp1c40cejsnbe092fc46af9'
      }
    });
    const items = await data.json();
    console.log(items);
    this.setState({
      dishes: items,
      error: false,
      errorMsg: '',
      loading: false
    });
  };

  createDish = dish => {
    return (
      <Col sm={6} md={2} key={dish.cardId}>
        <div className="thumbnail">
          <Image
            src={dish.img}
            alt={dish.name}
            thumbnail
            onError={e => {
              e.target.onerror = null;
              e.target.src = 'imgs/default2.png';
            }}
          />
          <div className="caption">
            <h6>{dish.name}</h6>
            <p>
              <Link to={`/dinner/dish/${dish.cardId}`}>Show details</Link>
            </p>
          </div>
        </div>
      </Col>
    );
  };

  render() {
    if (this.state.loading) {
      return <p>loading</p>;
    }
    if (this.state.error) {
      return <p>error</p>;
    }
    const dishesToRender = this.state.dishes.map(dish => this.createDish(dish));
    return <>{dishesToRender}</>;
  }
}

export default Dishes;
