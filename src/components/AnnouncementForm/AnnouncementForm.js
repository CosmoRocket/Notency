import React from 'react'
import './AnnouncementForm.css'
import { Editor } from 'react-draft-wysiwyg'
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import draftToHtml from 'draftjs-to-html'

export default function AnnouncementForm({
  subject,
  contentData,
  // onCreateAnnouncement
}) {
  return (
  <form
    onSubmit={ event => {
      event.preventDefault()

      const subject = event.target.elements.subject.value
      const contentData = draftToHtml(contentState)

      const announcement = {
        subject: subject,
        contentData: contentData
      }

      // this.onCreateAnnouncement(announcement)
    }}
    >
    <Input 
      type='subject'
      name='subject'
      placeholder="Subject"
      />
    <Editor
      onContentStateChange={this.onContentStateChange}
      />
    <Button text="SEND"/>
  </form>
  )
}
