import React from 'react'
import './Button.css'

export default function Button({
  onClick,
  btnStyle = 'primary',
  className,
  type,
  text
}) {
  return (
    <button
      onClick={onClick}
      className={`btn btn-${btnStyle} ${className}`}
      type={type}
    >
      {text}
    </button>
  )
}
