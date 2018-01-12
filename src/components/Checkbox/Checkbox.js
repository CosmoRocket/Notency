import React from 'react'
import './Checkbox.css'

function Checkbox({ name, value, text }) {
  return (
    <div className="form-check">
      <input className="form-check-input checkbox" type="checkbox" name={name} value={value} id={value} />
      <label className="form-check-label label-text" htmlFor={value}>
        {text}
      </label>
    </div>
  )
}

export default Checkbox
