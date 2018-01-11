import React from 'react'
import Nav from './Nav'
import Notification from './Notification'

class Home extends React.Component {
  state = {
    activeTab: 0
  }

  handleChangeActiveTab = index => {
    this.setState({ activeTab: index })
  }

  render() {
    const { notifications, announcements } = this.props
    const notificationsList = notifications.map(notification => {
      return <Notification {...notification} />
    })
    const announcementsList = announcements.map(announcement => {
      return <Notification {...announcement} />
    })
    return (
      <div>
        <Nav handleChangeActiveTab={this.handleChangeActiveTab} />
        {this.state.activeTab === 0 ? notificationsList : announcementsList}
      </div>
    )
  }
}

export default Home
