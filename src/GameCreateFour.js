import React, { Fragment, Component } from 'react'
import axios from 'axios'
import apiUrl from './apiConfig'
import { Redirect } from 'react-router-dom'

import GameForm from './GameForm'

class GameCreateFour extends Component {
  constructor () {
    super()

    this.state = {
      fourgame: {
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
      let num1, num2, num3, num4
      let randVal = ''
      do {
        num1 = randomDigit()
        num2 = randomDigit()
        num3 = randomDigit()
        num4 = randomDigit()
      }
      while (num1 === num2 || num1 === num3 || num1 === num4 || num2 === num3 || num2 === num4 || num3 === num4)
      randVal = num1.toString() + num2.toString() + num3.toString() + num4.toString()
      return randVal
    }
    const randomNumber = randomNum()
    const game = this.state.fourgame
    event.preventDefault()
    const user = this.props.user
    axios({
      url: `${apiUrl}/fourgames`,
      method: 'post',
      headers: {
        'Authorization': `Token token=${user.token}`
      },
      data: {
        fourgame: {
          pico: game.pico,
          fumi: game.fumi,
          bagel: game.bagel,
          number: randomNumber
        }
      }
    })
      .then((response) => this.setState({ created: true, fourgame: response.data.fourgame }))
      .catch(() => this.setState({ ...this.state, message: 'Did Not Work' }))
  }

  handleChange = event => {
    this.setState({ fourgame: { ...this.state.fourgame, [event.target.name]: event.target.value } })
  }

  render () {
    const { message, created, fourgame, pico, fumi, bagel } = this.state

    if (created) {
      return <Redirect to={`/fourgames/${fourgame.id}`} />
    }

    return (
      <Fragment>
        <h3>{ message }</h3>
        <h4 className="top-message">New Game With Four Digits:</h4>
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

export default GameCreateFour
