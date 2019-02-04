import React from 'react'
import { Button, Checkbox, Form, Icon, Card, Input } from 'semantic-ui-react'

import API from '../API'

class Create extends React.Component {
  state = {
    contacts: [],
    latitude: 0.0,
    longitude: 0.0,
    title: '',
    date: '',
    time: '',
    start_address: '',
    invitees: [],
  }

  getContacts() {
    API.getContacts().then(data => this.createContacts(data))
  }

  handleChange = event =>
    this.setState({ [event.target.name]: event.target.value })

  // get lat long from API
  getLatLong(data) {
    this.setState(
      {
        latitude:
          data['Response']['View']['0']['Result']['0']['Location'][
            'DisplayPosition'
          ]['Latitude'],
        longitude:
          data['Response']['View']['0']['Result']['0']['Location'][
            'DisplayPosition'
          ]['Longitude'],
      },
      // then create meeting
      this.createNewMeeting
    )
  }

  // Create New Meeting
  handleSubmit = event => {
    let url = `https://geocoder.api.here.com/6.2/geocode.json?app_id=EUNJEIDbEAKKaUz5IRBj&app_code=nI-30KLhGkA-zFavU7hhYw&searchtext=${
      this.state.start_address
    }`
    // send start address to get lat long from API
    fetch(url)
      .then(response => response.json())
      .then(data => this.getLatLong(data))
  }

  createNewMeeting() {
    let date_time = `${this.state.date} ${this.state.time}`
    let meeting = {
      title: this.state.title,
      start_address: this.state.start_address,
      latitude: this.state.latitude,
      longitude: this.state.longitude,
      invitees: this.state.invitees,
      date_time: date_time,
    }
    console.log(meeting)

    API.createMeeting(meeting).then(data => {
      if (data) {
        if (data.error) {
          alert(data.error)
        }
      } else {
        this.props.getMeeting()
      }
    })
  }

  getUserLocation() {
    const location = window.navigator && window.navigator.geolocation
    console.log(location)

    if (location) {
      location.getCurrentPosition(
        position => {
          this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          })
        },
        error => {
          this.setState({
            latitude: 0.0,
            longitude: 0.0,
          })
        }
      )
    }
  }

  createContacts = data => {
    let contacts = data.map(d => {
      return d.contacts
    })
    // Filter out duplicates
    let uniqueContacts = Object.values(
      contacts
        .flat()
        .reduce((acc, cur) => Object.assign(acc, { [cur.id]: cur }), {})
    )
    //  Remove current user from contacts
    uniqueContacts = uniqueContacts.filter(c => c.email !== this.props.email)

    this.setState({ contacts: [...uniqueContacts] })
  }

  componentDidMount() {
    // if a user is not signed in, redirect to sign in
    const { email, history } = this.props
    if (!email) {
      history.push('/signin')
    } else {
      this.getContacts()
      // this.getUserLocation()
    }
  }

  handleInvitee = event => {
    console.log(event)
    // if target.value = true then add to invitees
    let invitees = this.state.invitees
    event.target.checked
      ? (invitees = [...invitees, event.target.id])
      : // otherwise remove from invitees
        (invitees = invitees.filter(i => i !== event.target.id))
    this.setState({ invitees })
  }

  render() {
    const { contacts } = this.state
    return (
      <Card.Group centered>
        <Form size="large">
          <Form.Field required width="six">
            <Input
              label="Title:"
              placeholder=""
              name="title"
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field required width="six">
            <label>
              <Icon name="location arrow" color="orange" />
              Street address or Postcode:
            </label>
            <Input
              placeholder="address"
              name="start_address"
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field required width="six">
            <label>
              <Icon name="calendar check outline" color="orange" />
              Meeting Date:
            </label>
            <Input type="date" name="date" onChange={this.handleChange} />
          </Form.Field>
          <Form.Field required width="six">
            <label>
              <Icon name="clock outline" color="orange" />
              Meeting Time:
            </label>
            <input type="time" name="time" onChange={this.handleChange} />
          </Form.Field>

          <Form.Field>
            <label>
              <Icon name="users" color="orange" />
              Invitees:
            </label>
            {contacts.length === 0 && <div>No contacts</div>}
            {contacts.map(contact => (
              <Checkbox
                label={contact.first_name + ' ' + contact.last_name}
                id={contact.email}
                key={contact.id}
                onChange={this.handleInvitee}
              />
            ))}
          </Form.Field>
          <Button type="submit" primary onClick={this.handleSubmit}>
            Submit
          </Button>
        </Form>
      </Card.Group>
    )
  }
}

export default Create
