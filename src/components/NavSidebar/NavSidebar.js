import React from 'react'
import logo from './embassy_english.png'
import './NavSidebar.css'

const NavSidebar = () => {
  return (
    <nav className="NavSidebar">
      <ul class="nav flex-column">
        <li class="nav-item">
          <a class="nav-link" href="#">
            <img className="logo" src={logo} alt="Embassy English Logo" />
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

export default NavSidebar
