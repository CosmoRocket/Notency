import React, { Component, Fragment } from 'react'
import NotificationForm from '../components/NotificationForm'

export default function CreateNotificationPage({ recipients }) {
  return (
    <Fragment>
      <NotificationForm recipients={recipients} />
    </Fragment>
  )
}
