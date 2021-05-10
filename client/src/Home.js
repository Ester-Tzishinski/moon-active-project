import React, { Component } from 'react';
import './App.css';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';
import { Button, Container } from 'reactstrap';
import Promotions from './Promotions'


class Home extends Component {
  render() {
    return (
      <div>
        <AppNavbar />
        <Container fluid>
          <Button style={{ borderColor: '#04AA6D', color: 'green', backgroundColor: '#e7e7e7' }} tag={Link} to="/promotions">Generate Promotions</Button>
        </Container>
      </div>
    );
  }
}

export default Home;