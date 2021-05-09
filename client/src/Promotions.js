import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';
class PromotionList extends Component {

  constructor(props) {
    super(props);
    this.state = { promotions: [], isLoading: true, column: [], pageNo: 1 };
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
    this.fetchItems();
  }
  handleScroll(e) {
    console.log("target", e.target)
    let pageNo = this.state.pageNo;
    const top = e.target.scrollTop < 50;
    const bottom = e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight < 50;
    console.log('bottommmmm', bottom)
    console.log('toppppppppp', top)
    if (bottom || top) {
      if (Button)
        this.setState({ pageNo: pageNo + 1 });
      else
        if (top) {
          debugger;
          this.setState({ pageNo: pageNo - 1 });
        }
      console.log("pppppppppppppppppppppppp", pageNo);
      this.fetchItems();
    }
  }

  fetchItems() {
    const pageNo = this.state.pageNo;
    fetch(`api/promotions/${pageNo}`)
      .then(response => {
        return response.json()
      })
      .then(data => {
        return this.setState({ promotions: data, isLoading: false })
      }
      )
    const { promotions } = this.state;
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
      let updatedPromotions = [...this.state.promotions].filter(i => i._id !== id);
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
          <td key={value}>{item._id != value ? value : ''}</td>
        )}<td>
          <ButtonGroup>
            <Button size="sm" color="primary" tag={Link} to={"/promotions/" + item._id}>Edit</Button>
            <Button size="sm" color="" onClick={() => this.duplicate(item)}>Duplicate</Button>
            <Button size="sm" color="danger" onClick={() => this.remove(item._id)}>Delete</Button>
          </ButtonGroup>
        </td></tr>
    ))
    const promotionColumns = [];
    const k = [];
    promotions.map(item => (
      k.push(Object.keys(item)),
      console.log("items", k)
    )
    )
    k.map((item) => (
      console.log(item),
      item.map(a => {
        if (!promotionColumns.some(val => val === a)) {
          promotionColumns.push(a);
          console.log("em", a);
        }
      })
    )
    )
    console.log("promotionC", promotionColumns);
    const p = promotionColumns.map(coulmn =>
      <th>{'_id' != coulmn ? coulmn : ''}</th>,
    )
    p.push(<th>Actions</th>)
    console.log("p", promotionColumns);
    return (
      <div onScroll={this.handleScroll} style={{ height: '750px', overflow: 'auto' }}>
        <AppNavbar />
        <Container fluid>
          <div className="float-right">
            <Button color="success" tag={Link} to="/promotions/new">Add Promotion</Button>
          </div>
          <h3>Promotion List</h3>
          <Table className="mt-4">
            <thead>
              <tr>
                <th></th>
                {p}</tr>
              {/* <tr>{promColumn}</tr>  */}
            </thead>
            <tbody>
              {promotionList}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default PromotionList;