import React, { Fragment } from 'react'
import './Checkbox.css'

function Checkbox({
  name,
  value,
  text
}) {
  return (
    <div className="form-check">
      <input className="form-check-input checkbox" type="checkbox" name={name} value={value} id={value} />
      <label className="form-check-label check-label" htmlFor={value}>
        {text}
      </label>
    </div>
  )
}

export default Checkbox