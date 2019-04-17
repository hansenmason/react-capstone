import React, { Component, Fragment } from 'react'
import axios from 'axios'
import apiUrl from './apiConfig'
import { Link } from 'react-router-dom'

class Games extends Component {
  constructor () {
    super()

    this.state = {
      games: []
    }
  }

  componentDidMount () {
    axios.get(apiUrl + '/games')
      .then(response => this.setState({ games: response.data.games }))
      .catch(() => this.setState({ ...this.state, message: 'did not work' }))
  }

  render () {
    if (this.state.games.length === 0) {
      return <h4>Loading...</h4>
    }
    return (
      <Fragment>
        <h4>Games:</h4>
        <h5>{this.props.location.state ? this.props.location.state.message : ''}</h5>
        <ul>
          { this.state.games.map(game => (
            <Fragment key={game.id}>
              <li><Link to={'/games/' + game.id}>{game.id}</Link></li>
            </Fragment>
          )) }
        </ul>
      </Fragment>
    )
  }
}

export default Games
