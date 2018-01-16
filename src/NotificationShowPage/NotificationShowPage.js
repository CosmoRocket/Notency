import React, { Component, Fragment } from 'react'
import TabbedNav from '../components/TabbedNav'
import Message from '../components/Message'
import { Link } from 'react-router-dom'
import moment from 'moment'

class NotificationShowPage extends Component {
  state = {
    currentNotification: {},
    activeTab: 0
  }

  componentDidMount() {
    const { notifications, match } = this.props
    const currentNotification = notifications.find(notification => {
      return notification.id === match.params.id
    })

    this.setState({ currentNotification })
  }

  handleChangeActiveTab = index => {
    this.setState({ activeTab: index })
  }

  render() {
    const { currentNotification, activeTab } = this.state

    return (
      <Fragment>
        <p className="text-right">
          {moment(currentNotification.sentAt).format('D MMM YYYY')}
        </p>
        <h2 className="text-center">{currentNotification.title}</h2>
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
  }
}

export default NotificationShowPage
