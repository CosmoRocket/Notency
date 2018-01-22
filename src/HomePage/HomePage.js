import React, { Component, Fragment } from 'react'
import './HomePage.css'
import TabbedNav from '../components/TabbedNav'
import Notification from '../components/Notification'
import Announcement from '../components/Announcement'
import { Link } from 'react-router-dom'
import Button from '../components/Button'
import isEmpty from 'lodash/isEmpty'
import Pusher from 'pusher-js'

class HomePage extends Component {
  componentDidMount() {
    const { loadAppData } = this.props

    loadAppData()

    Pusher.logToConsole = true
    const pusher = new Pusher('5c395da69c6cefb9c67d', {
      cluster: 'ap1',
      encrypted: true
    })

    const channel = pusher.subscribe('notency-channel')
    channel.bind('notency-receive-response', data => {
      loadAppData()
    })
  }

  render() {
    const {
      notifications,
      announcements,
      handleChangeActiveTab,
      handleLoadMore,
      activeTab,
      showButtonText
    } = this.props

    if (activeTab === 0 && !isEmpty(notifications) || activeTab === 1 && !isEmpty(announcements)) {
      const notificationsList = notifications.map(notification => {
        return (
          <Notification
            {...notification}
            key={notification._id}
            responses="10/60"
          />
        )
      })
      const announcementsList = announcements.map(announcement => {
        return <Announcement {...announcement} key={announcement._id} />
      })
      return (
        <Fragment>
          <TabbedNav
            activeTab={activeTab}
            tabs={[
              () => <p className="m-0">Emergency Notifications</p>,
              () => <p className="m-0">General Announcements</p>
            ]}
            handleChangeActiveTab={handleChangeActiveTab}
          />
          {activeTab === 0 ? (
            <Link
              to="/new_notification"
              className="btn btn-danger text-uppercase font-weight-bold my-2"
            >
              New Notification
            </Link>
          ) : (
              <Link
                to="/new_announcement"
                className="btn btn-danger text-uppercase font-weight-bold my-2"
              >
                New Announcement
            </Link>
            )}

          {activeTab === 0 ? notificationsList : announcementsList}
          {/* Show All Button */}
          <div className="showAllButton">
            <Button
              onClick={() => {
                handleLoadMore(activeTab)
              }}
              text={showButtonText}
            />
          </div>
        </Fragment>
      )
    } else {
      return <div>Loading notifications and announcements...</div>
    }
  }
}

export default HomePage
