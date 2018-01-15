import React from 'react'
import { Icon } from 'react-fa'
import './MobileNav.css'
import { Link } from 'react-router-dom'

export default function MobileNav({}) {
  return (
    <nav>
      <ul className="mobile-nav-list d-sm-none d-flex justify-content-between">
        <li className="mobile-nav-item m-0 p-0 text-center">
          <Link to="/">
            <Icon size="2x" name="home" />
            <p className="mobile-nav-item-text text-uppercase">Home</p>
          </Link>
        </li>
        <li className="mobile-nav-item m-0 p-0 text-center">
          <Link to="/update_contacts">
            <Icon size="2x" name="upload" />
            <p className="mobile-nav-item-text text-uppercase">
              Update Contacts
            </p>
          </Link>
        </li>
        <li className="mobile-nav-item m-0 p-0 text-center">
          <Link to="logout">
            <Icon size="2x" name="sign-out" />
            <p className="mobile-nav-item-text text-uppercase">Logout</p>
          </Link>
        </li>
      </ul>
    </nav>
  )
}
