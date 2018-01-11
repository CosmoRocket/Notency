import React from 'react'

export default function Nav({ handleChangeActiveTab }) {
  return (
    <nav>
      <ul class="d-sm-none">
        <li>
          <a>Emergency Notifications</a>
        </li>
        <li>
          <a>Announcements</a>
        </li>
      </ul>

      <ul class="nav nav-tabs d-none d-sm-flex">
        <li class="nav-item" onClick={() => handleChangeActiveTab(0)}>
          <a class="nav-link active" href="#">
            Emergency Notifications
          </a>
        </li>
        <li class="nav-item" onClick={() => handleChangeActiveTab(1)}>
          <a class="nav-link active" href="#">
            Announcements
          </a>
        </li>
      </ul>
    </nav>
  )
}
