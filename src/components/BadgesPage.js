import React from 'react';
import { Grid, Form, Button, Card, Popup, Image } from 'semantic-ui-react';
import '../styles/badges.css';

export default class BadgesPage extends React.Component {
  state = {
    badges: [],
    cart_item: {}
  }

  componentDidMount() {
    fetch("https://murmuring-scrubland-72784.herokuapp.com/badges/all")
    .then(response => response.json())
    .then(responseData => this.setState({badges: responseData}))
  }

  handleCartAdd = (id, price) => () => {
    const body = new FormData();
    body.append('badge_id', id);
    body.append('unit_price', price);
    body.append('quantity', 1);
    return fetch('https://murmuring-scrubland-72784.herokuapp.com/badges/add', {
      method: 'POST',
      mode: 'cors',
      body
    })
    .then(response => response.json())
    .then(() => console.log('You added to cart'))
  }

  render() {
    return (
      <Grid centered>
        <Grid.Row verticalAlign='middle'>
          <Form.Field label='Filter By:' control='select'>
            <option value='category'>Category</option>
            <option value='color'>Color</option>
            <option value='price'>Price</option>
          </Form.Field>
          <Form.Field label='Specific Filter:' control='select'>
            <option value='music'>Music</option>
            <option value='bands'>Bands</option>
          </Form.Field>
          <Button>Filter</Button>
        </Grid.Row>
        <Grid.Row>
          {this.state.badges.map(badge => (
            <Card key={badge.id} className='badge'>
              <Image width='100%' src={badge.image_path} alt='placeholder' />
              <Card.Content>
                <Card.Header>Name: {badge.product}</Card.Header>
                <Card.Meta>Category: {badge.category}</Card.Meta>
                <Card.Description>Description: {badge.description}</Card.Description>
              </Card.Content>
              <Card.Content extra>Price: {badge.price}</Card.Content>
              <Popup trigger={<Button onClick={this.handleCartAdd(badge.id, badge.price)} icon='add' />} content='Add to Cart?' />
            </Card>
          ))}

        </Grid.Row>
      </Grid>

    )
  }
}
