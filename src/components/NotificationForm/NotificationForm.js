import React from 'react'
import './NotificationForm.css'
import Button from '../../components/Button'
import Input from '../../components/Input'
import { Link } from 'react-router-dom'

export default function NotificationForm({
  subject,
  handleMessageChange,
  textBody
}) {
  // Listener for char length in SMS body / text area
  

  return (
  <form
    onSubmit={ event => {
      event.preventDefault()

      const subject = event.target.elements.subject.value
      const textBody = event.target.elements.textBody.value

      const notification = {
        subject,
        textBody
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
      <input type='radio' id='roleChoice' name='groupSelect' value='role'/> 
      <label htmlFor="roleChoice">Role</label>
    </div>
    {/* INPUT FOR SMS SUBJECT */}
    <Input 
    name='subject'
    placeholder="Subject"
    />
    {/* TEXT AREA FOR SMS BODY (restrict input to <160 chars) */}
      <textarea name="textBody" id="textBody" rows='10' maxLength='160'></textarea>
    {/* BOTTOM BUTTONS */}
    <div className="formActions">
      <Link className="formBack" to="/">Back</Link>
      {/* Char validation for textarea */}
      {/* <p id='charLength'>Characters used: ${textLength}/160</p> */}
      <Button className='sendButton' text="SEND"/>
    </div>
  </form>
  )
}
