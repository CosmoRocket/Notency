import React from 'react'
import './Message.css'

export default function Message({
  recipientId,
  contactNumber,
  recipientName,
  messageBody
}) {
  return (
    <div className="Message py-1">
      <div className="d-flex justify-content-between">
        <small className="m-0">ID: {recipientId}</small>
        <small>{contactNumber}</small>
      </div>
      <p className="m-0">
        <span className="font-weight-bold">{recipientName}</span> wrote:{' '}
        <span className="font-italic">{messageBody}</span>
      </p>
    </div>
  )
}
