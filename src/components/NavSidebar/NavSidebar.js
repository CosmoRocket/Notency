import React from 'react'
import pic from './embassy_english.png'
import './NavSidebar.css'

const NavSidebar = () => {
  return (
    <nav className="NavSidebar">
      <ul class="nav flex-column">
        <li class="nav-item">
          <a class="nav-link" href="#">
            <img src={pic} alt="Embassy English Logo" />
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">
            Create Broadcast
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">
            Sent Broadcasts
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">
            Mailing List
          </a>
        </li>
      </ul>
    </nav>
  )
}

export default NavSidebar
