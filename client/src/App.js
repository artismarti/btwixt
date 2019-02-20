import React, { Component } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'

import Header from './components/Header'
import SignInForm from './components/SignInForm'
import MeetingsContainer from './components/MeetingsContainer'
import ProfileContainer from './components/ProfileContainer'
import HomePage from './components/HomePage'
import PageNotFound from './components/PageNotFound'
import SignUp from './components/SignUp'
import Create from './components/Create'
import Loading from './components/Loading'
import './App.css'
import API from './API'

class App extends Component {
  state = {
    email: '',
    userName: '',
    meetings: [],
    meetingStatus: '',
    onlyShowFutureMeetings: true,
    toggleContainers: 'meeting',
    firstName: '',
    lastName: '',
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

  showProfile = () => {
    this.setState({ toggleContainers: 'profile' })
  }

  getMeetings = () => {
    API.getMeetings()
      .then(data => {
        this.setState({ meetings: data }, () =>
          this.props.history.push('/meetings')
        )
      })
      .catch(errors => console.log(errors))
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
        history.push('/loading')
      } else {
        signin(data.user.email, data.token)
        this.setState({
          userName: `${data.user.first_name} ${data.user.last_name}`,
          firstName: data.user.first_name,
          lastName: data.user.last_name,
        })
        history.push('/loading')
      }
    })
  }
  render() {
    const { signin, signout, getMeetings } = this
    const { email, meetings, firstName, lastName, userName } = this.state
    return (
      <div className="App">
        <Header
          email={email}
          signout={signout}
          userName={userName}
          meetingStatus={this.meetingStatus}
          showProfile={this.showProfile}
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
          {this.state.toggleContainers === 'meeting' ? (
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
                  getMeetings={this.getMeetings}
                />
              )}
            />
          ) : (
            <ProfileContainer
              email={email}
              firstName={firstName}
              lastName={lastName}
            />
          )}
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
          <Route
            path="/signup"
            component={routerProps => (
              <SignUp {...routerProps} signin={signin} />
            )}
          />
          <Route
            path="/loading"
            component={routerProps => <Loading {...routerProps} />}
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
