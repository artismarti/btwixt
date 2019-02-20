import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, Label } from 'semantic-ui-react'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap/'

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
    const { email, signout, userName, showProfile } = this.props
    return (
      <header className="App-header">
        <Navbar fixed="top" variant="dark">
          <Navbar.Brand href="#home">bTwixt</Navbar.Brand>
          <Link to="/signin">
            <Button basic inverted color="green">
              Sign In
            </Button>
          </Link>
          <Link to="/signup">
            <Button basic inverted color="black">
              Sign Up
            </Button>
          </Link>
        </Navbar>
        <br />
        {email && (
          <>
            <Navbar fixed="top" bg="dark" expand="lg" variant="dark">
              <Navbar.Brand href="/meetings">bTwixt</Navbar.Brand>

              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                  <Link to="/create">
                    <Button positive>Create Event</Button>
                  </Link>
                  <NavDropdown title="Filter" id="basic-nav-dropdown">
                    <NavDropdown.Item
                      onClick={() => this.handleClick('created')}
                    >
                      Events I Created
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      onClick={() => this.handleClick('accepted')}
                    >
                      Accepted Events
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      onClick={() => this.handleClick('declined')}
                    >
                      Declined Events
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      onClick={() => this.handleClick('invited')}
                    >
                      Pending Invitations
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      onClick={() => this.handleUpcoming(this.state.dateFilter)}
                    >
                      Upcoming Events
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={() => this.handleClick('')}>
                      All Events
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
                <Navbar.Text className="mr-sm-2 header">
                  {email ? (
                    <Label
                      as="a"
                      basic
                      color="blue"
                      content={userName}
                      icon="user"
                      onClick={showProfile}
                    />
                  ) : (
                    `Welcome to bTw📍xt.`
                  )}
                </Navbar.Text>
                <Button basic inverted onClick={signout}>
                  SIGN OUT
                </Button>
              </Navbar.Collapse>
            </Navbar>
          </>
        )}
      </header>
    )
  }
}

export default Header
