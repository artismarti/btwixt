import React from 'react'
import moment from 'moment'

const APP_ID = process.env.REACT_APP_HERE_APP_ID
const APP_CODE = process.env.REACT_APP_HERE_APP_CODE

class MeetingDetails extends React.Component {
  getMap = (lat, lng) => {
    return `https://image.maps.api.here.com/mia/1.6/mapview?app_id=${APP_ID}&app_code=${APP_CODE}&lat=${lat}&lon=${lng}&vt=0&z=14&t=13&ppi=300&w=600
&h=500`
  }

  render() {
    const {
      title,
      date,
      midpoint,
      midpointLatitude,
      midpointLongitude,
    } = this.props
    return (
      <div className={'location_details'}>
        <div className={'location_details__title'}>
          <p>{`${title.toUpperCase()} : ${moment(date).format(
            'MMMM Do, HH:mm'
          )}`}</p>
        </div>
        {/* <div className={'location_details__title__label'}>
          {moment(date)
            .endOf('day')
            .fromNow()}
        </div> */}
        <div className={'map_wrapper'}>
          <a
            href={`https://www.google.co.uk/maps/search/${midpoint}`}
            target="_blank"
          >
            <img src={this.getMap(midpointLatitude, midpointLongitude)} />
          </a>
        </div>
      </div>
    )
  }
}

export default MeetingDetails
