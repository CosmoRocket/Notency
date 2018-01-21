import React, { Fragment } from 'react'
import './HomePage.css'
import TabbedNav from '../components/TabbedNav'
import Notification from '../components/Notification'
import Announcement from '../components/Announcement'
import { Link } from 'react-router-dom'
import Button from '../components/Button'
import { Icon } from 'react-fa'

const HomePage = ({
  notifications,
  announcements,
  handleChangeActiveTab,
  handleLoadMore,
  activeTab
}) => {
  const notificationsList = notifications.map(notification => {
    return (
      <Notification
        {...notification}
        key={notification._id}
        responses={notification.responses.length}
        recipients={notification.recipients.length}
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
          () => <p className="m-0"><Icon name="bell"/> Emergency Notifications</p>,
          () => <p className="m-0"><Icon name="bullhorn"/> General Announcements</p>
        ]}
        handleChangeActiveTab={handleChangeActiveTab}
      />
      {activeTab === 0 ? (
        // <button className="primaryButton"></button>
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
          text="Show All"
        />
      </div>
    </Fragment>
  )
}

export default HomePage
