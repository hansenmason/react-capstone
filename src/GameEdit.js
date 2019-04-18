import React, { Component, Fragment } from 'react'
import axios from 'axios'
import apiUrl from './apiConfig'
import { Redirect } from 'react-router-dom'

import GameForm from './GameForm'

class GameEdit extends Component {
  constructor () {
    super()

    this.state = {
      game: null,
      message: null,
      updated: false,
      deleted: false
    }
  }

  componentDidMount () {
    const id = this.props.match.params.id
    axios.get(`${apiUrl}/games/${id}`)
      .then(response => this.setState({ game: response.data.game }))
      .catch(() => this.setState({ ...this.state, message: 'Did Not Work' }))
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const { game } = this.state
    const user = this.props.user
    axios({
      url: `${apiUrl}/games/${game.id}`,
      method: 'patch',
      headers: {
        'Authorization': `Token token=${user.token}`
      },
      data: { game }
    })
      .then(() => this.setState({ updated: true }))
      .catch(() => this.setState({ game: { id: game.id }, message: 'Did Not Work' }))
  }

  handleChange = event => {
    this.setState({ game: { ...this.state.game, [event.target.name]: event.target.value } })
  }

  render () {
    const { message, updated, game, pico, fumi, bagel, deleted } = this.state
    const user = this.props.user
    if (!game) {
      return <p>Loading...</p>
    }

    if (updated) {
      return <Redirect to={`/games/${game.id}`} />
    }

    if (deleted) {
      return <Redirect to={'/games'} />
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
          axios.delete(apiUrl + `/games/${game.id}`, { headers: {
            'Authorization': `Token token=${user.token}`
          } })
            .then(() => this.setState({ deleted: true }))
            .catch(() => this.setState({ game: { id: game.id }, message: 'Did Not Work' }))
        } className="btn btn-danger btn-sm">Delete</button>
      </Fragment>
    )
  }
}

export default GameEdit
