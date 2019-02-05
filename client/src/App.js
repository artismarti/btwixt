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
  }

  getMeetings = () => {
    console.log('in app')
    API.getMeetings().then(data => {
      this.setState({ meetings: data }, () =>
        this.props.history.push('/meetings')
      )
    })
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
        <Header email={email} signout={signout} />
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
                getMeetings={getMeetings}
                meetings={meetings}
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
