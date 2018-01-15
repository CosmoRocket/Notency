import React from 'react'
import pic from './embassy_english.png'
import './DesktopNav.css'
import { Link } from 'react-router-dom'

const DesktopNav = () => {
  return (
    <nav className="DesktopNav d-none d-sm-block">
      <ul class="nav flex-column">
        <li class="nav-item">
          <Link class="nav-link" to="/">
            <img className="logo" src={pic} alt="Embassy English Logo" />
          </Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link" to="/">
            Home
          </Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link" to="update_contacts">
            Update Contacts
          </Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link" to="logout">
            Logout
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default DesktopNav
