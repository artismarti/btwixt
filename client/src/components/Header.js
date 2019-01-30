import React from 'react'
import { Link } from 'react-router-dom'

const Header = ({ email, signout }) => (
  <header className="App-header">
    <h1 className="App-title">
      {email ? `Welcome back, ${email}` : `Welcome to Meetr.`}
      <br />
      {email ? (
        <button onClick={signout}>SIGN OUT</button>
      ) : (
        <Link to="/signin">
          <button>SIGN IN</button>
        </Link>
      )}
    </h1>
  </header>
)

export default Header
