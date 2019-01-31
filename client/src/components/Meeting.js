import React from 'react'
import { Card, Image } from 'semantic-ui-react'

class Meeting extends React.Component {
  getMap = (lat, lng) => {
    return `https://image.maps.api.here.com/mia/1.6/mapview?app_id=EUNJEIDbEAKKaUz5IRBj&app_code=nI-30KLhGkA-zFavU7hhYw&lat=${lat}&lon=${lng}&vt=0&z=14`
  }

  render() {
    const { meeting } = this.props

    return (
      <React.Fragment>
        <Card color="orange">
          <Card.Content>
            <Card.Header>{/* {meeting} */}</Card.Header>
            <ul>Invitees:</ul>
            <ul>Start Address:</ul>
          </Card.Content>
          <Image
            src={this
              .getMap
              // meeting.midpoint_latitude,
              // meeting.midpoint_longitude
              ()}
          />
        </Card>
      </React.Fragment>
    )
  }
}

export default Meeting
