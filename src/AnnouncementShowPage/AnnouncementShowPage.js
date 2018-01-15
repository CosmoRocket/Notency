import React, { Component } from 'react'
import ContentContainer from '../components/ContentContainer'
import MobileNav from '../components/MobileNav'
import DesktopNav from '../components/DesktopNav'
import TabbedNav from '../components/TabbedNav'
import Message from '../components/Message'
import moment from 'moment'
import { Link } from 'react-router-dom'

class AnnouncementShowPage extends Component {
  state = {
    currentAnnouncement: {}
  }

  componentDidMount() {
    const { announcements, location } = this.props
    const currentAnnouncement = announcements.find(announcement => {
      return announcement.id === location.pathname.split('/').slice(-1)[0]
    })

    this.setState({ currentAnnouncement })
  }

  render() {
    const { currentAnnouncement } = this.state

    return (
      <div>
        <MobileNav />
        <div className="d-flex">
          <DesktopNav />
          <ContentContainer>
            <p className="text-right">
              {moment(currentAnnouncement.sentAt).format('D MMM YYYY')}
            </p>
            <h2 className="text-center">{currentAnnouncement.title}</h2>
            <p>{currentAnnouncement.body}</p>
            <Link to="/">Back</Link>
          </ContentContainer>
        </div>
      </div>
    )
  }
}

export default AnnouncementShowPage
