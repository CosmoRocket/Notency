import React from 'react'
import { Link } from 'react-router-dom'
import { Icon } from 'react-fa'
import moment from 'moment'
import './Announcement.css'

export default function Announcement({
  _id,
  subject,
  bodyHtml,
  createdAt,
  responses
}) {
  
  // strips html tags and then truncates remaining string
  const truncateBody = bodyHtml => {
    if (bodyHtml.length < 60)
      return bodyHtml.replace(/<([^>]+)>/g,"")
    else
      return bodyHtml.replace(/<([^>]+)>/g,"").substring(0, 60) + '...'
  }

  return (
    <div className="Announcement py-1">
      <Link to={`/announcements/${_id}`}>
        <div>
          <small>
            {moment(createdAt).format('D MMM YYYY')}
          </small>
        </div>
        <p className="m-0 font-weight-bold"><Icon className="text-success mr-2" name="bullhorn" />{subject} <small>{truncateBody(bodyHtml)}</small></p>
      </Link>
    </div>
  )
}
