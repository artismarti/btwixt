import React from 'react'
import moment from 'moment'
// import {
//   Label,
//   Segment,
//   Icon,
//   Message,
//   Image,
//   Popup,
//   Button,
//   Input,
//   Divider,
// } from 'semantic-ui-react'

// import API from '../API'
const APP_ID = process.env.REACT_APP_HERE_APP_ID
const APP_CODE = process.env.REACT_APP_HERE_APP_CODE

class MeetingDetails extends React.Component {
  // state = {
  //   updatedAddress: '',
  // }
  getMap = (lat, lng) => {
    return `https://image.maps.api.here.com/mia/1.6/mapview?app_id=${APP_ID}&app_code=${APP_CODE}&lat=${lat}&lon=${lng}&vt=0&z=14&t=13&ppi=300&w=600
&h=600`
  }

  // handleUpdateAddress = e => {
  //   this.setState({ updatedAddress: e.target.value })
  // }

  // handleChangeLocation = () => {
  //   const { id } = this.props
  //   let locationDetails = {
  //     meeting: id,
  //     startLocation: this.state.updatedAddress,
  //   }
  //   API.changeMidpoint(locationDetails)
  //     .then(response => response.json())
  //     .then(meetings => this.props.updateStateOfMeetings(meetings))
  // }

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

//   < Segment >
//   <Label attached="top" color="black">
//     {title.toUpperCase()}
//     {': '}
//     {`${moment(date).format('MMMM Do, HH:mm')}`}
//   </Label>
//   <Label as="a" color="green" ribbon>
//     {moment(date)
//       .endOf('day')
//       .fromNow()}
//   </Label>
//   <Divider hidden />
//         bTwixt Suggested Location: { '     ' }
// <Label color="black">
//   <a
//     href={`https://www.google.co.uk/maps/search/${midpoint}`}
//     target="_blank"
//   >
//     {midpoint}
//   </a>
// </Label>
//   <Image
//     src={this.getMap(midpointLatitude, midpointLongitude)}
//     as="a"
//     size="medium"
//     href={`https://www.google.co.uk/maps/search/${midpoint}`}
//     target="_blank"
//     centered
//     bordered
//   />
//   <Popup
//     trigger={
//       <Message
//         info
//         size="mini"
//         icon="edit"
//         onClick={addressChange}
//         header="My Start Location:"
//         content=<a
//           href={`https://www.google.co.uk/maps/search/${myAddress}`}
//           target="_blank"
//         >
//         {myAddress}
//       </a>
//             />
//           }
//     flowing
//     hoverable
//   >
//     <Input
//       type="text"
//       onChange={this.handleUpdateAddress}
//       placeholder={myAddress}
//     />
//     <Button color="green" onClick={this.handleChangeLocation} inverted>
//       <Icon name="checkmark" /> Change Address
//           </Button>
//   </Popup>
//       </Segment >
