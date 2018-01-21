import React from 'react'
import './NonResponder.css'

export default function NonResponder({
  idNo,
  nonResponderName,
  mobile,
  email
}) {
  return (
    <div className="nonResponder py-1">
      <div className="d-flex justify-content-between">
        <small className="m-0">ID: {idNo}</small>
        <small>{mobile}</small>
        <p>{nonResponderName}</p>
      </div>
      <p className="m-0">
        <span className="font-weight-bold">{recipientName}</span> wrote:{' '}
        <span className="font-italic">{messageBody}</span>
      </p>
    </div>
  )
}