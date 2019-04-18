import React, { Fragment, Component } from 'react'
import { withRouter } from 'react-router-dom'

import { changePassword } from '../api'

class ChangePassword extends Component {
  constructor () {
    super()

    this.state = {
      oldPassword: '',
      newPassword: '',
      message: ''
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onChangePassword = event => {
    event.preventDefault()

    const { history, user } = this.props

    changePassword(this.state, user)
      .then(() => history.push('/'))
      .catch(error => {
        console.error(error)
        this.setState({ oldPassword: '', newPassword: '', message: 'Password change failure!' })
      })
  }

  render () {
    const { oldPassword, newPassword, message } = this.state

    return (
      <Fragment>
        <h3>{ message }</h3>
        <form className='auth-form' onSubmit={this.onChangePassword}>
          <h3>Change Password</h3>

          <label htmlFor="oldpw">Old Password</label>
          <input
            required
            name="oldPassword"
            value={oldPassword}
            type="password"
            placeholder="Old Password"
            onChange={this.handleChange}
          />
          <label htmlFor="newPassword">New Password</label>
          <input
            required
            name="newPassword"
            value={newPassword}
            type="password"
            placeholder="New Password"
            onChange={this.handleChange}
          />
          <button type="submit">Change Password</button>
        </form>
      </Fragment>
    )
  }
}

export default withRouter(ChangePassword)
