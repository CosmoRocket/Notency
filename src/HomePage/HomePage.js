import React, { Component, Fragment } from 'react'
import './HomePage.css'
import TabbedNav from '../components/TabbedNav'
import Notification from '../components/Notification'
import Announcement from '../components/Announcement'
import { Link } from 'react-router-dom'
import Button from '../components/Button'
import isEmpty from 'lodash/isEmpty'

class HomePage extends Component {
  state = {
    text: 'Show All'
  }
  componentDidMount() {
    this.props.loadAppData()
  }

  render() {
    const { text } = this.state
    const {
      notifications,
      announcements,
      handleChangeActiveTab,
      handleLoadMore,
      activeTab
    } = this.props

    if (!isEmpty(notifications) || !isEmpty(announcements)) {
      const notificationsList = notifications.map(notification => {
        return (
          <Notification
            {...notification}
            key={notification._id}
            responses={`${notification.responses.length}/${notification.recipients.length}`}
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
                this.state.text === 'Show All' ? this.setState({ text: 'Hide' })
                  : this.setState({ text: 'Show All' })
              }}
              text={text}
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
