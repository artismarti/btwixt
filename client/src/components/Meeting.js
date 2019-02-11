import React from 'react'
import { Button, Card } from 'semantic-ui-react'

import API from '../API'
import MeetingDetails from './MeetingDetails'
import Invitees from './Invitees'
import Venues from './Venues'

class Meeting extends React.Component {
  state = {
    updatedAddress: '',
    myInviteStatus: this.props.meeting.my_status,
  }

  handleAcceptDecline = decision => {
    console.log('accept/decline')

    const { meeting } = this.props
    let inviteeDecision = {
      meeting: meeting.id,
      decision,
    }
    API.updateInviteeStatus(inviteeDecision)
    this.setState({ myInviteStatus: decision })
  }

  deleteMeeting = () => {
    const { meeting, refreshOnDelete } = this.props
    let meetingToDelete = {
      meeting: meeting.id,
    }
    refreshOnDelete(meeting.id)
    API.delete(meetingToDelete)
  }

  showMeetingButtons = () => {
    return (
      <Button.Group>
        {this.state.myInviteStatus === 'accepted' && (
          <Button
            color="orange"
            onClick={() => this.handleAcceptDecline('declined')}
          >
            Decline
          </Button>
        )}

        {this.state.myInviteStatus === 'declined' && (
          <Button positive onClick={() => this.handleAcceptDecline('accepted')}>
            Accept
          </Button>
        )}

        {this.state.myInviteStatus === 'invited' && (
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

        {this.state.myInviteStatus === 'created' && (
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
            id={meeting.id}
            title={meeting.title}
            date={meeting.date_time}
            myAddress={myMeetings.start_address}
            midpoint={meeting.meeting_address}
            midpointLatitude={meeting.midpoint_latitude}
            midpointLongitude={meeting.midpoint_longitude}
            updateStateOfMeetings={this.props.updateStateOfMeetings}
          />
          <Card.Content>
            <Invitees email={email} guests={meeting.users} />

            <Venues venues={meeting.venues} />
          </Card.Content>

          {this.showMeetingButtons()}
        </Card>
      </React.Fragment>
    )
  }
}

export default Meeting
