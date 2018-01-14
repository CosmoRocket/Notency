import React from 'react'

export default function TabbedNav({ handleChangeActiveTab, activeTab, tabs }) {
  const navTabs = tabs.map((TabContent, index) => {
    return (
      <li class="nav-item" onClick={() => handleChangeActiveTab(index)}>
        <a class={`nav-link ${activeTab === index && 'active'}`} href="#">
          <TabContent />
        </a>
      </li>
    )
  })
  return (
    <nav>
      <ul class="nav nav-tabs d-flex">{navTabs}</ul>
    </nav>
  )
}
