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
    <NavLink to="/games" exact style={{ color: '#00FF7F' }} activeClassName="active-link">Three Digit Games</NavLink>
    <NavLink to="/fourgames" exact style={{ color: '#00FF7F' }} activeClassName="active-link">Four Digit Games</NavLink>
    <NavLink to="/game-create" exact style={{ color: '#00FF7F' }} activeClassName="active-link">New Three Digit Game</NavLink>
    <NavLink to="/game-create-four" exact style={{ color: '#00FF7F' }} activeClassName="active-link">New Four Digit Game</NavLink>
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
      <h1 className="page-title">Pico Fermi Bagel</h1>
      <nav className="header-nav">
        { user && <span>Welcome, {user.email}</span>}
        { user ? authenticatedOptions : unauthenticatedOptions }
        { alwaysOptions }
      </nav>
    </header>
    <nav className="nav-links">
      { user ? authenticatedOptionsNav : ''}
    </nav>
  </React.Fragment>
)

export default Header
