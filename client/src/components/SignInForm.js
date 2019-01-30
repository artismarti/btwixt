import React from 'react'

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

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
      <div>
        <TextField
          id="emailInput"
          label="email"
          value={email}
          onChange={handleChange}
          margin="normal"
          name="email"
        />
        <br />
        <TextField
          id="passwordInput"
          label="password"
          value={password}
          onChange={handleChange}
          margin="normal"
          name="password"
          type="password"
        />
        <br />
        <Button onClick={handleSubmit} variant="contained" color="primary">
          SUBMIT
        </Button>
      </div>
    )
  }
}

export default SignInForm
