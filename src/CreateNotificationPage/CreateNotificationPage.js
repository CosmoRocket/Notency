import React, { Component, Fragment } from 'react'
import NotificationForm from '../components/NotificationForm'

export default function CreateNotificationPage({ recipients, handleCreateNotification }) {
  return (
    <Fragment>
      <NotificationForm recipients={recipients}
        handleCreateNotification={handleCreateNotification}
      />
    </Fragment>
  )
}
