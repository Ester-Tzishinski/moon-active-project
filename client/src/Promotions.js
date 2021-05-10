import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';
class PromotionList extends Component {

  constructor(props) {
    super(props);
    this.state = { promotions: [], isLoading: true, column: [], pageNumber: 1 };
    this.remove = this.remove.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }
  componentDidMount() {
    this.setState({ isLoading: true });
    fetch('api/schema')
      .then(response => response.json())
      .then(schema => this.setState({ promotionCoulmn: schema, isLoading: false }));
    fetch('/api/promotions', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    this.props.history.push('/promotions');
    this.fetchItems(this.state.pageNumber);
  }

  async handleScroll(e) {
    console.log("target", e.target)
    const pageNumber = this.state.pageNumber;
    const top = e.target.scrollTop < 50;
    const bottom = e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight < 50;
    console.log('bottommmmm', bottom)
    console.log('toppppppppp', top)
    if (bottom || top) {
      if (Button)
        this.setState({ pageNumber: pageNumber + 1 });
      else
        if (top) {
          debugger;
          this.setState({ pageNumber: pageNumber - 1 });
        }
      console.log("pppppppppppppppppppppppp", pageNumber);
      this.fetchItems(pageNumber);
    }
  }

  async fetchItems(pageNumber) {
    fetch(`api/promotions/${pageNumber}`)
      .then(response => {
        return response.json()
      })
      .then(data => {
        return this.setState({ promotions: data, isLoading: false })
      }
      )
  }

  async duplicate(item) {
    await fetch(`/api/promotion/duplicate`, {
      method: 'POST',
      body: JSON.stringify(item),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => {
      console.log("DUPLICATE Done!");
    });
  }

  async remove(id) {
    await fetch(`/api/promotion/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => {
      console.log("Remove Done!");
      const updatedPromotions = [...this.state.promotions].filter(i => i._id !== id);
      this.setState({ promotions: updatedPromotions });
    });
  }

  render() {
    const { promotionCoulmn, promotions, isLoading } = this.state;
    if (isLoading) {
      return <p>Loading...</p>;
    }
    const promotionList = promotions.map(item => (
      <tr key={item._id}>
        <td style={{ width: '5px' }}> <input type="checkbox"></input></td>
        {    Object.values(item).map(value =>
          <td key={value}>{item._id !== value ? value : ''}</td>
        )}<td>
          <ButtonGroup>
            <Button style={{ borderColor: '#04AA6D', color: 'green', backgroundColor: '#e7e7e7' }} tag={Link} to={"/promotions/" + item._id}><i class="fa fa-home"></i>Edit</Button>
            <Button color="success" onClick={() => this.duplicate(item)}>Duplicate</Button>
            <Button style={{ borderColor: '#04AA6D', color: 'green', backgroundColor: '#e7e7e7' }} type="button" onClick={() => this.remove(item._id)}>Delete</Button>
          </ButtonGroup>
        </td></tr>
    ))
    const myKeys = [];
    promotionCoulmn.forEach(item => (
      myKeys.push(Object.values(item))
    ));
    const coulmns = myKeys.map(coulmn =>
      <th>{coulmn[1]}</th>,
    )
    coulmns.push(<th>Actions</th>)
    return (
      <div onScroll={this.handleScroll} style={{ height: '750px', overflow: 'auto' }}>
        <AppNavbar />
        <Container fluid>
          <div className="float-right">
            <Button style={{ borderColor: '#04AA6D', color: 'green', backgroundColor: '#e7e7e7' }} tag={Link} to="/promotions/new">Add Promotion</Button>
          </div>
          <h3 style={{ color: 'gray' }}>Promotion List</h3>
          <Table className="mt-4">
            <thead >
              <tr style={{ color: 'green', backgroundColor: '#e7e7e7' }}>
                <th></th>
                <th></th>
                {coulmns}
              </tr>
            </thead>
            <tbody style={{ color: 'gray' }}>
              {promotionList}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default PromotionList;