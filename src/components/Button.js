import React from 'react'

export default function Button({
  btnStyle = 'primary',
  className,
  type,
  text
}) {
  return (
    <button
      className={`btn btn-${btnStyle} ${className}`}
      type={type}
    >
      {text}
    </button>
  )
}