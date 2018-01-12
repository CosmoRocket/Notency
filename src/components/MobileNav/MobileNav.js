import React from 'react'
import { Icon } from 'react-fa'
import './MobileNav.css'

export default function MobileNav({}) {
  return (
    <nav>
      <ul className="mobile-nav-list d-flex justify-content-between">
        <li className="mobile-nav-item m-0 p-0 text-center">
          <a>
            <Icon size="2x" name="home" />
            <p className="mobile-nav-item-text text-uppercase">Home</p>
          </a>
        </li>
        <li className="mobile-nav-item m-0 p-0 text-center">
          <a>
            <Icon size="2x" name="home" />
            <p className="mobile-nav-item-text text-uppercase">
              Upload Contacts
            </p>
          </a>
        </li>
        <li className="mobile-nav-item m-0 p-0 text-center">
          <a>
            <Icon size="2x" name="home" />
            <p className="mobile-nav-item-text text-uppercase">Logout</p>
          </a>
        </li>
      </ul>
    </nav>
  )
}
