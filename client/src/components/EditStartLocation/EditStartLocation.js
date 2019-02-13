import React from 'react'
import API from '../../API'

export default class SuggestedLocation extends React.Component {
  state = {
    updatedAddress: '',
  }

  componentDidMount() {
    this.setState({ updatedAddress: this.props.myAddress })
  }

  handleUpdateAddress = e => {
    this.setState({ updatedAddress: e.target.value })
  }

  handleChangeLocation = event => {
    // event.preventDefault()
    const formEl = event.target.parentNode
    formEl.classList.remove('visible')
    let locationDetails = {
      meeting: this.props.id,
      startLocation: this.state.updatedAddress,
    }
    API.changeMidpoint(locationDetails)
      .then(response => response.json())
      .then(meetings => this.props.updateStateOfMeetings(meetings))
  }

  clickEditHandler = event => {
    const formEl = event.target.parentNode.parentNode.querySelector(
      '.edit_form'
    )
    formEl.classList.toggle('visible')

    // console.log(formElHeight)
  }

  render() {
    return (
      <div className={'info_card edit_start_location'}>
        <p>Your Start Location:</p>
        <div className={'info_card__header'}>
          <div
            className={'info_card__header__image_wrapper'}
            onClick={this.clickEditHandler}
          >
            <img
              src={require('../../images/edit.svg')}
              alt="Start Location icon."
            />
          </div>
          <p>{this.props.myAddress}</p>
        </div>
        <div className={'edit_form'}>
          <input
            type="text"
            onChange={this.handleUpdateAddress}
            value={this.state.updatedAddress}
          />
          <button onClick={this.handleChangeLocation}>Change Address</button>
        </div>
      </div>
    )
  }
}
