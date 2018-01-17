import React from 'react'
import './Input.css'
import { Icon } from 'react-fa'

export default function Input({
  type,
  name,
  placeholder,
  iconName,
  errorMessage,
  onChange,
  onBlur,
  value
}) {
  return (
    <div className="Input">
      <input
        type={type}
        value={value}
        name={name}
        placeholder={placeholder}
        className={`${iconName && 'pl-4'} ${errorMessage && 'error'}`}
        onChange={onChange}
        onBlur={onBlur}
      />
      {iconName ? <Icon name={iconName} className="icon" /> : null}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  )
}
