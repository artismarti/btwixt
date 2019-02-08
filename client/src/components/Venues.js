import React from 'react'

import { Label, List, Button, Popup, Segment } from 'semantic-ui-react'

class Venues extends React.Component {
  render() {
    const { venues } = this.props
    return (
      <Segment>
        <Popup
          trigger={
            <Button fluid color="blue">
              View Suggested Venues
            </Button>
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
      </Segment>
    )
  }
}

export default Venues
