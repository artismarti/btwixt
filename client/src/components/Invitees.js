import React from 'react'

class Invitees extends React.Component {
  clickViewHandler = event => {
    const formEl = event.target.parentNode.parentNode.querySelector(
      '.invitees__table'
    )
    formEl.classList.toggle('visible')
  }

  iconSelector = status => {
    let imgUrl = ''
    switch (status) {
      case 'invited':
        return (
          <img
            src={require('../images/pending.svg')}
            alt="Pending icon."
            className={'status__image_wrapper'}
          />
        )
        break
      case 'accepted':
        return (
          <img
            src={require('../images/accepted.svg')}
            alt="Accepted icon."
            className={'status__image_wrapper'}
          />
        )
        break
      case 'declined':
        return (
          <img
            src={require('../images/declined.svg')}
            alt="Declined icon."
            className={'status__image_wrapper'}
          />
        )
        break
      case 'created':
        return (
          <img
            src={require('../images/crown.svg')}
            alt="Creator icon."
            className={'status__image_wrapper'}
          />
        )
        break
      default:
        return (
          <img
            src={require('../images/pending.svg')}
            alt="Venue upvote icon."
            className={'status__image_wrapper'}
          />
        )
    }

    return imgUrl
  }
  render() {
    const { guests, email } = this.props
    return (
      <div className={'info_card invitees'}>
        <div className={'info_card__header'}>
          <div
            className={'info_card__header__image_wrapper'}
            onClick={this.clickViewHandler}
          >
            <img src={require('../images/invitees.svg')} alt="Invitees icon." />
          </div>
          <p className={'view-invitees'} onClick={this.clickViewHandler}>
            View Invitees:
          </p>
        </div>
        <div className={'invitees__table'}>
          <div className={'invitees__table__header'}>
            <div className={'invitee_cell'} />
            <div className={'invitee_cell'}>Name</div>
            <div className={'invitee_cell'}>Start Address</div>
          </div>
          <div className={'invitees__table__body'}>
            {guests
              .filter(g => g.email !== email)
              .map(g => (
                <div className={'invitee_row'} key={g.id}>
                  <div className={'invitee_cell'}>
                    {this.iconSelector(g.user_status)}

                    {g.user_status}
                  </div>
                  <div className={'invitee_cell'}>
                    {g.first_name ? `${g.first_name} ${g.last_name}` : g.email}
                  </div>
                  <div className={'invitee_cell'}>{g.start_address}</div>
                </div>
              ))}
          </div>
        </div>
      </div>
    )
  }
}

export default Invitees
