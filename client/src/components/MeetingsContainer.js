import React from 'react'
import Meeting from './Meeting'
import { Link } from 'react-router-dom'
import { Container, Button, Card } from 'semantic-ui-react'

import API from '../API'

class MeetingsContainer extends React.Component {
  state = {
    meetings: [],
  }

  getMeetings() {
    // API.getMeetings().then(data => console.log(data))
    API.getMeetings().then(data => {
      this.setState({ meetings: data })
    })
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
    const { email } = this.props

    return (
      <Container fluid>
        <Link to="/create">
          <Button positive>Create new meeting</Button>
        </Link>
        <Card.Group stackable centered>
          {meetings.length === 0 && (
            <div>
              <p>No meetings yet.</p> <button>Create one?</button>
            </div>
          )}
          {meetings.map(meeting => (
            <Meeting key={meeting.id} meeting={meeting} email={email} />
          ))}
        </Card.Group>
      </Container>
    )
  }
}
export default MeetingsContainer
