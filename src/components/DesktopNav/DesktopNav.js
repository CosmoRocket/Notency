import React from 'react'
import pic from './embassy_english.png'
import './DesktopNav.css'
import { Link, NavLink } from 'react-router-dom'
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
          <NavLink 
            exact={true}
            className="nav-link"
            activeClassName="selected"
            to="/"
          >
            <Icon name="home" /> Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink 
            exact={true}
            className="nav-link" 
            activeClassName="selected"
            to="/update_contacts"
          >
            <Icon name="cloud-upload" /> Update Contacts
          </NavLink>
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
