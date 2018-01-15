import React, { Component } from 'react'
import ContentContainer from '../components/ContentContainer'
import MobileNav from '../components/MobileNav'
import DesktopNav from '../components/DesktopNav'
import TabbedNav from '../components/TabbedNav'

class NotificationShowPage extends Component {
  state = {}
  render() {
    const { activeTab } = this.props
    return (
      <div>
        <MobileNav />
        <div className="d-flex">
          <DesktopNav />
          <ContentContainer />
        </div>
      </div>
    )
  }
}

export default NotificationShowPage
