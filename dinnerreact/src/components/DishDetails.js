import React, { Component } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

class DishDetails extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      dish: {},
      error: false,
      errorMsg: '',
      loading: false
    };
  }
  componentDidMount() {
    this.fetchDish({ cardId: this.props.match.params.id });
  }
  fetchDish = async params => {
    this.setState({ loading: true });
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const targetUrl = `https://omgvamp-hearthstone-v1.p.rapidapi.com/cards/${params.cardId}`;
    const data = await fetch(proxyUrl + targetUrl, {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'omgvamp-hearthstone-v1.p.rapidapi.com',
        'x-rapidapi-key': '37e23f395amshef4b0440541150dp1c40cejsnbe092fc46af9'
      }
    });
    const item = await data.json();
    console.log(item);
    this.setState({
      dish: item[0],
      error: false,
      errorMsg: '',
      loading: false
    });
  };

  /* cardId: "TB_LEAGUE_REVIVAL_BrannHistory"
  dbfId: "58613"
  name: "Brann Bronzebeard"
  cardSet: "Tavern Brawl"
  type: "Hero"
  rarity: "Legendary"
  health: 15
  text: "Work co-operatively with Brann to defeat King Krush, Untamed!"
  elite: true
  playerClass: "Hunter"
  img: "http://wow.zamimg.com/images/hearthstone/cards/enus/original/TB_LEAGUE_REVIVAL_BrannHistory.png"
  imgGold: "http://wow.zamimg.com/images/hearthstone/cards/enus/animated/TB_LEAGUE_REVIVAL_BrannHistory_premium.gif"
  locale: "enUS"*/

  /*createDish = dish => {
    return (
      <Col sm={6} md={2} key={dish.cardId}>
        <div className="thumbnail">
          <Image
            src={dish.img}
            alt={dish.name}
            thumbnail
            onError={e => {
              e.target.onerror = null;
              e.target.src = 'http://localhost:3000/imgs/default2.png';
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
*/
  add = () => {
    this.props.history.push({
      pathname: '/dinner',
      state: {
        id: this.props.match.params.id,
        description: this.state.dish.text,
        title: this.state.dish.name,
        image: this.state.dish.img
      }
    });
  };
  createDish = dish => {
    return (
      <>
        <Row>
          <Col sm={6} md={9}>
            <h2>{dish.name}</h2>
            <p>{dish.text}</p>
          </Col>
          <Col sm={6} md={3}>
            <Image
              src={dish.img}
              alt={dish.name}
              onError={e => {
                e.target.onerror = null;
                e.target.src = 'http://localhost:3000/imgs/default2.png';
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Button href="http://localhost:3000/dinner" variant="success">
              Go back
            </Button>
            <Button variant="warning" onClick={this.add}>
              Add
            </Button>
          </Col>
        </Row>
      </>
    );
  };

  render() {
    if (this.state.loading) {
      return <p>loading</p>;
    }
    if (this.state.error) {
      return <p>error</p>;
    }
    return <>{this.createDish(this.state.dish)}</>;
  }
}

export default DishDetails;

/* fetch("https://omgvamp-hearthstone-v1.p.rapidapi.com/cards/%7Bname%7D", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "omgvamp-hearthstone-v1.p.rapidapi.com",
		"x-rapidapi-key": "37e23f395amshef4b0440541150dp1c40cejsnbe092fc46af9"
	}
})*/
