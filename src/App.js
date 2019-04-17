import React, { Component } from 'react'
import './App.scss'
import { Route, NavLink } from 'react-router-dom'

import AuthenticatedRoute from './auth/components/AuthenticatedRoute'
import Header from './header/Header'
import SignUp from './auth/components/SignUp'
import SignIn from './auth/components/SignIn'
import SignOut from './auth/components/SignOut'
import ChangePassword from './auth/components/ChangePassword'
import GameCreate from './GameCreate'
import Game from './Game'
import Games from './Games'
import GameEdit from './GameEdit'
import GameFour from './GameFour'
import GameEditFour from './GameEditFour'
import GameCreateFour from './GameCreateFour'
import GamesFour from './GamesFour'

import Alert from 'react-bootstrap/Alert'

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      alerts: []
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  alert = (message, type) => {
    this.setState({ alerts: [...this.state.alerts, { message, type }] })
  }

  render () {
    const { alerts, user } = this.state

    return (
      <React.Fragment>
        <Header user={user} />
        {alerts.map((alert, index) => (
          <Alert key={index} dismissible variant={alert.type}>
            <Alert.Heading>
              {alert.message}
            </Alert.Heading>
          </Alert>
        ))}
        <main className="container">
          <Route path='/sign-up' render={() => (
            <SignUp alert={this.alert} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn alert={this.alert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut alert={this.alert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword alert={this.alert} user={user} />
          )} />
          <nav>
            <NavLink to="/games" exact activeClassName="active-link">GamesList</NavLink>
            <NavLink to="/fourgames" exact activeClassName="active-link">GamesList</NavLink>
            <NavLink to="/game-create" exact activeClassName="active-link">New Game Three</NavLink>
            <NavLink to="/game-create-four" exact activeClassName="active-link">New Game Four</NavLink>
          </nav>
        </main>
        <Route exact path='/games' component={Games} />
        <Route exact path='/fourgames' component={GamesFour} />
        <AuthenticatedRoute exact user={user} path='/games/:id' component={Game} />
        <AuthenticatedRoute exact user={user} path='/fourgames/:id' component={GameFour} />
        <AuthenticatedRoute user={user} exact path='/games/:id/edit' render={(props) => (
          <GameEdit {...props} user={user} />
        )} />
        <AuthenticatedRoute user={user} exact path='/fourgames/:id/edit' render={(props) => (
          <GameEditFour {...props} user={user} />
        )} />
        <AuthenticatedRoute user={user} exact path='/game-create' render={(props) => (
          <GameCreate {...props} user={user} />
        )} />
        <AuthenticatedRoute user={user} exact path='/game-create-four' render={(props) => (
          <GameCreateFour {...props} user={user} />
        )} />
      </React.Fragment>
    )
  }
}

export default App
