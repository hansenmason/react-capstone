import React, { Component, Fragment } from 'react'
import axios from 'axios'
import apiUrl from './apiConfig'
import { Redirect } from 'react-router-dom'

import GameForm from './GameForm'

class GameEditFour extends Component {
  constructor () {
    super()

    this.state = {
      fourgame: null,
      message: null,
      updated: false,
      deleted: false
    }
  }

  componentDidMount () {
    const id = this.props.match.params.id
    axios.get(`${apiUrl}/fourgames/${id}`)
      .then(response => this.setState({ fourgame: response.data.fourgame }))
      .catch(() => this.setState({ ...this.state, message: 'Did Not Work' }))
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const { fourgame } = this.state
    const user = this.props.user
    axios({
      url: `${apiUrl}/fourgames/${fourgame.id}`,
      method: 'patch',
      headers: {
        'Authorization': `Token token=${user.token}`
      },
      data: { fourgame }
    })
      .then(() => this.setState({ updated: true }))
      .catch(() => this.setState({ fourgame: { id: fourgame.id }, message: 'Did Not Work' }))
  }

  handleChange = event => {
    this.setState({ fourgame: { ...this.state.fourgame, [event.target.name]: event.target.value } })
  }

  render () {
    const { message, updated, fourgame, pico, fumi, bagel, deleted } = this.state
    const user = this.props.user
    if (!fourgame) {
      return <p>Loading...</p>
    }

    if (updated) {
      return <Redirect to={`/fourgames/${fourgame.id}`} />
    }

    if (deleted) {
      return <Redirect to={'/fourgames'} />
    }

    return (
      <Fragment>
        <h3>{ message }</h3>
        <GameForm
          pico={pico}
          fumi={fumi}
          bagel={bagel}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
        <button onClick={() =>
          axios.delete(apiUrl + `/fourgames/${fourgame.id}`, { headers: {
            'Authorization': `Token token=${user.token}`
          } })
            .then(() => this.setState({ deleted: true }))
            .catch(() => this.setState({ fourgame: { id: fourgame.id }, message: 'Did Not Work' }))
        } className="btn btn-danger btn-sm">Delete</button>
      </Fragment>
    )
  }
}

export default GameEditFour
