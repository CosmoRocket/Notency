import React, { Component, Fragment } from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'

class AnnouncementShowPage extends Component {
  state = {
    currentAnnouncement: {}
  }

  componentDidMount() {
    const { announcements, match } = this.props
    const currentAnnouncement = announcements.find(announcement => {
      return announcement.id === match.params.id
    })

    this.setState({ currentAnnouncement })
  }

  render() {
    const { currentAnnouncement } = this.state

    return (
      <Fragment>
        <p className="text-right">
          {moment(currentAnnouncement.createdAt).format('D MMM YYYY')}
        </p>
        <h2 className="text-center">{currentAnnouncement.subject}</h2>
        <p>{currentAnnouncement.body}</p>
        <Link to="/">Back</Link>
      </Fragment>
    )
  }
}

export default AnnouncementShowPage
