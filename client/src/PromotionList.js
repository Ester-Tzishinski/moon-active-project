import React, { Component } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import AppNavbar from './AppNavbar';
class Scroll2 extends Component {
  constructor(props) {
    super(props);
    this.state = { promotions: [], items: 20, hasMoreItems: true, index: 0 };
  }
  componentDidMount() {
    this.setState({ isLoading: true });
    fetch('api/schema')
      .then(response => response.json())
      .then(schema => this.setState({ promotionCoulmn: schema, isLoading: false }));
    // fetch('api/promotions')
    //     .then(response => response.json())
    //     .then(data => this.setState({ promotions: data, isLoading: false }));
    this.fetchItems();
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
  fetchItems() {
    // const length = this.state.length;
    const index = this.state.index;
    console.log("index", index);
    fetch(`api/promotions/${index}`)
      .then(response => {
        // debugger;
        return response.json()
      })
      .then(data => {
        console.log('======data', data);
        return this.setState({ promotions: data, isLoading: false })
      }
      )
      .catch(err => console.log('============e', err));
    const { promotions } = this.state;
    console.log("didMount", promotions);
  }
  loadMore(page) {
    console.log('=========loading', page);
    // debugger;
    if (document.documentElement.scrollTop === document.documentElement.offsetHeight) {
      this.setState({ hasMoreItems: false });
    } else {
      if (this.state.index < 500) {
        setTimeout(() => {
          // this.setState({ length: this.state.length + 10 });
          this.setState({ index: this.state.index + 10 });
          this.fetchItems()
          const { promotions } = this.state;
          console.log("loadMore", promotions);
        }, 3000);
      }
    }
  }
  showItems() {
    const items = [];
    // this.getPromotions();
    const { promotions, index } = this.state;
    // console.log("promotionsInShowItems", promotions);
    // for (var i = 0; i < this.state.length; i++) {
    // items.push(<li key={i}> Item {i} </li>);
    promotions.map(item => (
      items.push(
        <tr key={item._id}>{
         <td> <input type="checkbox"></input>
         </td>,
          Object.values(item).map(value =>
            <td key={value}>{item._id != value ? value : ''}</td>
          )}<td>
            <ButtonGroup>
              <Button size="sm" color="primary" tag={Link} to={"/promotions/" + item._id}>Edit</Button>
              <Button size="sm" color="" onClick={() => this.duplicate(item._id)}>Duplicate</Button>
              <Button size="sm" color="danger" onClick={() => this.remove(item._id)}>Delete</Button>
            </ButtonGroup>
          </td>
        </tr>
      )
    ))
    // console.log(i);
    // }
    console.log('============items', items);
    return items;
  }
  render() {
    const { promotionCoulmn, promotions, isLoading } = this.state;
    if (isLoading) {
      return <p>Loading...</p>;
    }
    console.log("promotionCoulmn", promotionCoulmn);
    console.log("promotionsScroll", promotions);
    const keys = [];
    const columns = [];
    promotions.map(item => (
      keys.push(Object.keys(item))
    ))
    keys.map((item) => (
      item.map(a => {
        if (!columns.some(val => val === a)) {
          columns.push(a);
        }
      })))
    const col = columns.map(coulmn =>
      <th>{'_id' != coulmn ? coulmn : ''}</th>
    )
    return (
      <div>
        <AppNavbar />
        <Container fluid>
          <div className="float-right">
            <Button color="success" tag={Link} to="/promotions/new">Add Promotion</Button>
          </div>
          <h3>Promotion List</h3>
          <Table className="mt-4">
            <thead>
              <td>{col}</td>
            </thead>
            <tbody>
              <div style={{ height: '500px', overflow: 'auto' }}>
                <InfiniteScroll
                  // isReverse
                  loadMore={this.loadMore.bind(this)}
                  hasMore={this.state.hasMoreItems}
                  loader={<div className="loader"> Loading... </div>}
                  useWindow={false}>
                  {this.showItems()}{" "}
                </InfiniteScroll>{" "}
              </div>{" "}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default Scroll2;