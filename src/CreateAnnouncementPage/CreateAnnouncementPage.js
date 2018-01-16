import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import AnnouncementForm from '../components/AnnouncementForm'
// react-draft-wysywig + dependencies
import { Editor } from 'react-draft-wysiwyg'
import '../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import draftToHtml from 'draftjs-to-html'
// ------
export default function CreateAnnouncementPage({
  handleContentStateChange,
  contentState
}) {
  return (
    <Fragment>
      <AnnouncementForm
        contentState={contentState}
        handleContentStateChange={handleContentStateChange}
      />
    </Fragment>
  )
}
