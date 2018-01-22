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
  responses,
  recipients
}) {
  return (
    <div className="Notification py-1">
      <Link to={`/notifications/${_id}`}>
        <div className="d-flex">
          <small className="m-0">
            {moment(createdAt).format('D MMM YYYY')}
          </small>
        </div>
        <div className="d-flex justify-content-between">
          <p className="m-0 font-weight-bold"><Icon className="text-success mr-2" name="bell" />{subject}</p>
          <div className="responsesBlock">
            <p>
              <Icon className="text-success mr-2" name="mail-reply" />
              {`${responses} / ${recipients}`}
            </p>
          </div>
        </div>
      </Link>
    </div>
  )
}
