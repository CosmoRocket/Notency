import React from 'react'
import './Input.css'
import { Icon } from 'react-fa'

export default function Input({
  type,
  name,
  placeholder,
  iconName
}) {
  return (
    <div className="inputContainer">
      <input
        type={type}
        name={name}
        placeholder={placeholder}
      />
      {
        iconName ? <Icon name={iconName} className='icon' /> : null
      }
    </div>
  )
}