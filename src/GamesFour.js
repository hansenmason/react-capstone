import React, { Component, Fragment } from 'react'
import axios from 'axios'
import apiUrl from './apiConfig'
import { Link } from 'react-router-dom'

class GamesFour extends Component {
  constructor () {
    super()

    this.state = {
      fourgames: []
    }
  }

  componentDidMount () {
    axios.get(apiUrl + '/fourgames')
      .then(response => this.setState({ fourgames: response.data.fourgames }))
      .catch(() => this.setState({ ...this.state, message: 'Did Not Work' }))
  }

  render () {
    if (this.state.fourgames.length === 0) {
      return <h4>Loading...</h4>
    }
    const { message } = this.state
    return (
      <Fragment>
        <h3>{ message }</h3>
        <h4 className="top-message">Games With Four Digits:</h4>
        <h5>{this.props.location.state ? this.props.location.state.message : ''}</h5>
        <ul>
          { this.state.fourgames.map(game => (
            <Fragment key={game.id}>
              <li className="games-list"><Link to={'/fourgames/' + game.id}>{game.pico}  {game.fumi}  {game.bagel}</Link></li>
            </Fragment>
          )) }
        </ul>
      </Fragment>
    )
  }
}

export default GamesFour
