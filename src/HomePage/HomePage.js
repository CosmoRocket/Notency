import React, { Component, Fragment } from 'react'
import './HomePage.css'
import TabbedNav from '../components/TabbedNav'
import Notification from '../components/Notification'
import Announcement from '../components/Announcement'
import Input from '../components/Input'
import { Link } from 'react-router-dom'
import Button from '../components/Button'
import isEmpty from 'lodash/isEmpty'
import Pusher from 'pusher-js'
import { reject } from 'ramda'
import messageParser from '../MessageParser/message-parser'
import { Icon } from 'react-fa'
import ReactTooltip from 'react-tooltip'

class HomePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchNotifications: '',
      searchAnnouncements: '',
      filteredNotifications: [],
      filteredAnnouncements: []
    }
  }

  componentDidMount() {
    const { loadAppData } = this.props

    loadAppData()
    const pusher = new Pusher('5c395da69c6cefb9c67d', {
      cluster: 'ap1',
      encrypted: true
    })

    const channel = pusher.subscribe('notency-channel')
    channel.bind('notency-receive-response', data => {
      loadAppData()
    })
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.notifications !== this.props.notifications) {
      this.setState({ filteredNotifications: nextProps.notifications })
    }
    if (nextProps.announcements !== this.props.announcements) {
      this.setState({ filteredAnnouncements: nextProps.announcements })
    }
  }

  okResponses = responses => {
    return responses.filter(response => {
      return messageParser.isOkMessage(response.body)
    }).length
  }

  notOkResponses = responses => {
    return responses.filter(response => {
      return messageParser.isOkMessage(response.body) === false
    }).length
  }

  notResponded = (recipients, responses) => {
    return (
      recipients.length -
      this.okResponses(responses) -
      this.notOkResponses(responses)
    )
  }

  handleSearch = e => {
    const filterResults = results => {
      return results.filter(notification => {
        const searchTerms = reject(
          word => word === '',
          e.target.value.trim().split(' ')
        )

        return searchTerms.every(searchTerm =>
          notification.subject.split(' ').find(word => word === searchTerm)
        )
      })
    }
    const { notifications, announcements } = this.props
    if (e.target.name === 'searchNotifications') {
      this.setState({
        [e.target.name]: e.target.value,
        filteredNotifications: filterResults(notifications)
      })
    } else if (e.target.name === 'searchAnnouncements') {
      this.setState({
        [e.target.name]: e.target.value,
        filteredAnnouncements: filterResults(announcements)
      })
    }
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
    const {
      searchNotifications,
      searchAnnouncements,
      filteredNotifications,
      filteredAnnouncements
    } = this.state

    return (
      <Fragment>
        <TabbedNav
          activeTab={activeTab}
          tabs={[
            () => (
              <p className="m-0">
                <Icon name="bell" /> Emergency Notifications
              </p>
            ),
            () => (
              <p className="m-0">
                <Icon name="bullhorn" /> General Announcements
              </p>
            )
          ]}
          handleChangeActiveTab={handleChangeActiveTab}
        />
        {activeTab === 0 && (
          <div className="mb-3 d-md-flex align-items-center">
            <Input
              className="mr-2"
              name="searchNotifications"
              placeholder="Search Notifications..."
              iconName="search"
              onChange={this.handleSearch}
              value={searchNotifications}
            />
            <Link
              to="/new_notification"
              className="btn btn-danger text-uppercase font-weight-bold my-2 btn-block"
            >
              New Notification
            </Link>
          </div>
        )}
        {activeTab === 1 && (
          <div className="mb-3 d-md-flex align-items-center">
            <Input
              className="mr-2"
              name="searchAnnouncements"
              placeholder="Search Announcements..."
              iconName="search"
              onChange={this.handleSearch}
              value={searchAnnouncements}
            />
            <Link
              to="/new_announcement"
              className="btn btn-danger text-uppercase font-weight-bold my-2 btn-block"
            >
              New Announcement
            </Link>
          </div>
        )}
        {!isEmpty(notifications) || !isEmpty(announcements) ? (
          <Fragment>
            {activeTab === 0
              ? filteredNotifications.map(notification => {
                  return (
                    <Fragment>
                      <Notification
                        {...notification}
                        key={notification._id}
                        responses={
                          notification.responses.length /
                          notification.recipients.length *
                          100
                        }
                      />
                      <ReactTooltip
                        id={notification._id}
                        place="left"
                        type="light"
                        effect="solid"
                      >
                        <Icon className="text-success mr-2" name="check">
                          {` ${this.okResponses(notification.responses)}/${
                            notification.recipients.length
                          }`}
                        </Icon>
                        <Icon className="text-danger mr-2" name="times">
                          {` ${this.notOkResponses(notification.responses)}/${
                            notification.recipients.length
                          }`}
                        </Icon>
                        <Icon className="text-dark mr-2" name="question">
                          {` ${this.notResponded(
                            notification.recipients,
                            notification.responses
                          )}/${notification.recipients.length}`}
                        </Icon>
                      </ReactTooltip>
                    </Fragment>
                  )
                })
              : filteredAnnouncements.map(announcement => {
                  return (
                    <Announcement {...announcement} key={announcement._id} />
                  )
                })}
            <div className="showAllButton text-center">
              <Button
                onClick={() => {
                  handleLoadMore(activeTab)
                }}
                text={showButtonText}
              />
            </div>
          </Fragment>
        ) : (
          <div>Loading notifications and announcements...</div>
        )}
      </Fragment>
    )
  }
}

export default HomePage
