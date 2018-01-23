import React from 'react'
import './Message.css'
import { Icon } from 'react-fa'

export default function Message({
  recipientId,
  contactNumber,
  contactEmail,
  recipientName,
  messageBody
}) {
  return (
    <div className="Message py-1 d-md-flex justify-content-between">
      <p className="m-0">
        <span className="font-weight-bold">{recipientName}</span> wrote:{' '}
        <span className="font-italic">{messageBody}</span>
      </p>
      <div>
        <div>
          <Icon className="recipient-icon text-center" name="mobile" />
          <a href={`tel:${contactNumber}`}>{contactNumber}</a>
        </div>
        <div>
          <Icon className="recipient-icon text-center" name="envelope" />
          <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
        </div>
      </div>
    </div>
  )
}
