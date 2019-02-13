import React from 'react'
import { Container, Form, Input, Button } from 'semantic-ui-react'
import API from '../API'

class ProfileContainer extends React.Component {
  state = {
    firstName: '',
    lastName: '',
    currentPassword: '',
    newPassword: '',
    id: '',
  }
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  updateProfile = event => {
    let userProfile = {
      id: this.state.id,
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      currentPassword: this.state.currentPassword,
      newPassword: this.state.newPassword,
    }
    API.updateUserProfile(userProfile)
  }
  componentDidMount() {
    // if a user is not signed in, redirect to sign in
    const { email, history } = this.props
    if (!email) {
      return history.push('/signin')
    } else {
      API.getUser().then(data => {
        if (data.error) {
          console.log(data.error)
        } else {
          this.setState({
            firstName: data.first_name,
            lastName: data.last_name,
            id: data.id,
          })
        }
      })
    }
  }

  render() {
    const { firstName, lastName } = this.state
    return (
      <Container fluid>
        <Form>
          <Form.Group widths="equal">
            <Form.Field
              id="form-input-control-first-name"
              control={Input}
              label="First name"
              value={firstName || ''}
              name="firstName"
              onChange={this.handleChange}
            />
            <Form.Field
              id="form-input-control-last-name"
              control={Input}
              label="Last name"
              value={lastName || ''}
              name="lastName"
              onChange={this.handleChange}
            />
            <Form.Field
              id="form-input-control-last-name"
              control={Input}
              label="Current Password"
              placeholder="Enter Current Password"
              type="password"
              name="currentPassword"
              onChange={this.handleChange}
            />

            <Form.Field
              id="form-input-control-last-name"
              control={Input}
              label="New Password"
              placeholder="Enter New Password"
              type="password"
              name="newPassword"
              onChange={this.handleChange}
            />
          </Form.Group>

          <Form.Field
            id="form-button-control-public"
            control={Button}
            content="Update"
            onClick={this.updateProfile}
          />
        </Form>
      </Container>
    )
  }
}
export default ProfileContainer
