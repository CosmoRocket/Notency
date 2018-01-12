import React from 'react'
import { Icon } from 'react-fa'
import './Notification.css'

export default function Notification({ title, body, sentAt, responses }) {
  return (
    <div className="Notification py-1">
      <div className="d-flex justify-content-between">
        <small className="m-0">{sentAt}</small>
        {responses && (
          <small>
            <Icon className="text-success mr-2" name="mail-reply" />
            {responses}
          </small>
        )}
      </div>
      <p className="m-0 font-weight-bold">{title}</p>
    </div>
  )
}
