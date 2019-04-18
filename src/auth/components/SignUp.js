import React, { Fragment, Component } from 'react'
import { withRouter } from 'react-router-dom'

import { signUp, signIn } from '../api'

class SignUp extends Component {
  constructor () {
    super()

    this.state = {
      email: '',
      password: '',
      passwordConfirmation: '',
      message: ''
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onSignUp = event => {
    event.preventDefault()

    const { history, setUser } = this.props

    signUp(this.state)
      .then(() => signIn(this.state))
      .then(res => setUser(res.data.user))
      .then(() => history.push('/'))
      .catch(error => {
        console.error(error)
        this.setState({ email: '', password: '', passwordConfirmation: '', message: 'Error Signing up!' })
      })
  }

  render () {
    const { message, email, password, passwordConfirmation } = this.state

    return (
      <Fragment>
        <h3>{ message }</h3>
        <form className='auth-form' onSubmit={this.onSignUp}>
          <h3>Sign Up</h3>

          <label htmlFor="email">Email</label>
          <input
            required
            name="email"
            value={email}
            type="email"
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
          <label htmlFor="passwordConfirmation">Confirm Password</label>
          <input
            required
            name="passwordConfirmation"
            value={passwordConfirmation}
            type="password"
            placeholder="Confirm Password"
            onChange={this.handleChange}
          />
          <button type="submit">Sign Up</button>
        </form>
      </Fragment>
    )
  }
}

export default withRouter(SignUp)
