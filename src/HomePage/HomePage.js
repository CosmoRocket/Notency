import React, { Fragment } from 'react'
import './HomePage.css'
import TabbedNav from '../components/TabbedNav'
import Notification from '../components/Notification'
import Announcement from '../components/Announcement'
import { Link } from 'react-router-dom'
import Button from '../components/Button'

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
      <form 
        className='showAllButton'
        onSubmit={ () => { 
        handleLoadMore(activeTab) 
      }}
      >
        <Button 
          text='Show All'
        />
      </form>
    </Fragment>
  )
}

export default HomePage
