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
      .catch(() => this.setState({ ...this.state, message: 'did not work' }))
  }

  render () {
    if (this.state.fourgames.length === 0) {
      return <h4>Loading...</h4>
    }
    return (
      <Fragment>
        <h4>Games:</h4>
        <h5>{this.props.location.state ? this.props.location.state.message : ''}</h5>
        <ul>
          { this.state.fourgames.map(game => (
            <Fragment key={game.id}>
              <li><Link to={'/fourgames/' + game.id}>{game.id}</Link></li>
            </Fragment>
          )) }
        </ul>
      </Fragment>
    )
  }
}

export default GamesFour
