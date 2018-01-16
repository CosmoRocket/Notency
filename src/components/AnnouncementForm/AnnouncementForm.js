import React from 'react'
import './AnnouncementForm.css'
import { Editor } from 'react-draft-wysiwyg'
import Button from '../../components/Button'
import Input from '../../components/Input'
import draftToHtml from 'draftjs-to-html'
import { Link } from 'react-router-dom'

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

    {/* RADIO BUTTONS - select all or by group */}
      <div className="radioMenu">
        <p>To: </p>
        <input type='radio' id='allChoice' name='groupSelect' value='all'/> 
        <label htmlFor="allChoice">All</label>
        <input type='radio' id='nationalityChoice' name='groupSelect' value='nationality'/>
        <label htmlFor="nationalityChoice">Nationality</label>
        <input type='radio' id='roleChoice' name='groupSelect' value='role'/> 
        <label htmlFor="roleChoice">Role</label>
        <input type='radio' id='gradDateChoice' name='groupSelect' value='gradDate'/>
        <label htmlFor="gradDateChoice">Grad Date</label>
      </div>
    {/* INPUT FOR EMAIL SUBJECT */}
    <Input 
      type='subject'
      name='subject'
      placeholder="Subject"
      />
      {/* REACT-EDITOR COMPONENT (Pass options in as props) */}
    <Editor
      wrapperClassName='editorSection'
      editorClassName='wrapperSection'
      handleContentStateChange={handleContentStateChange}
      toolbar={{
        options: ['inline', 'blockType', 'fontSize', 'fontFamily']
      }}
      />
      {/* BOTTOM BUTTONS */}
    <div className="formActions">
      <Link className="formBack" to="/">Back</Link>
      <Button className='sendButton' text="SEND"/>
    </div>
  </form>
  )
}
