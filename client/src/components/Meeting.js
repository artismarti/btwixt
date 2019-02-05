import moment from 'moment'
import React from 'react'
import {
  Button,
  Card,
  Header,
  Icon,
  Image,
  Input,
  Modal,
} from 'semantic-ui-react'

import API from '../API'
import Invitees from './Invitees'
import Venues from './Venues'

class Meeting extends React.Component {
  state = {
    modalOpen: false,
    updatedAddress: '',
  }
  handleUpdateAddress = e => {
    this.setState({ updatedAddress: e.target.value })
  }

  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })

  getMap = (lat, lng) => {
    return `https://image.maps.api.here.com/mia/1.6/mapview?app_id=EUNJEIDbEAKKaUz5IRBj&app_code=nI-30KLhGkA-zFavU7hhYw&lat=${lat}&lon=${lng}&vt=0&z=14`
  }

  handleAcceptDecline = decision => {
    const { meeting } = this.props
    let inviteeDecision = {
      meeting: meeting.id,
      decision,
    }
    API.updateInviteeStatus(inviteeDecision)
  }

  deleteMeeting = () => {
    const { meeting } = this.props
    let meetingToDelete = {
      meeting: meeting.id,
    }
    API.delete(meetingToDelete)
  }

  handleChangeLocation = () => {
    this.handleClose()
    const { meeting } = this.props
    let locationDetails = {
      meeting: meeting.id,
      startLocation: this.state.updatedAddress,
    }
    API.changeMidpoint(locationDetails)
  }

  showMeetingButtons = () => {
    const { meeting, email } = this.props
    const myMeetings = meeting.users.find(u => u.email === email)
    if (myMeetings) {
      const createdEvent = myMeetings.user_status === 'created'
      const acceptedInvite = myMeetings.user_status === 'accepted'
      const declinedInvite = myMeetings.user_status === 'declined'
      const pendingInvite = myMeetings.user_status === 'invited'

      return (
        <Button.Group>
          {acceptedInvite && (
            <Button
              color="orange"
              onClick={() => this.handleAcceptDecline('declined')}
            >
              Decline
            </Button>
          )}

          {declinedInvite && (
            <Button
              positive
              onClick={() => this.handleAcceptDecline('accepted')}
            >
              Accept
            </Button>
          )}

          {pendingInvite && (
            <React.Fragment>
              <Button
                positive
                onClick={() => this.handleAcceptDecline('accepted')}
              >
                Accept
              </Button>
              <Button.Or />
              <Button
                negative
                color="orange"
                onClick={() => this.handleAcceptDecline('declined')}
              >
                Decline
              </Button>
            </React.Fragment>
          )}

          {createdEvent && (
            <Button negative onClick={this.deleteMeeting}>
              Delete Event
            </Button>
          )}
        </Button.Group>
      )
    }
  }
  render() {
    const { meeting, email } = this.props
    let myMeetings = meeting.users.find(u => u.email === email)

    return (
      <React.Fragment>
        <Card color="blue" key={meeting.id}>
          <Card.Content>
            <Card.Header>
              {meeting.title}:
              {moment(meeting.date_time)
                .endOf('day')
                .fromNow()}
            </Card.Header>
            <Card.Description>
              <p>
                Date: {moment(meeting.date_time).format('MMMM Do YYYY, HH:mm')}
              </p>

              <p>
                My Start Location:
                {myMeetings && myMeetings.start_address}
              </p>
              <p>
                Central Location:
                {meeting.meeting_address}
              </p>
            </Card.Description>
            <Invitees email={email} guests={meeting.users} />
            <Venues venues={meeting.venues} />
            Suggested Venues:
            {meeting.venues.map(v => (
              <p key={v.id}>{v.name}</p>
            ))}
          </Card.Content>

          {this.showMeetingButtons()}
          <Modal
            trigger={
              <Button color="blue" onClick={this.handleOpen}>
                Update Start Location
              </Button>
            }
            open={this.state.modalOpen}
            onClose={this.handleClose}
            basic
            size="small"
          >
            <Header icon="map" content="Enter New Start Address" />
            <Modal.Actions>
              <Input
                type="text"
                onChange={this.handleUpdateAddress}
                placeholder="Postcode or Address"
              />
              <Button color="red" onClick={this.handleClose} inverted>
                <Icon name="close" /> Cancel
              </Button>
              <Button
                color="green"
                onClick={this.handleChangeLocation}
                inverted
              >
                <Icon name="checkmark" /> Change Address
              </Button>
            </Modal.Actions>
          </Modal>
          <Image
            src={this.getMap(
              meeting.midpoint_latitude,
              meeting.midpoint_longitude
            )}
            as="a"
            size="medium"
            href="http://google.com"
            target="_blank"
            centered
            bordered
          />
        </Card>
      </React.Fragment>
    )
  }
}

export default Meeting
