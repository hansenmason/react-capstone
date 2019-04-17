import React from 'react'
import { Link, NavLink } from 'react-router-dom'

import './Header.scss'

const authenticatedOptions = (
  <React.Fragment>
    <Link to="/change-password">Change Password</Link>
    <Link to="/sign-out">Sign Out</Link>
  </React.Fragment>
)

const authenticatedOptionsNav = (
  <React.Fragment>
    <NavLink to="/games" exact activeClassName="active-link">GamesListThree</NavLink>
    <NavLink to="/fourgames" exact activeClassName="active-link">GamesListFour</NavLink>
    <NavLink to="/game-create" exact activeClassName="active-link">New Game Three</NavLink>
    <NavLink to="/game-create-four" exact activeClassName="active-link">New Game Four</NavLink>
  </React.Fragment>
)

const unauthenticatedOptions = (
  <React.Fragment>
    <Link to="/sign-up">Sign Up</Link>
    <Link to="/sign-in">Sign In</Link>
  </React.Fragment>
)

const alwaysOptions = (
  <React.Fragment>
    <Link to="/">Home</Link>
  </React.Fragment>
)

const Header = ({ user }) => (
  <React.Fragment>
    <header className="main-header">
      <h1>Hello, But For Heys</h1>
      <nav>
        { user && <span>Welcome, {user.email}</span>}
        { user ? authenticatedOptions : unauthenticatedOptions }
        { alwaysOptions }
      </nav>
    </header>
    <nav>
      { user ? authenticatedOptionsNav : ''}
    </nav>
  </React.Fragment>
)

export default Header
