import React, { Component, Fragment } from 'react'
import axios from 'axios'
import apiUrl from './apiConfig'
import { Redirect, Link } from 'react-router-dom'

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
      turns: 0,
      over: false
    }
  }

  componentDidMount () {
    const id = this.props.match.params.id
    axios.get(`${apiUrl}/fourgames/${id}`)
      .then(response => this.setState({ fourgame: response.data.fourgame }))
      .catch(() => this.setState({ ...this.state, message: 'Did Not Work' }))
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
    else if (num[2] === guess[0] || num[2] === guess[1] || num[2] === guess[3]) response += `${feedback.pico} `

    if (num[3] === guess[3]) response += `${feedback.fumi} `
    else if (num[3] === guess[0] || num[3] === guess[1] || num[3] === guess[2]) response += `${feedback.pico} `

    if (num[0] === guess[0] && num[1] === guess[1] && num[2] === guess[2] && num[3] === guess[3]) {
      response = `You guessed ${num} in ${this.state.turns + 1} turns!`
      this.setState({ over: true })
    } else if (response === '') response += `${feedback.bagel}`

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
    const { guess, message, response, over } = this.state
    const currentUser = this.props.user.id.toString()
    const createdUser = this.state.fourgame.user_id.toString()

    return (
      <Fragment>
        <h3>{ message }</h3>
        <h2 className="top-message">Guess A Four Digit Number!</h2>
        { over ? ''
          : <form onSubmit={this.handleSubmit}>
            <label className="guess-heading" htmlFor="guess">Guess A Number</label>
            <input value={guess} name="guess" type="number" max="9999" onChange={this.handleChange} />
            <button type="submit">Guess!</button>
          </form>
        }
        { currentUser === createdUser ? <Link to={this.props.match.url + '/edit'}><button>Edit</button></Link> : ''}
        <h2 className="guess-response"> { response } </h2>
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
