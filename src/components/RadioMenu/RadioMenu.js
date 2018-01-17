import React, { Fragment } from 'react'
import './RadioMenu.css'

function camelize(text) {
  return text.replace(/^([A-Z])|[\s-_]+(\w)/g, function(match, p1, p2, offset) {
    if (p2) return p2.toUpperCase()
    return p1.toLowerCase()
  })
}

const RadioMenu = ({ name, options, onChange }) => {
  const radioOptions = options.map(option => {
    return (
      <Fragment>
        <input
          type="radio"
          id={camelize(option)}
          name={name}
          value={camelize(option)}
          onChange={onChange}
        />
        <label htmlFor={camelize(option)}>{option}</label>
      </Fragment>
    )
  })
  return <div className="radioMenu">{radioOptions}</div>
}

export default RadioMenu
