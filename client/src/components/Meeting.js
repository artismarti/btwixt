import React from 'react'
import { Card, Image } from 'semantic-ui-react'

class Meeting extends React.Component {
  state = { expanded: false }

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }))
  }

  getMap = (lat, lng) => {
    return `https://image.maps.api.here.com/mia/1.6/mapview?app_id=EUNJEIDbEAKKaUz5IRBj&app_code=nI-30KLhGkA-zFavU7hhYw&lat=${lat}&lon=${lng}&vt=0&z=14`
  }

  render() {
    const { meeting, classes } = this.props

    return (
      <React.Fragment>
        <Card color="orange">
          <Card.Content>
            <Card.Header>
              {meeting.title}: {meeting.date_time}
            </Card.Header>
            <ul>
              Invitees:
              {meeting.users.map(u => (
                <li key={`${u.id}_user`}>
                  {u.first_name} {u.last_name}
                </li>
              ))}
            </ul>
            <ul>
              Start Address:
              {meeting.userMeetings.map(um => (
                <li key={um.id}>{um.start_address}</li>
              ))}
            </ul>
          </Card.Content>
          <Image
            src={this.getMap(
              meeting.midpoint_latitude,
              meeting.midpoint_longitude
            )}
          />
        </Card>
      </React.Fragment>
    )
  }
}

export default Meeting
