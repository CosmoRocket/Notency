import React from 'react'
import TabbedNav from '../components/TabbedNav'
import Notification from '../components/Notification'
import Button from '../components/Button'
import Message from '../components/Message'
import MobileNav from '../components/MobileNav'
import Checkbox from '../components/Checkbox'

class HomePage extends React.Component {
  state = {
    activeTab: 0
  }

  handleChangeActiveTab = index => {
    this.setState({ activeTab: index })
  }

  render() {
    const { notifications, announcements } = this.props
    const { activeTab } = this.state
    const notificationsList = notifications.map(notification => {
      return <Notification {...notification} responses="10/60" />
    })
    const announcementsList = announcements.map(announcement => {
      return <Notification {...announcement} />
    })
    return (
      <div>
        <TabbedNav
          activeTab={activeTab}
          tabs={[
            () => <p className="m-0">Emergency Notifications</p>,
            () => <p className="m-0">General Announcements</p>
          ]}
          handleChangeActiveTab={this.handleChangeActiveTab}
        />
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
        {this.state.activeTab === 0 ? notificationsList : announcementsList}
        <Message
          recipientId="123891273"
          contactNumber="0476143646"
          recipientName="John Voon"
          messageBody="OK"
        />
        <MobileNav />

        <div className="d-flex justify-content-between">
          <Checkbox />
          <a>Forgot your password</a>
        </div>
      </div>
    )
  }
}

export default HomePage
