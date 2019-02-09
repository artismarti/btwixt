import React from 'react'
import moment from 'moment'
import { Label, Segment, Divider, Icon, Message } from 'semantic-ui-react'

class MeetingDetails extends React.Component {
  render() {
    const { title, date, myAddress, midpoint, addressChange } = this.props
    return (
      <Segment>
        <Label attached="top" color="black">
          {title.toUpperCase()}
          {': '}
          {`${moment(date).format('MMMM Do, HH:mm')}`}
        </Label>
        <Label as="a" color="green" ribbon>
          {moment(date)
            .endOf('day')
            .fromNow()}
        </Label>
        <Message
          fluid
          info
          size="mini"
          icon="edit"
          onClick={addressChange}
          header="My Start Location:"
          content=<a
            href={`https://www.google.co.uk/maps/search/${myAddress}`}
            target="_blank"
          >
            {myAddress}
          </a>
        />

        <p>
          bTwixt Suggested Location:{' '}
          <Label color="teal">
            <a
              href={`https://www.google.co.uk/maps/search/${midpoint}`}
              target="_blank"
            >
              {midpoint}
            </a>
          </Label>
        </p>
      </Segment>
    )
  }
}

export default MeetingDetails
