import React from 'react'
import TabbedNav from '../components/TabbedNav'
import Notification from '../components/Notification'
import Announcement from '../components/Announcement'
import Button from '../components/Button'
import Message from '../components/Message'
import MobileNav from '../components/MobileNav'
import DesktopNav from '../components/DesktopNav'
import Checkbox from '../components/Checkbox'
import ContentContainer from '../components/ContentContainer'
import { Link } from 'react-router-dom'

const HomePage = ({
  notifications,
  announcements,
  handleChangeActiveTab,
  activeTab
}) => {
  const notificationsList = notifications.map(notification => {
    return <Notification {...notification} responses="10/60" />
  })
  const announcementsList = announcements.map(announcement => {
    return <Announcement {...announcement} />
  })
  return (
    <div>
      <MobileNav />
      <div className="d-flex">
        <DesktopNav />
        <ContentContainer>
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
              to="/notifications/new"
              className="btn btn-danger text-uppercase font-weight-bold my-2"
            >
              New Notification
            </Link>
          ) : (
              <Link
                to="/announcements/new"
                className="btn btn-danger text-uppercase font-weight-bold my-2"
              >
                New Announcement
            </Link>
            )}

          {activeTab === 0 ? notificationsList : announcementsList}
        </ContentContainer>
      </div>
    </div>
  )
}

export default HomePage
