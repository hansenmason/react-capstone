import React, { Component, Fragment } from 'react'
import axios from 'axios'
import apiUrl from './apiConfig'
import { Redirect, Link } from 'react-router-dom'

import Alert from 'react-bootstrap/Alert'

class GameFour extends Component {
  constructor () {
    super()

    this.state = {
      fourgame: null,
      guess: '',
      redirect: false,
      message: null,
      response: '',
      guesses: [],
      turns: 0
    }
  }

  componentDidMount () {
    const id = this.props.match.params.id
    axios.get(`${apiUrl}/fourgames/${id}`)
      .then(response => this.setState({ fourgame: response.data.fourgame }))
      .catch(() => this.setState({ ...this.state, message: 'did not work' }))
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit = (event) => {
    const feedback = this.state.fourgame
    event.preventDefault()
    const num = this.state.fourgame.number
    const guess = this.state.guess

    let response = ''

    if (num[0] === guess[0]) response += `${feedback.fumi} `
    else if (num[0] === guess[1] || num[0] === guess[2] || num[0] === guess[3]) response += `${feedback.pico} `

    if (num[1] === guess[1]) response += `${feedback.fumi} `
    else if (num[1] === guess[0] || num[1] === guess[2] || num[1] === guess[3]) response += `${feedback.pico} `

    if (num[2] === guess[2]) response += `${feedback.fumi} `
    else if (num[2] === guess[0] || num[2] === guess[1] || num[0] === guess[3]) response += `${feedback.pico} `

    if (num[3] === guess[3]) response += `${feedback.fumi} `
    else if (num[3] === guess[0] || num[3] === guess[1] || num[3] === guess[2]) response += `${feedback.pico} `

    if (num[0] === guess[0] && num[1] === guess[1] && num[2] === guess[2] && num[3] === guess[3]) response = `You won in ${this.state.turns + 1} turns!`
    else if (response === '') return (`${feedback.bagel} `)

    this.setState({ response: response, guesses: [...this.state.guesses, `${guess}: ${response}`], turns: this.state.turns + 1 })
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to={{ pathname: '/fourgames', state: { message: 'Successfully deleted game!' } }} />
    }
  }

  render () {
    if (!this.state.fourgame) {
      return <h2>Loading...</h2>
    }
    const { guess, message, response } = this.state
    return (
      <Fragment>
        { message && <Alert variant="danger" dismissable>{this.state.message}</Alert> }
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="guess">Guess A Number</label>
          <input value={guess} name="guess" type="number" max="9999" onChange={this.handleChange} />
          <button type="submit">Guess!</button>
        </form>
        <Link to={this.props.match.url + '/edit'}><button>Edit</button></Link>
        <h2> { response } </h2>
        <ul>
          { this.state.guesses.map(guess => (
            <Fragment key={guess}>
              <h4 className="guess">{guess}</h4>
            </Fragment>
          )) }
        </ul>
      </Fragment>
    )
  }
}

export default GameFour
