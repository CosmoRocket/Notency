import React, { Fragment } from 'react'
import './RadioMenu.css'

function camelize(text) {
  return text.replace(/^([A-Z])|[\s-_]+(\w)/g, function(match, p1, p2, offset) {
    if (p2) return p2.toUpperCase()
    return p1.toLowerCase()
  })
}

const RadioMenu = ({ name, options, onChange, selectedValue }) => {
  const radioOptions = options.map(option => {
    const camelizedOption = camelize(option)
    const camelizedSelectedValue = camelize(selectedValue)
    return (
      <Fragment key={camelizedOption}>
        <input
          type="radio"
          id={camelizedOption}
          name={name}
          value={camelizedOption}
          onChange={onChange}
          checked={camelizedOption === camelizedSelectedValue}
        />
        <label htmlFor={camelize(option)}>{option}</label>
      </Fragment>
    )
  })
  return <div className="radioMenu">{radioOptions}</div>
}

export default RadioMenu
