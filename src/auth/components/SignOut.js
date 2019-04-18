import { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { signOut } from '../api'

class SignOut extends Component {
  componentDidMount () {
    const { history, clearUser, user } = this.props

    signOut(user)
      .finally(() => history.push('/'))
      .finally(() => clearUser())
  }

  render () {
    return ''
  }
}

export default withRouter(SignOut)
