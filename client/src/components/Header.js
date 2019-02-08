import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'semantic-ui-react'

class Header extends Component {
  state = {
    dateFilter: false,
  }
  handleClick = status => {
    this.props.meetingStatus(status)
  }
  handleUpcoming = filter => {
    this.props.toggleUpcomingMeetingsState(!filter)
    this.setState({ dateFilter: !filter })
  }

  render() {
    const { email, signout } = this.props
    return (
      <header className="App-header">
        <h1 className="App-title">
          {email ? `Welcome back, ${email}` : `Welcome to Meetr.`}
          <br />
          {email ? (
            <>
              <button onClick={signout}>SIGN OUT</button>
              <Link to="/create">
                <Button positive>Create Event</Button>
              </Link>
              <Button onClick={() => this.handleClick('invited')}>
                Pending Invites
              </Button>
              <Button onClick={() => this.handleClick('accepted')}>
                Accepted Events
              </Button>
              <Button onClick={() => this.handleClick('declined')}>
                Declined Events
              </Button>
              <Button onClick={() => this.handleClick('')}>All Events</Button>
              <Button onClick={() => this.handleClick('created')}>
                My Events
              </Button>
              <Button
                onClick={() => this.handleUpcoming(this.state.dateFilter)}
              >
                Upcoming Events
              </Button>
            </>
          ) : (
            <Link to="/signin">
              <button>SIGN IN</button>
            </Link>
          )}
        </h1>
      </header>
    )
  }
}

export default Header
