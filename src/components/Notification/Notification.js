import React from 'react'
import { Icon } from 'react-fa'
import './Notification.css'
import { Link } from 'react-router-dom'
import moment from 'moment'

export default function Notification({
  _id,
  subject,
  body,
  createdAt,
  responses
}) {
  return (
    <div className="Notification py-1">
      <Link to={`/notifications/${_id}`}>
        <div className="d-flex justify-content-between">
          <small className="m-0">
            {moment(createdAt).format('D MMM YYYY')}
          </small>
          <small data-tip data-for='notification' >
            {responses}% Responded
          </small>
        </div>
        <p className="m-0 font-weight-bold"><Icon name="bell" /> {subject}</p>
      </Link>
    </div>
  )
}
