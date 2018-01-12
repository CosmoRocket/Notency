import React from 'react'
import './Input.css'
import { Icon } from 'react-fa'

export default function Input({
  type,
  name,
  placeholder,
  inputStyle,
  iconName
}) {
  return (
    <div className="inputContainer">
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className={`${iconName && "pl-4"} ${inputStyle}`}
      />
      {
        iconName ? <Icon name={iconName} className='icon' /> : null
      }
    </div>
  )
}