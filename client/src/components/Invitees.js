import React from 'react'
import { Label, List, Button, Popup, Segment } from 'semantic-ui-react'

class Invitees extends React.Component {
  iconSelector = status => {
    switch (status) {
      case 'invited':
        return <List.Icon name="help circle" color="grey" />
        break
      case 'accepted':
        return <List.Icon name="thumbs up outline" color="green" />
        break
      case 'declined':
        return <List.Icon name="thumbs down outline" color="red" />
        break
      case 'created':
        return <List.Icon name="user circle" color="blue" />
        break
      default:
        return <List.Icon name="help" color="red" />
    }
  }
  render() {
    const { guests, email } = this.props
    return (
      <Segment>
        <Popup
          trigger={
            <Button fluid color="olive">
              View Invitees
            </Button>
          }
          flowing
          hoverable
        >
          <List>
            <Label attached="top" color="olive">
              Invitees:
            </Label>
            {guests
              .filter(g => g.email !== email)
              .map(g => (
                <List.Item key={g.id}>
                  {this.iconSelector(g.user_status)}
                  {g.first_name} {g.last_name}: {g.start_address}
                </List.Item>
              ))}
          </List>
        </Popup>
      </Segment>
    )
  }
}

export default Invitees
