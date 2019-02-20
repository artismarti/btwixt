import React from 'react'
import './Meeting.css'

import API from '../API'
import MeetingDetails from './MeetingDetails'
import SuggestedLocation from './SuggestedLocation/SuggestedLocation'
import EditStartLocation from './EditStartLocation/EditStartLocation'
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
      <div className={'submit_card_btn'}>
        {this.state.myInviteStatus === 'accepted' && (
          <button
            onClick={() => this.handleAcceptDecline('declined')}
            className="meeting_button_warning"
          >
            Decline
          </button>
        )}

        {this.state.myInviteStatus === 'declined' && (
          <button
            onClick={() => this.handleAcceptDecline('accepted')}
            className="meeting_button_positive"
          >
            Accept
          </button>
        )}

        {this.state.myInviteStatus === 'invited' && (
          <React.Fragment>
            <button
              onClick={() => this.handleAcceptDecline('accepted')}
              className="meeting_button_positive"
            >
              Accept
            </button>
            or
            <button
              onClick={() => this.handleAcceptDecline('declined')}
              className="meeting_button_warning"
            >
              Decline
            </button>
          </React.Fragment>
        )}

        {this.state.myInviteStatus === 'created' && (
          <button
            onClick={this.deleteMeeting}
            className="meeting_button_negative"
          >
            Delete Event
          </button>
        )}
      </div>
    )
  }
  render() {
    const { meeting, email } = this.props
    let myMeetings = meeting.users.find(u => u.email === email) || []

    return (
      <div className={'meeting_card'}>
        <MeetingDetails
          key={`${meeting.id}_md`}
          title={meeting.title}
          date={meeting.date_time}
          midpointLatitude={meeting.midpoint_latitude}
          midpointLongitude={meeting.midpoint_longitude}
          midpoint={meeting.meeting_address}
        />
        <div className={'card_content'}>
          <SuggestedLocation midpoint={meeting.meeting_address} />
          <EditStartLocation
            updateStateOfMeetings={this.props.updateStateOfMeetings}
            id={meeting.id}
            myAddress={myMeetings.start_address}
          />
          <Invitees email={email} guests={meeting.users} />

          <Venues venues={meeting.venues} />
        </div>

        {this.showMeetingButtons()}
      </div>
    )
  }
}

export default Meeting
