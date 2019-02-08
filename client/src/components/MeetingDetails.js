import React from 'react'
import moment from 'moment'
import { Label, Segment, Button } from 'semantic-ui-react'

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

        <p>
          Start Location:{' '}
          <Button basic color="green" icon="edit" onClick={addressChange} />
          {myAddress}
        </p>

        <p>Meeting Location: {midpoint}</p>
      </Segment>
    )
  }
}

export default MeetingDetails
