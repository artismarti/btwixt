import React from 'react'

import { Label, List, Message, Popup } from 'semantic-ui-react'

class Venues extends React.Component {
  render() {
    const { venues } = this.props
    return (
      <Popup
        trigger={
          <Message
            size="mini"
            fluid
            icon="food"
            header="Suggested Venues"
            info
          />
        }
        flowing
        hoverable
      >
        <List>
          <Label attached="top" color="blue">
            Venues:
          </Label>
          {venues.map(v => (
            <List.Item key={v.id}>{v.name}</List.Item>
          ))}
        </List>
      </Popup>
    )
  }
}

export default Venues
