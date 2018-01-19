import React, { Component, Fragment } from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { groupBy } from 'ramda'
import capitalize from 'lodash/capitalize'
import isEmpty from 'lodash/isEmpty'

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
    if (!isEmpty(currentAnnouncement)) {
      const categories = groupBy(group => group.name)(
        currentAnnouncement.groups
      )
      const groupElements = Object.keys(categories).map(category => (
        <div key={category}>
          {capitalize(category)}:{' '}
          {categories[category].map(group => group.item).join(', ')}
        </div>
      ))

      return (
        <Fragment>
          <p className="text-right">
            {moment(currentAnnouncement.createdAt).format('D MMM YYYY')}
          </p>
          {isEmpty(groupElements) ? (
            <div>Sent to All</div>
          ) : (
            <div>Groups Sent To: {groupElements}</div>
          )}
          <h2 className="text-center">{currentAnnouncement.subject}</h2>
          <div
            dangerouslySetInnerHTML={{ __html: currentAnnouncement.bodyHtml }}
          />
          <Link to="/">Back</Link>
        </Fragment>
      )
    } else {
      return <div>Loading</div>
    }
  }
}

export default AnnouncementShowPage
