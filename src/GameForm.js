import React, { Fragment } from 'react'
import Alert from 'react-bootstrap/Alert'

const GameForm = ({ message, pico, fumi, bagel, handleChange, handleSubmit }) => (
  <Fragment>
    { message && <Alert variant="danger" dismissable>{message}</Alert> }
    <form onSubmit={handleSubmit}>
      <label htmlFor="pico">Pico</label>
      <input value={pico} name="pico" onChange={handleChange} />
      <label htmlFor="fumi">fumi</label>
      <input value={fumi} name="fumi" onChange={handleChange} />
      <label htmlFor="bagel">Bagel</label>
      <input value={bagel} name="bagel" onChange={handleChange} />
      <button type="submit">Submit</button>
    </form>
  </Fragment>
)

export default GameForm
