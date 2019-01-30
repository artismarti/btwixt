import React from 'react'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap'

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
      <Form>
        <FormGroup>
          <Label for="emailInput">Email</Label>
          <Input
            id="emailInput"
            value={email}
            onChange={handleChange}
            margin="normal"
            name="email"
            placeholder="email address"
          />
          <br />
          <Label for="passwordInput">Password</Label>
          <Input
            id="passwordInput"
            value={password}
            onChange={handleChange}
            margin="normal"
            name="password"
            type="password"
            placeholder="password"
          />
          <br />
          <FormText color="muted">
            Enter your details to view your meetings
          </FormText>
        </FormGroup>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          SUBMIT
        </Button>
      </Form>
    )
  }
}

export default SignInForm
