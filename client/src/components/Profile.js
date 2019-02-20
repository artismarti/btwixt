import React from 'react'
import { Button, Card } from 'semantic-ui-react'

import API from '../API'

class Profile extends React.Component {
  state = {
    modalOpen: false,
  }

  render() {
    const { meeting, email } = this.props
    let myMeetings = meeting.users.find(u => u.email === email)

    return (
      <React.Fragment>
        <Card color="blue" key={meeting.id}>
          Hello
        </Card>
      </React.Fragment>
    )
  }
}

export default Profile
