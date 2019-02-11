import React from 'react'
import {
  Button,
  Checkbox,
  Form,
  Icon,
  Card,
  Input,
  List,
} from 'semantic-ui-react'
import {
  DateInput,
  TimeInput,
  DateTimeInput,
  DatesRangeInput,
} from 'semantic-ui-calendar-react'

import API from '../API'
const APP_ID = process.env.REACT_APP_HERE_APP_ID
const APP_CODE = process.env.REACT_APP_HERE_APP_CODE

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
    newInviteeEmail: '',
    newInvitees: [],
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
    let url = `https://geocoder.api.here.com/6.2/geocode.json?app_id=${APP_ID}&app_code=${APP_CODE}&searchtext=${
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
      invitees: [...this.state.invitees, ...this.state.newInvitees],
      date_time: date_time,
    }

    API.createMeeting(meeting).then(data => {
      if (data.error) {
        alert(data.error)
      } else {
        this.props.getMeetings()
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

  handleNewInvitees = event => {
    this.setState({
      newInviteeEmail: event.target.value,
    })
  }
  createNewInvitees = event => {
    this.setState({
      newInvitees: [...this.state.newInvitees, this.state.newInviteeEmail],
      newInviteeEmail: '',
    })
  }

  displayNewInviteesList = () => {
    let newInvitees = this.state.newInvitees
    return newInvitees.length > 0 ? (
      newInvitees.map(ni => <List.Item icon="users" content={ni} />)
    ) : (
      <List.Item icon="users" content={'Add New Invitees'} />
    )
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
              My Start Address Or Postcode:
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
              Event Date:
            </label>
            <Input type="date" name="date" onChange={this.handleChange} />
          </Form.Field>
          <Form.Field required width="six">
            <label>
              <Icon name="clock outline" color="orange" />
              Event Time:
            </label>
            <Input type="time" name="time" onChange={this.handleChange} />
          </Form.Field>
          <Form.Field>
            <label>
              <Icon name="users" color="orange" />
              Previous Invitees:
            </label>
            {contacts.length === 0 && <div>No contacts</div>}
            {contacts.map(contact => (
              <Checkbox
                label={
                  ' ' + contact.first_name + ' ' + contact.last_name + '   '
                }
                id={contact.email}
                key={contact.id}
                onChange={this.handleInvitee}
              />
            ))}
          </Form.Field>
          <Form.Field>
            <label>
              <Icon name="users" color="green" />
              New Invitee(s):
            </label>
          </Form.Field>
          <List>{this.displayNewInviteesList()}</List>
          <Input
            type="text"
            name="newInvitees"
            value={this.state.newInviteeEmail}
            onChange={this.handleNewInvitees}
          />

          <Button type="submit" secondary onClick={this.createNewInvitees}>
            Invite
          </Button>
          <Button type="submit" primary onClick={this.handleSubmit}>
            Create New Event
          </Button>
        </Form>
      </Card.Group>
    )
  }
}

export default Create
