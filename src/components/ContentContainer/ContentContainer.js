import React from 'react'
import MobileNav from '../MobileNav'
import DesktopNav from '../DesktopNav'
import './ContentContainer.css'

const ContentContainer = ({ onSignOut, children }) => {
  return (
    <div>
      <MobileNav onSignOut={onSignOut} />
      <div className="d-flex">
        <DesktopNav onSignOut={onSignOut} />
        <div className="ContentContainer">{children}</div>
      </div>
    </div>
  )
}

export default ContentContainer
