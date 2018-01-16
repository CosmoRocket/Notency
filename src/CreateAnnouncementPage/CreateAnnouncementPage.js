import React, { Component, Fragment } from 'react'
import AnnouncementForm from '../components/AnnouncementForm'

export default function CreateAnnouncementPage({
  handleContentStateChange,
  contentState
}) {
  return (
    <Fragment>
      <AnnouncementForm
        contentState={contentState}
        handleContentStateChange={handleContentStateChange}
        // handleCreateAnnouncement={handleCreateAnnouncement}
      />
    </Fragment>
  )
}
