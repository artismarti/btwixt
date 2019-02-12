import React from 'react'
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'

import API from '../API'

class SignInForm extends React.Component {
  state = {
    email: '',
    password: '',
  }
  handleChange = event =>
    this.setState({ [event.target.name]: event.target.value })

  handleSubmit = () => {
    API.signin(this.state).then(data => {
      if (data.error) {
        alert(data.error)
      } else {
        this.props.signin(this.state.email, data.token)
        this.props.history.push('/meetings')
      }
    })
  }

  render() {
    const { email, password } = this.state
    const { handleChange, handleSubmit } = this

    return (
      <div className="login-form">
        <style>{`
      body > div,
      body > div > div,
      body > div > div > div.login-form {
        height: 100%;
      }
    `}</style>
        <Grid
          textAlign="center"
          style={{ height: '100%' }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="teal" textAlign="center">
              Log-in to your account
            </Header>
            <Form size="large">
              <Segment stacked>
                <Form.Input
                  id="emailInput"
                  type="email"
                  label="email"
                  value={email}
                  onChange={handleChange}
                  name="email"
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="E-mail address"
                />
                <Form.Input
                  id="passwordInput"
                  label="password"
                  value={password}
                  onChange={handleChange}
                  name="password"
                  type="password"
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                />

                <Button color="teal" onClick={handleSubmit} fluid size="large">
                  Login
                </Button>
              </Segment>
            </Form>
            <Message>
              New to bTwixt? <a href="#">Sign Up</a>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

export default SignInForm
