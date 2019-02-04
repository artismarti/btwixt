import React from 'react'
import { Card, Image, Icon, Button } from 'semantic-ui-react'
import moment from 'moment'

class Meeting extends React.Component {
  getMap = (lat, lng) => {
    return `https://image.maps.api.here.com/mia/1.6/mapview?app_id=***REMOVED***&app_code=***REMOVED***&lat=${lat}&lon=${lng}&vt=0&z=14`
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
      case 'created':
        return <Icon name="user circle" color="blue" />
        break
      default:
        return <Icon name="help" color="red" />
    }
  }
  handleAccept = () => {
    alert('hi')
  }
  render() {
    const { meeting, email } = this.props

    return (
      <React.Fragment>
        <Card color="orange" key={meeting.id}>
          <Card.Content>
            <Card.Header>
              {meeting.title}:
              {moment(meeting.date_time)
                .endOf('day')
                .fromNow()}
            </Card.Header>
            <Card.Description>
              {moment(meeting.date_time).format('MMMM Do YYYY, HH:mm')}
            </Card.Description>
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
          <Button.Group>
            <Button positive onClick={this.handleAccept}>
              Accept
            </Button>
            <Button.Or />
            <Button negative>Decline</Button>
          </Button.Group>
          <Button color="orange">Update Start Location</Button>
          <Image
            src={this.getMap(
              meeting.midpoint_latitude,
              meeting.midpoint_longitude
            )}
            as="a"
            size="medium"
            href="http://google.com"
            target="_blank"
            centered
            bordered
          />
        </Card>
      </React.Fragment>
    )
  }
}

export default Meeting
