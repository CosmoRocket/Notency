import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import './Announcement.css'

export default function Announcement({ id, title, body, sentAt, responses }) {
  return (
    <div className="Announcement py-1">
      <Link to={`/announcements/${id}`}>
        <div className="d-flex justify-content-between">
          <small className="m-0">{moment(sentAt).format('D MMM YYYY')}</small>
        </div>
        <p className="m-0 font-weight-bold">{title}</p>
      </Link>
    </div>
  )
}
