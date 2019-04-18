import React, { Component } from 'react'
import './App.scss'
import { Route } from 'react-router-dom'

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

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  render () {
    const { user } = this.state

    return (
      <React.Fragment>
        <Header user={user} />
        <main className="container">
          <Route path='/sign-up' render={() => (
            <SignUp setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword user={user} />
          )} />
        </main>
        <Route exact path='/games' render={(props) => (
          <Games {...props} user={user} />
        )} />
        <Route exact path='/fourgames' render={(props) => (
          <GamesFour {...props} user={user} />
        )} />
        <AuthenticatedRoute exact user={user} path='/games/:id' render={(props) => (
          <Game {...props} user={user} />
        )} />
        <AuthenticatedRoute exact user={user} path='/fourgames/:id' render={(props) => (
          <GameFour {...props} user={user} />
        )} />
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
