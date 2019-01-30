import React from 'react'
import Meeting from './Meeting'

import API from '../API'

class MeetingsContainer extends React.Component {
  state = {
    meetings: [],
  }

  getMeetings() {
    API.getMeetings().then(meetings => meetings && this.setState({ meetings }))
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
      <div style={this.style} className="user-list">
        {meetings.length === 0 && (
          <div>
            <p>No meetings yet.</p> <button>Create one?</button>
          </div>
        )}
        {meetings.map(meeting => (
          <div>
            <h3>Here are your meetings:</h3>
            <Meeting key={meeting.id} meeting={meeting} />
          </div>
        ))}
      </div>
    )
  }
}
export default MeetingsContainer
