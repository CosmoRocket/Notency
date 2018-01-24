import React from 'react'
import './Message.css'
import { Icon } from 'react-fa'
import ReactTooltip from 'react-tooltip'

export default function Message({
  recipientId,
  contactNumber,
  contactEmail,
  recipientName,
  messageBody
}) {
  return (

    <div className="Message">
      <p className="px-2 m-0 font-weight-bold">
        {recipientName}
        <a href={`tel:${contactNumber}`} className='mx-2'>
          <Icon className="recipient-icon text-center" name="phone" data-tip data-for='tooltip1' />
          <ReactTooltip id='tooltip1' place="right" type="light" effect="solid" delayHide={200}>
            {contactNumber}
          </ReactTooltip>
        </a>
        <a href={`mailto:${contactEmail}`}>
          <Icon className="recipient-icon text-center" name="envelope" data-tip data-for='tooltip2' className='align-text-top' />
          <ReactTooltip id='tooltip2' place="right" type="light" effect="solid">
            {contactEmail}
          </ReactTooltip>
        </a>
      </p>
      <p className='font-italic'>
        {messageBody}
      </p>
    </div>
  )
}
