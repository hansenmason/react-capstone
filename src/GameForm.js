import React, { Fragment } from 'react'

const GameForm = ({ message, pico, fumi, bagel, handleChange, handleSubmit }) => (
  <Fragment>
    <h3>{ message }</h3>
    <form className="form-stuff" onSubmit={handleSubmit}>
      <label htmlFor="pico">Pico</label>
      <input value={pico} name="pico" onChange={handleChange} />
      <label htmlFor="fumi">Fermi</label>
      <input value={fumi} name="fumi" onChange={handleChange} />
      <label htmlFor="bagel">Bagel</label>
      <input value={bagel} name="bagel" onChange={handleChange} />
      <button className="button" type="submit">Submit</button>
    </form>
  </Fragment>
)

export default GameForm
