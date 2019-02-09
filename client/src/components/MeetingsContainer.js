import React from 'react'
import Meeting from './Meeting'
import { Container, Card } from 'semantic-ui-react'

class MeetingsContainer extends React.Component {
  state = {
    meetingStatus: this.props.meetingStatus,
    dateFilter: false,
    allMeetings: this.props.meetings,
  }

  componentDidMount() {
    // if a user is not signed in, redirect to sign in
    const { email, history } = this.props
    if (!email) {
      return history.push('/signin')
    }
  }

  renderMeetings = () => {
    const { email, meetingStatus, updateStateOfMeetings } = this.props
    let filteredMeetings = []
    const { meetings } = this.props
    if (meetingStatus !== '') {
      filteredMeetings = meetings
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
      />
    ))
  }

  render() {
    const { meetings } = this.props
    return (
      <Container fluid>
        <Card.Group stackable centered>
          {meetings.length === 0 && (
            <div>
              <p>No meetings yet.</p> <button>Create one?</button>
            </div>
          )}

          {meetings && this.renderMeetings()}
        </Card.Group>
      </Container>
    )
  }
}
export default MeetingsContainer
