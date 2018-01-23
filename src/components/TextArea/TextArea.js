import React from 'react'
import './TextArea.css'

export default function TextArea({
  name,
  rows,
  maxLength,
  placeholder,
  errorMessage,
  onChange,
  onBlur,
  value
}) {
  return (
    <div>
      <textarea
        className={`TextArea ${errorMessage && 'error'}`}
        name={name}
        id={name}
        rows={rows}
        maxLength={maxLength}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
      />
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  )
}
