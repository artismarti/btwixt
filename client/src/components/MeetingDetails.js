import React from 'react'
import moment from 'moment'
import { Label, Segment } from 'semantic-ui-react'

class MeetingDetails extends React.Component {
  render() {
    const { title, date, myAddress, midpoint } = this.props
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
        <p>My Start Location: {myAddress}</p>
        <p>Meeting Location: {midpoint}</p>
      </Segment>
    )
  }
}

export default MeetingDetails
