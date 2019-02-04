import React from 'react'
import { Card, Image, Icon } from 'semantic-ui-react'
import moment from 'moment'

class Meeting extends React.Component {
  getMap = (lat, lng) => {
    return `https://image.maps.api.here.com/mia/1.6/mapview?app_id=EUNJEIDbEAKKaUz5IRBj&app_code=nI-30KLhGkA-zFavU7hhYw&lat=${lat}&lon=${lng}&vt=0&z=14`
  }
  iconSelector = status => {
    switch (status) {
      case 'invited':
        return <Icon name="help circle" color="grey" />
        break
      case 'accepted':
        return <Icon name="thumbs up outline" color="green" />
        break
      case 'declined':
        return <Icon name="thumbs down outline" color="red" />
        break
      default:
        return <Icon name="help" color="red" />
    }
  }
  render() {
    const { meeting, email } = this.props

    return (
      <React.Fragment>
        <Card color="orange" key={meeting.id}>
          <Card.Content>
            <Card.Header>
              {meeting.title}:{' '}
              {moment(meeting.date_time).format('MMMM Do YYYY, HH:mm')}
            </Card.Header>
            <ul>
              Invitees:
              {meeting.users
                .filter(u => u.email !== email)
                .map(u => (
                  <p key={u.id}>
                    {this.iconSelector(u.user_status)}
                    {u.first_name} {u.last_name}: {u.start_address}
                  </p>
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
