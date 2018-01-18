import React, { Fragment } from 'react'
import AnnouncementForm from '../components/AnnouncementForm'

export default function CreateAnnouncementPage({
  recipients,
  handleCreateAnnouncement
}) {
  return (
    <Fragment>
      <AnnouncementForm
        recipients={recipients}
        handleCreateAnnouncement={handleCreateAnnouncement}
      />
    </Fragment>
  )
}
