import React from 'react'
import { List, Message, Popup, Table } from 'semantic-ui-react'

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
      <Popup
        trigger={
          <Message size="mini" icon="users" header="View Invitees" info />
        }
        flowing
        hoverable
      >
        <Table celled stackable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Status</Table.HeaderCell>
              <Table.HeaderCell>Name or Email</Table.HeaderCell>
              <Table.HeaderCell>Start Address</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {guests
              .filter(g => g.email !== email)
              .map(g => (
                <Table.Row key={g.id}>
                  <Table.Cell>{this.iconSelector(g.user_status)}</Table.Cell>
                  <Table.Cell>
                    {g.first_name ? `${g.first_name} ${g.last_name}` : g.email}
                  </Table.Cell>
                  <Table.Cell>{g.start_address}</Table.Cell>
                </Table.Row>
              ))}
          </Table.Body>
        </Table>
      </Popup>
    )
  }
}

export default Invitees
