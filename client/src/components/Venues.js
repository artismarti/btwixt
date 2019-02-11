import React from 'react'

import { Label, List, Message, Popup } from 'semantic-ui-react'

class Venues extends React.Component {
  render() {
    const { venues } = this.props
    return (
      <Popup
        trigger={
          <Message size="mini" icon="food" header="Suggested Venues" info />
        }
        flowing
        hoverable
      >
        <List>
          <Label attached="top" color="blue">
            Venues:
          </Label>
          {venues.map(v => (
            <List.Item key={v.id}>
              <a
                href={`https://www.google.co.uk/maps/search/${v.name}+${
                  v.address
                }`}
              >
                {v.name}
              </a>
            </List.Item>
          ))}
        </List>
      </Popup>
    )
  }
}

export default Venues
