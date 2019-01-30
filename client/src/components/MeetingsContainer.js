import React from 'react'
import Meeting from './Meeting'
import { Container } from 'semantic-ui-react'

import API from '../API'

class MeetingsContainer extends React.Component {
  state = {
    meetings: [],
  }

  getMeetings() {
    API.getMeetings().then(data => this.createMeetingObject(data))
  }

  createMeetingObject = data => {
    let meetings = data.map(d => {
      d.meeting.users = d.users
      d.meeting.userMeetings = d.user_meetings
      return d.meeting
    })
    this.setState({ meetings: [...meetings] })
  }

  componentDidMount() {
    // if a user is not signed in, redirect to sign in
    const { email, history } = this.props
    if (!email) {
      history.push('/signin')
    } else {
      this.getMeetings()
    }
  }
  render() {
    const { meetings } = this.state

    return (
      <Container fluid>
        <div style={this.style} className="user-list">
          {meetings.length === 0 && (
            <div>
              <p>No meetings yet.</p> <button>Create one?</button>
            </div>
          )}
          {meetings.map(meeting => (
            <Meeting key={meeting.id} meeting={meeting} />
          ))}
        </div>
      </Container>
    )
  }
}
export default MeetingsContainer
