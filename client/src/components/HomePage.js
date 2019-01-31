import React from 'react'
import { Link } from 'react-router-dom'

const HomePage = props => (
  <div>
    <h1>Home Page!</h1>
    <p>We currently have the following routes:</p>
    <p>
      <Link to="/">
        <b>HomePage:</b>
      </Link>
      <b> '/'</b>
    </p>
    <p>
      <Link to="/signin">
        <b>SignInForm:</b>
      </Link>
      <b> '/signin'</b>
    </p>
    <p>
      <Link to="/create">
        <b>Create a Meeting:</b>
      </Link>
      <b> '/create'</b>
    </p>
  </div>
)
export default HomePage
