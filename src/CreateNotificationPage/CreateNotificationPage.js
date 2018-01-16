import React, { Component, Fragment } from 'react'
import NotificationForm from '../components/NotificationForm'

export default function CreateNotificationPage({
  handleMessageChange,
  textBody
})  {
  return(
      <Fragment>
        <NotificationForm
          textBody={textBody}
          handleMessageChange={handleMessageChange}
          // handleCreateNotification={handleCreateNotification}
        />
      </Fragment>
  )
}
