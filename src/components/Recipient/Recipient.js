import React from 'react'
import './Recipient.css'
import { Icon } from 'react-fa'

const Recipient = ({ recipient }) => {
  return (
    <div className="Recipient p-2">
      <div className="font-weight-bold ">
        {recipient.firstName} {recipient.lastName}
      </div>
      <div className="d-md-flex justify-content-between">
        <p className="m-0 p-0">
          <Icon name="user" /> {recipient.idNo}
        </p>
        <p className="m-0 p-0">
          <Icon name="mobile" /> {recipient.mobile}
        </p>
        <p className="m-0 p-0">
          <Icon name="envelope" /> {recipient.email}
        </p>
      </div>
    </div>
  )
}

export default Recipient
