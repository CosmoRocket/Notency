import React from 'react'
import './NonResponder.css'

export default function NonResponder({
  idNo,
  nonResponderName,
  mobile,
  email
}) {
  return (
    <div className="NonResponder py-1">
      <div>
        <p className="m-0">{nonResponderName}</p>
        <small>ID: {idNo}</small>
      </div>
      <div className="d-flex justify-content-around">
        <small>{mobile}</small>
        <small>{email}</small>
      </div>
    </div>
  )
}