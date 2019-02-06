import React from 'react'
import { Label, Segment, List } from 'semantic-ui-react'

class Venues extends React.Component {
  render() {
    const { venues } = this.props
    return (
      <Segment raised>
        <List>
          <Label attached="top" color="blue">
            Venues:
          </Label>
          {venues.map(v => (
            <List.Item key={v.id}>{v.name}</List.Item>
          ))}
        </List>
      </Segment>
    )
  }
}

export default Venues
