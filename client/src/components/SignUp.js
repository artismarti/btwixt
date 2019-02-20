import React from 'react'
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'

import API from '../API'

class SignUp extends React.Component {
  state = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  }
  handleChange = event =>
    this.setState({ [event.target.name]: event.target.value })

  handleSubmit = () => {
    let newUser = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
      guest: false,
    }
    API.signup(this.state).then(data => {
      if (data.error) {
        alert(data.error)
      } else {
        this.props.signin(this.state.email, data.token)
        this.props.history.push('/meetings')
      }
    })
  }
  render() {
    return (
      <Grid
        textAlign="center"
        style={{ height: '100%' }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="teal" textAlign="center">
            Sign Up!
          </Header>
          <Form size="large">
            <Segment stacked>
              <Form.Input
                id="fnameInput"
                label="First Name"
                onChange={this.handleChange}
                name="firstName"
                type="text"
                fluid
                icon="user"
                iconPosition="left"
                placeholder="First Name"
              />
              <Form.Input
                id="lnameInput"
                label="Last Name"
                onChange={this.handleChange}
                name="lastName"
                type="text"
                fluid
                icon="user"
                iconPosition="left"
                placeholder="Last Name"
              />
              <Form.Input
                id="emailInput"
                type="email"
                label="Email"
                onChange={this.handleChange}
                name="email"
                fluid
                icon="mail"
                iconPosition="left"
                placeholder="E-mail address"
              />
              <Form.Input
                id="passwordInput"
                label="Password"
                onChange={this.handleChange}
                name="password"
                type="password"
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
              />

              <Button
                color="teal"
                onClick={this.handleSubmit}
                fluid
                size="large"
              >
                Sign Up
              </Button>
            </Segment>
          </Form>
          <Message>
            Already a Member <a href="/signin">Sign In</a>
          </Message>
        </Grid.Column>
      </Grid>
    )
  }
}

export default SignUp
