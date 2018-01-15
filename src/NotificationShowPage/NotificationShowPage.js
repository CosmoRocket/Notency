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
          <ContentContainer>
            <TabbedNav
              activeTab={activeTab}
              tabs={[
                () => (
                  <div className="text-center text-success">
                    <p className="m-0">Positive</p>
                    <p className="m-0">10/60</p>
                  </div>
                ),
                () => (
                  <div className="text-center text-danger">
                    <p className="m-0">Negative</p>
                    <p className="m-0">10/60</p>
                  </div>
                ),
                () => (
                  <div className="text-center">
                    <p className="m-0">No Response</p>
                    <p className="m-0">10/60</p>
                  </div>
                )
              ]}
              handleChangeActiveTab={this.handleChangeActiveTab}
            />
          </ContentContainer>
        </div>
      </div>
    )
  }
}

export default NotificationShowPage
