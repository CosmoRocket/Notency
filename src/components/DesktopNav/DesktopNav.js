import React from 'react'
import pic from './embassy_english.png'
import './DesktopNav.css'
import { Link } from 'react-router-dom'
import { Icon } from 'react-fa'

const DesktopNav = ({ onSignOut }) => {
  return (
    <nav className="DesktopNav d-none d-sm-block">
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link className="nav-link" to="/">
            <img className="logo" src={pic} alt="Embassy English Logo" />
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/">
            <Icon name="home" /> Home
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/update_contacts">
          <Icon name="upload" /> Update Contacts
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/logout" onClick={onSignOut}>
          <Icon name="sign-out" /> Logout
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default DesktopNav
