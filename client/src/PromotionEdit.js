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
  async componentDidMount() {
    if (this.props.match.params.id !== 'new') {
      fetch(`/api/promotion/${this.props.match.params.id}`)
        .then(response => response.json())
        .then(promotion => this.setState({ item: promotion }));
    }
    fetch('../api/schema')
      .then(response => response.json())
      .then(schema => this.setState({ promotionCoulmn: schema }));
  }

  async handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = { ...this.state.item };
    item[name] = value;
    this.setState({ item });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { item } = this.state;
    fetch('/api/promotion', {
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
    const title = <h2 style={{ color: 'green' }}>{item._id ? 'Edit Promotion' : 'Add Promotion'}</h2>;
    const fields = promotionCoulmn.map(fields => (
      <FormGroup style={{ color: 'gray' }}>
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
          <FormGroup>
            <Button color="primary" type="submit" style={{ borderColor: '#04AA6D', color: 'green', backgroundColor: '#e7e7e7' }}>Save</Button>{' '}
            <Button color="success" tag={Link} to="/promotions">Cancel</Button>
          </FormGroup>
        </Form>
      </Container>
    </div>
  }
}

export default withRouter(PromotionEdit);