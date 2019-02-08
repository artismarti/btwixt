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
import MeetingDetails from './MeetingDetails'
import Invitees from './Invitees'
import Venues from './Venues'

class Meeting extends React.Component {
  state = {
    modalOpen: false,
    updatedAddress: '',
    myInviteStatus: '',
  }

  handleUpdateAddress = e => {
    this.setState({ updatedAddress: e.target.value })
  }

  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })

  getMap = (lat, lng) => {
    return `https://image.maps.api.here.com/mia/1.6/mapview?app_id=EUNJEIDbEAKKaUz5IRBj&app_code=nI-30KLhGkA-zFavU7hhYw&lat=${lat}&lon=${lng}&vt=0&z=12&t=13&ppi=300&w=300
&h=170`
  }

  handleAcceptDecline = decision => {
    const { meeting } = this.props
    let inviteeDecision = {
      meeting: meeting.id,
      decision,
    }
    API.updateInviteeStatus(inviteeDecision)
    this.setState({ myInviteStatus: decision })
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
      .then(response => response.json())
      .then(meetings => this.props.updateStateOfMeetings(meetings))
  }

  showMeetingButtons = () => {
    const { meeting } = this.props
    return (
      <Button.Group>
        {meeting.my_status === 'accepted' && (
          <Button
            color="orange"
            onClick={() => this.handleAcceptDecline('declined')}
          >
            Decline
          </Button>
        )}

        {meeting.my_status === 'declined' && (
          <Button positive onClick={() => this.handleAcceptDecline('accepted')}>
            Accept
          </Button>
        )}

        {meeting.my_status === 'invited' && (
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

        {meeting.my_status === 'created' && (
          <Button negative onClick={this.deleteMeeting}>
            Delete Event
          </Button>
        )}
      </Button.Group>
    )
  }
  render() {
    const { meeting, email } = this.props
    let myMeetings = meeting.users.find(u => u.email === email)

    return (
      <React.Fragment>
        <Card color="blue" key={meeting.id}>
          <MeetingDetails
            key={`${meeting.id}_md`}
            title={meeting.title}
            date={meeting.date_time}
            myAddress={myMeetings.start_address}
            midpoint={meeting.meeting_address}
            addressChange={this.handleOpen}
          />
          <Card.Content>
            <Invitees email={email} guests={meeting.users} />
            <Venues venues={meeting.venues} />
          </Card.Content>

          {this.showMeetingButtons()}

          <Modal
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
