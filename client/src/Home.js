import React, { Component } from 'react';
import './App.css';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';
import { Button, Container } from 'reactstrap';
import Scroll2 from './PromotionList'

class Home extends Component {
  render() {
    return (
      <div>
        <AppNavbar />
        <Container fluid>
          <Button color="link"><Link to="/promotions">Manage promotion List</Link></Button>
          {/* <Scroll2 /> */}
        </Container>
      </div>
    );
  }
}

export default Home;