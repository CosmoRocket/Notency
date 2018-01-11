import React from 'react'

export default function Notification({ title, body, sentAt }) {
  return (
    <div>
      <h2>{title}</h2>
      <p>{sentAt}</p>
      <p>{body}</p>
    </div>
  )
}
