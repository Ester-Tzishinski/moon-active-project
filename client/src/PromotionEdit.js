import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';

class PromotionEdit extends Component {


  constructor(props) {
    super(props);
    this.state = { promotionCoulmn: [], item: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  // emptyPromotion = {
  //   promotionName: '',
  //   type: '',
  //   startDate: '',
  //   endDate: '',
  //   userGroupName: ''
  // };
  async componentDidMount() {
    if (this.props.match.params.id !== 'new') {
      console.log("this.props.match.params.id", this.props.match.params.id);
      fetch(`/api/promotion/${this.props.match.params.id}`)
      .then(response => response.json())
      .then(promotion => this.setState({ item: promotion }));
      console.log("promedit",this.state.item);
    }
    fetch('../api/schema')
      .then(response => response.json())
      .then(schema => this.setState({ promotionCoulmn: schema }));
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = { ...this.state.item };
    item[name] = value;
    this.setState({ item });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const { item } = this.state;

    await fetch('/api/promotion', {
      method: (item._id) ? 'PUT' : 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item),
    });
    this.props.history.push('/promotions');
  }

  render() {
    const { promotionCoulmn, item } = this.state;
    const title = <h2>{item.id ? 'Edit Promotion' : 'Add Promotion'}</h2>;
    console.log("promotionCoulmn edit", promotionCoulmn);
    const fields = promotionCoulmn.map(fields => (
      // console.log("fields",fields.fieldName)
      <FormGroup >
        <Label for={fields.fieldName}>{fields.fieldName}</Label>
        <Input type="text" name={fields.fieldName} id={fields.fieldName} value={item[fields.fieldName] || ''}
          onChange={this.handleChange} autoComplete={fields.fieldName} />
      </FormGroup>
    ))
    return <div>
      <AppNavbar />
      <Container>
        {title}
        <Form onSubmit={this.handleSubmit}>
          {fields}
          {/* <FormGroup>
            <Label for="promotionName">prmotion name</Label>
            <Input type="text" name="promotionName" id="promotionName" value={item.promotionName || ''}
              onChange={this.handleChange} autoComplete="promotionName" />
          </FormGroup>
          <FormGroup>
            <Label for="type">type</Label>
            <Input type="text" name="type" id="type" value={item.type || ''}
              onChange={this.handleChange} autoComplete="type" />
          </FormGroup>
          <FormGroup>
            <Label for="startDate">start date</Label>
            <Input type="date" name="startDate" id="startDate" value={item.startDate || ''}
              onChange={this.handleChange} autoComplete="startDate" />
          </FormGroup>
          <FormGroup>
            <Label for="endDate">end date</Label>
            <Input type="date" name="endDate" id="endDate" value={item.endDate || ''}
              onChange={this.handleChange} autoComplete="endDate" />
          </FormGroup>
          <FormGroup>
            <Label for="userGroupName">use group name</Label>
            <Input type="text" name="userGroupName" id="userGroupName" value={item.userGroupName || ''}
              onChange={this.handleChange} autoComplete="userGroupName" />
          </FormGroup> */}
          <FormGroup>
            <Button color="primary" type="submit">Save</Button>{' '}
            <Button color="secondary" tag={Link} to="/promotions">Cancel</Button>
          </FormGroup>
        </Form>
      </Container>
    </div>
  }
}

export default withRouter(PromotionEdit);