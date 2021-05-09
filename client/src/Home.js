import React, { Component } from 'react';
import './App.css';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';
import ImageAPI from './ImageAPI';
import { Button, Container } from 'reactstrap';
import Promotions from './Promotions'
import Scroll2 from './PromotionList'


class Home extends Component {
  render() {
    return (
      <div>
        <AppNavbar />
        <Container fluid>
          <Button ><Link to="/promotions">Generate Promotions</Link></Button>
          {/* <Promotions/> */}
          {/* <Scroll2 /> */}
          {/* <ImageAPI /> */}
        </Container>
      </div>
    );
  }
}

export default Home;