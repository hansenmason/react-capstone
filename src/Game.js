import React, { Component, Fragment } from 'react'
import axios from 'axios'
import apiUrl from './apiConfig'
import { Redirect, Link } from 'react-router-dom'

import Alert from 'react-bootstrap/Alert'

class Game extends Component {
  constructor () {
    super()

    this.state = {
      game: null,
      guess: '',
      redirect: false,
      message: null,
      response: ''
    }
  }

  componentDidMount () {
    const id = this.props.match.params.id
    axios.get(`${apiUrl}/games/${id}`)
      .then(response => this.setState({ game: response.data.game }))
      .catch(() => this.setState({ ...this.state, message: 'did not work' }))
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit = (event) => {
    const feedback = this.state.game
    event.preventDefault()
    const num = this.state.game.number
    const guess = this.state.guess

    let response = ''

    if (num[0] === guess[0]) response += `${feedback.fumi} `
    else if (num[0] === guess[1] || num[0] === guess[2]) response += `${feedback.pico} `

    if (num[1] === guess[1]) response += `${feedback.fumi} `
    else if (num[1] === guess[0] || num[1] === guess[2]) response += `${feedback.pico} `

    if (num[2] === guess[2]) response += `${feedback.fumi} `
    else if (num[2] === guess[0] || num[2] === guess[1]) response += `${feedback.pico} `

    if (num[0] === guess[0] && num[1] === guess[1] && num[2] === guess[2]) response = 'You win'
    else if (response === '') return (`${feedback.bagel} `)

    this.setState({ response: response })
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to={{ pathname: '/games', state: { message: 'Successfully deleted movie' } }} />
    }
  }

  render () {
    if (!this.state.game) {
      return <h2>Loading...</h2>
    }
    console.log(this.state)
    const { guess, message, response } = this.state

    return (
      <Fragment>
        { message && <Alert variant="danger" dismissable>{this.state.message}</Alert> }
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="guess">Guess A Number</label>
          <input value={guess} name="guess" type="number" max="999" onChange={this.handleChange} />
          <button type="submit">Submit</button>
        </form>
        <Link to={this.props.match.url + '/edit'}><button>Edit</button></Link>
        <h2> { response } </h2>
      </Fragment>
    )
  }
}

export default Game
