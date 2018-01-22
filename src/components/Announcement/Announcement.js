import React from 'react'
import { Link } from 'react-router-dom'
import { Icon } from 'react-fa'
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
        <div>
          <small>
            {moment(createdAt).format('D MMM YYYY')}
          </small>
        </div>
        <p className="m-0 font-weight-bold"><Icon className="text-success mr-2" name="bullhorn" />{subject}</p>
      </Link>
    </div>
  )
}
