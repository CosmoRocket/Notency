import React from 'react'
import './AnnouncementForm.css'

export default function AnnouncementForm({
  subject,
  handleContentStateChange,
  contentState
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

      this.handleCreateAnnouncement(announcement)
    }}
    >

    {/* INPUT FOR EMAIL SUBJECT */}
    <Input 
      type='subject'
      name='subject'
      placeholder="Subject"
      />
      {/* REACT-EDITOR COMPONENT (Pass options in as props) */}
    <Editor
      onContentStateChange={this.onContentStateChange}
      />
    <Button text="SEND"/>
  </form>
  )
}
