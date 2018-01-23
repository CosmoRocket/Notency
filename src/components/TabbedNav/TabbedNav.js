import React from 'react'
import './TabbedNav.css'

export default function TabbedNav({ handleChangeActiveTab, activeTab, tabs }) {
  const navTabs = tabs.map((TabContent, index) => {
    return (
      <li
        key={index}
        className="nav-item tabbed-nav-link"
        onClick={() => handleChangeActiveTab(index)}
      >
        <a className={`nav-link ${activeTab === index && 'active'}`}>
          <TabContent />
        </a>
      </li>
    )
  })
  return (
    <nav>
      <ul className="nav nav-tabs d-flex nav-fill">{navTabs}</ul>
    </nav>
  )
}
