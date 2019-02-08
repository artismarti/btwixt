import React, { Component } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'

import Header from './components/Header'
import SignInForm from './components/SignInForm'
import MeetingsContainer from './components/MeetingsContainer'
import HomePage from './components/HomePage'
import PageNotFound from './components/PageNotFound'
import Create from './components/Create'
import './App.css'
import API from './API'

class App extends Component {
  state = {
    email: '',
    meetings: [],
    meetingStatus: '',
    onlyShowFutureMeetings: true,
  }

  // When user signs in, change email state
  // Store user email in local storage
  signin = (email, token) => {
    localStorage.setItem('token', token)
    this.setState({ email }, this.getMeetings())
  }
  // Delete email from state when user signs out
  // Remove user email in local storage
  signout = () => {
    localStorage.removeItem('token')
    this.setState({ email: '' })
    this.props.history.push('/')
  }

  getMeetings = () => {
    API.getMeetings().then(data => {
      this.setState({ meetings: data }, () =>
        this.props.history.push('/meetings')
      )
    })
  }

  toggleUpcomingMeetingsState = filter => {
    this.setState({
      onlyShowFutureMeetings:
        filter === undefined ? !this.state.onlyShowFutureMeetings : filter,
    })
  }

  showUpcomingMeetings = filter => {
    let now = new Date()
    const { meetings } = this.state
    if (this.state.onlyShowFutureMeetings) {
      return meetings.filter(m => new Date(m.date_time) > now)
    } else {
      return meetings
    }
  }

  meetingStatus = status => {
    console.log(status)
    this.setState({ meetingStatus: status })
  }

  updateStateOfMeetings = meetings => {
    this.setState({ meetings })
  }

  componentDidMount() {
    const { signin } = this
    const { history } = this.props
    // Validate user
    API.validate().then(data => {
      if (data.error) {
        history.push('/')
      } else {
        signin(data.user.email, data.token)
        this.getMeetings()
      }
    })
  }
  render() {
    const { signin, signout, getMeetings } = this
    const { email, meetings } = this.state
    return (
      <div className="App">
        <Header
          email={email}
          signout={signout}
          meetings={meetings}
          meetingStatus={this.meetingStatus}
          toggleUpcomingMeetingsState={this.toggleUpcomingMeetingsState}
        />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route
            path="/signin"
            component={routerProps => (
              <SignInForm {...routerProps} signin={signin} />
            )}
          />
          <Route
            path="/meetings"
            component={routerProps => (
              <MeetingsContainer
                {...routerProps}
                email={email}
                meetings={meetings}
                updateStateOfMeetings={this.updateStateOfMeetings}
                meetingStatus={this.state.meetingStatus}
                showUpcomingMeetings={this.showUpcomingMeetings}
              />
            )}
          />
          <Route
            path="/create"
            component={routerProps => (
              <Create
                {...routerProps}
                email={email}
                getMeetings={getMeetings}
              />
            )}
          />

          <Route component={PageNotFound} />
        </Switch>
      </div>
    )
  }
}

export default withRouter(App)
/* 
withRouter is a function that 
gives App access to Router props 
*/
