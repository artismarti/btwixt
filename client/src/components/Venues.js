import React from 'react'

class Venues extends React.Component {
  clickViewHandler = event => {
    const formEl = event.target.parentNode.parentNode.querySelector(
      '.venues__table'
    )
    formEl.classList.toggle('visible')
  }
  render() {
    const { venues } = this.props
    return (
      <div className={'info_card venues'}>
        <div className={'info_card__header'}>
          <div
            className={'info_card__header__image_wrapper'}
            onClick={this.clickViewHandler}
          >
            <img src={require('../images/venues.svg')} />
          </div>
          <p onClick={this.clickViewHandler}>View Venues:</p>
        </div>
        <div className={'venues__table'}>
          {venues.map(v => (
            <div className={'venues__row'} key={v.id}>
              <div className={'venues__row__title'}>
                <a
                  href={`https://www.google.co.uk/maps/search/${v.name}+${
                    v.address
                  }`}
                >
                  {v.name}
                </a>
              </div>
              <div className={'venues__row__vote'}>
                <p className={'venues__downvote'}>
                  1
                  <img src="#" />
                </p>
                <p className={'venues__upvote'}>
                  2
                  <img src="#" />
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default Venues
