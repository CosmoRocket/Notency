import React from 'react'
import './Input.css'
import { Icon } from 'react-fa'

export default function Input({
  className,
  type = 'text',
  name,
  placeholder,
  iconName,
  errorMessage,
  onChange,
  onBlur,
  value
}) {
  return (
    <div className={`Input ${className}`}>
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
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  )
}
