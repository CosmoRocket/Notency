import React from 'react'
import './NotificationForm.css'
import Button from '../../components/Button'
import Input from '../../components/Input'
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
      const body = event.target.elements.textBody.value

      const notification = {
        subject,
        body
      }

      this.handleCreateNotification(notification)
    }}
    >

    {/* RADIO BUTTONS - select all or by group */}
    <div className="radioMenu">
      <p>To: </p>
      <input type='radio' id='allChoice' name='groupSelect' value='all'/> 
      <label htmlFor="allChoice">All</label>
      <input type='radio' id='nationalityChoice' name='groupSelect' value='nationality'/>
      <label htmlFor="nationalityChoice">Nationality</label>
    </div>
    {/* INPUT FOR SMS SUBJECT */}
    <Input 
    name='subject'
    placeholder="Subject"
    />
    {/* TEXT AREA FOR SMS BODY (restrict input to <160 chars) */}
      <textarea name="textBody" id="textBody" cols="30" rows="10"></textarea>
    {/* BOTTOM BUTTONS */}
    <div className="formActions">
      <Link className="formBack" to="/">Back</Link>
      <Button className='sendButton' text="SEND"/>
    </div>
  </form>
  )
}
