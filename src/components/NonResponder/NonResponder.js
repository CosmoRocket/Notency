import React from 'react'
import './NonResponder.css'
import { Icon } from 'react-fa'

export default function NonResponder({
  idNo,
  nonResponderName,
  mobile,
  email
}) {
  return (
<div className="NonResponder p-2">
  <div className="font-weight-bold ">
    {nonResponderName}
  </div>
  <div className="d-md-flex justify-content-between">
    <div className="d-flex align-items-center">
      <Icon name="user" className="recipient-icon text-center" />{' '}
      <p className="m-0 p-0">{idNo}</p>
    </div>
    <div className="d-flex align-items-center">
      <Icon name="mobile" className="mr-1 recipient-icon text-center" />
      <a href={`tel:${mobile}`}>{mobile}</a>
    </div>
    <div className="d-flex align-items-center">
      <Icon name="envelope" className="mr-1 recipient-icon text-center" />
      <a href={`mailto:${email}`}>{email}</a>
    </div>
  </div>
</div>
  )
}