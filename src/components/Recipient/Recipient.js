import React from 'react'
import './Recipient.css'
import { Icon } from 'react-fa'

const Recipient = ({ recipient }) => {
  return (
    <div className="Recipient p-2">
      <div className="font-weight-bold ">
        {recipient.firstName} {recipient.lastName}
      </div>
      <div className="row">
        <div className="col-md-3 d-flex align-items-center">
          <Icon name="user" className="recipient-icon text-center" />{' '}
          <p className="m-0 p-0">{recipient.idNo}</p>
        </div>
        <div className="col-md-3 d-flex align-items-center">
          <Icon name="mobile" className="mr-1 recipient-icon text-center" />
          <a href={`tel:${recipient.mobile}`}>{recipient.mobile}</a>
        </div>
        <div className="col-md-6 d-flex align-items-center">
          <Icon name="envelope" className="mr-1 recipient-icon text-center" />
          <a href={`mailto:${recipient.email}`}>{recipient.email}</a>
        </div>
      </div>
    </div>
  )
}

export default Recipient
