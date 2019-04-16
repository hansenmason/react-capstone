import React, { Component, Fragment } from 'react'
import axios from 'axios'
import apiUrl from './apiConfig'
import { Redirect } from 'react-router-dom'

import Alert from 'react-bootstrap/Alert'

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
      .catch(() => this.setState({ ...this.state, message: 'did not work' }))
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
      .catch(() => this.setState({ game: { id: game.id }, message: 'did not work' }))
  }

  handleChange = event => {
    console.log(event.target)

    this.setState({ game: { ...this.state.game, [event.target.name]: event.target.value } })
  }

  render () {
    const { message, updated, game, pico, fumi, bagel, deleted } = this.state
    const user = this.props.user
    console.log(this.props)
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
        { message && <Alert variant="danger" dismissable>{this.state.message}</Alert> }
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="pico">Pico</label>
          <input value={pico} name="pico" onChange={this.handleChange} />
          <label htmlFor="fumi">fumi</label>
          <input value={fumi} name="fumi" onChange={this.handleChange} />
          <label htmlFor="bagel">Bagel</label>
          <input value={bagel} name="bagel" onChange={this.handleChange} />
          <button type="submit">Submit</button>
        </form>
        <button onClick={() =>
          axios.delete(apiUrl + `/games/${game.id}`, { headers: {
            'Authorization': `Token token=${user.token}`
          } })
            .then(() => this.setState({ deleted: true }))
            .catch(() => this.setState({ game: { id: game.id }, message: 'did not work' }))
        } className="btn btn-danger btn-sm">Delete</button>
      </Fragment>
    )
  }
}

export default GameEdit
