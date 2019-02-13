import React from 'react'
import Meeting from './Meeting'
// import { Container, Card } from 'semantic-ui-react'
import './MeetingsContainer.css'

class MeetingsContainer extends React.Component {
  state = {
    meetingStatus: this.props.meetingStatus,
    dateFilter: false,
    allMeetings: this.props.meetings,
    deletedMeetingID: '',
  }

  componentDidMount() {
    // if a user is not signed in, redirect to sign in
    const { email, history } = this.props
    if (!email) {
      return history.push('/signin')
    }
  }

  refreshOnDelete = id => {
    let allMeetings = this.state.allMeetings
    allMeetings = allMeetings.filter(m => m.id !== id)
    this.setState({ allMeetings })
    this.setState({ deletedMeetingID: id })
  }

  renderMeetings = () => {
    const { email, meetingStatus, updateStateOfMeetings } = this.props
    let filteredMeetings = []
    const { meetings } = this.props
    if (meetingStatus !== '') {
      filteredMeetings = this.state.allMeetings
        .filter(m => m.my_status === meetingStatus)
        .map(meeting => meeting)
    } else if (meetingStatus === '') {
      filteredMeetings = this.state.allMeetings
    } else {
      filteredMeetings = this.props.showUpcomingMeetings()
    }

    return filteredMeetings.map(meeting => (
      <Meeting
        key={meeting.id}
        meeting={meeting}
        email={email}
        updateStateOfMeetings={updateStateOfMeetings}
        refreshOnDelete={this.refreshOnDelete}
      />
    ))
  }

  render() {
    const { meetings } = this.props
    return (
      <div className={'meeting_cards'}>
        {meetings.length === 0 && (
          <div>
            <p>No meetings yet.</p> <button>Create one?</button>
          </div>
        )}
        {meetings && this.renderMeetings()}
      </div>
    )
  }
}
export default MeetingsContainer
