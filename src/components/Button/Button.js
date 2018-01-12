import React from 'react'
import './Button.css'

export default function Button({
  btnStyle = 'primary',
  className,
  type,
  text
}) {
  return (
    <button className={`btn btn-${btnStyle} ${className}`} type={type}>
      {text}
    </button>
  )
}
