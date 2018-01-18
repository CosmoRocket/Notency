import React, { Component, Fragment } from 'react'
import TabbedNav from '../components/TabbedNav'
import Message from '../components/Message'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { groupBy } from 'ramda'

class NotificationShowPage extends Component {
  state = {
    currentNotification: {},
    activeTab: 0
  }

  componentDidMount() {
    const { notifications, match } = this.props
    const currentNotification = notifications.find(notification => {
      return notification._id === match.params.id
    })

    this.setState({ currentNotification })
  }

  handleChangeActiveTab = index => {
    this.setState({ activeTab: index })
  }

  render() {
    const { currentNotification, activeTab } = this.state
    if (!!currentNotification) {
      const capitalize = string =>
        string.charAt(0).toUpperCase() + string.slice(1)
      const categories =
        currentNotification.groups &&
        groupBy(group => group.name)(currentNotification.groups)
      const groupElements =
        currentNotification.groups &&
        Object.keys(categories).map(category => (
          <p>
            {capitalize(category)}:{' '}
            {categories[category].map(group => group.selected).join(', ')}
          </p>
        ))

      return (
        <Fragment>
          <p className="text-right">
            {moment(currentNotification.createdAt).format('D MMM YYYY')}
          </p>
          {groupElements === '' ? (
            <p>Groups Sent To: {groupElements}</p>
          ) : (
            <p>Sent to All</p>
          )}

          <h2 className="text-center">{currentNotification.subject}</h2>
          <p>{currentNotification.body}</p>
          <TabbedNav
            activeTab={activeTab}
            handleChangeActiveTab={this.handleChangeActiveTab}
            tabs={[
              () => (
                <div className="text-center text-success">
                  <p className="m-0">Positive</p>
                  <p className="m-0">10/60</p>
                </div>
              ),
              () => (
                <div className="text-center text-danger">
                  <p className="m-0">Negative</p>
                  <p className="m-0">10/60</p>
                </div>
              ),
              () => (
                <div className="text-center">
                  <p className="m-0">No Response</p>
                  <p className="m-0">10/60</p>
                </div>
              )
            ]}
          />
          {activeTab === 0 && (
            <Message
              recipientId="123891273"
              contactNumber="0476143646"
              recipientName="John Voon"
              messageBody="OK"
            />
          )}
          <Link to="/">Back</Link>
        </Fragment>
      )
    } else {
      return <div>Loading...</div>
    }
  }
}

export default NotificationShowPage
