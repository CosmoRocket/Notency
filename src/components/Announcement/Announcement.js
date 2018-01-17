import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import './Announcement.css'

export default function Announcement({
  _id,
  subject,
  body,
  createdAt,
  responses
}) {
  return (
    <div className="Announcement py-1">
      <Link to={`/announcements/${_id}`}>
        <div className="d-flex justify-content-between">
          <small className="m-0">
            {moment(createdAt).format('D MMM YYYY')}
          </small>
        </div>
        <p className="m-0 font-weight-bold">{subject}</p>
      </Link>
    </div>
  )
}
