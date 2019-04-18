import React, { Fragment, Component } from 'react'
import { withRouter } from 'react-router-dom'

import { signIn } from '../api'

class SignIn extends Component {
  constructor () {
    super()

    this.state = {
      email: '',
      password: '',
      message: ''
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onSignIn = event => {
    event.preventDefault()

    const { history, setUser } = this.props

    signIn(this.state)
      .then(res => setUser(res.data.user))
      .then(() => history.push('/'))
      .catch(error => {
        console.error(error)
        this.setState({ email: '', password: '', message: 'Error signing in!' })
      })
  }

  render () {
    const { email, password, message } = this.state

    return (
      <Fragment>
        <h3>{ message }</h3>
        <form className='auth-form' onSubmit={this.onSignIn}>
          <h3>Sign In</h3>
          <label htmlFor="email">Email</label>
          <input
            required
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            onChange={this.handleChange}
          />
          <label htmlFor="password">Password</label>
          <input
            required
            name="password"
            value={password}
            type="password"
            placeholder="Password"
            onChange={this.handleChange}
          />
          <button type="submit">Sign In</button>
        </form>
      </Fragment>
    )
  }
}

export default withRouter(SignIn)
