import React, { Component, Fragment } from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { groupBy } from 'ramda'

class AnnouncementShowPage extends Component {
  state = {
    currentAnnouncement: {}
  }

  componentDidMount() {
    const { announcements, match } = this.props
    const currentAnnouncement = announcements.find(announcement => {
      return announcement._id === match.params.id
    })

    this.setState({ currentAnnouncement })
  }

  render() {
    const { currentAnnouncement } = this.state
    const capitalize = string =>
      string.charAt(0).toUpperCase() + string.slice(1)
    const categories =
      currentAnnouncement.groups &&
      groupBy(group => group.name)(currentAnnouncement.groups)
    const groupElements =
      currentAnnouncement.groups &&
      Object.keys(categories).map(category => (
        <p>
          {capitalize(category)}:{' '}
          {categories[category].map(group => group.selected).join(', ')}
        </p>
      ))

    return (
      <Fragment>
        <p className="text-right">
          {moment(currentAnnouncement.createdAt).format('D MMM YYYY')}
        </p>
        {
          groupElements === '' ? <p>Groups Sent To: {groupElements}</p> : <p>Sent to All</p>
        }
        <h2 className="text-center">{currentAnnouncement.subject}</h2>
        <div
          dangerouslySetInnerHTML={{ __html: currentAnnouncement.bodyHtml }}
        />
        <Link to="/">Back</Link>
      </Fragment>
    )
  }
}

export default AnnouncementShowPage
