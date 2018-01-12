import React from 'react'
import pic from './embassy_english.png'
import './DesktopNav.css'

const DesktopNav = () => {
  return (
    <nav className="DesktopNav">
      <ul class="nav flex-column">
        <li class="nav-item">
          <a class="nav-link" href="#">
            <img className="logo" src={pic} alt="Embassy English Logo" />
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">
            Home
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">
            Update Contacts
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">
            Logout
          </a>
        </li>
      </ul>
    </nav>
  )
}

export default DesktopNav
