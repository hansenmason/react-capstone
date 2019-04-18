import React, { Fragment, Component } from 'react'
import axios from 'axios'
import apiUrl from './apiConfig'
import { Redirect } from 'react-router-dom'

import GameForm from './GameForm'

class GameCreate extends Component {
  constructor () {
    super()

    this.state = {
      game: {
        pico: '',
        fumi: '',
        bagel: '',
        number: null
      },
      created: false,
      message: null
    }
  }

  handleSubmit = (event) => {
    function randomDigit () {
      return Math.floor(Math.random() * 10)
    }
    function randomNum () {
      let num1, num2, num3
      let randVal = ''
      do {
        num1 = randomDigit()
        num2 = randomDigit()
        num3 = randomDigit()
      }
      while (num1 === num2 || num1 === num3 || num2 === num3)
      randVal = num1.toString() + num3.toString() + num2.toString()
      return randVal
    }
    const randomNumber = randomNum()
    const game = this.state.game
    event.preventDefault()
    const user = this.props.user
    axios({
      url: `${apiUrl}/games`,
      method: 'post',
      headers: {
        'Authorization': `Token token=${user.token}`
      },
      data: {
        game: {
          pico: game.pico,
          fumi: game.fumi,
          bagel: game.bagel,
          number: randomNumber
        }
      }
    })
      .then((response) => this.setState({ created: true, game: response.data.game }))
      .catch(() => this.setState({ ...this.state, message: 'Did Not Work' }))
  }

  handleChange = event => {
    this.setState({ game: { ...this.state.game, [event.target.name]: event.target.value } })
  }

  render () {
    const { message, created, game, pico, fumi, bagel } = this.state

    if (created) {
      return <Redirect to={`/games/${game.id}`} />
    }

    return (
      <Fragment>
        <h3>{ message }</h3>
        <h4 className="top-message">New Game With Three Digits:</h4>
        <GameForm
          pico={pico}
          fumi={fumi}
          bagel={bagel}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </Fragment>
    )
  }
}

export default GameCreate
