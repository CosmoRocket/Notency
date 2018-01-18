import React, { Component, Fragment } from 'react'
import TabbedNav from '../components/TabbedNav'
import Message from '../components/Message'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { groupBy } from 'ramda'
import messageParser from './message-parser'

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

    // a notification has 1. recipients 2. responses. How to work out which recipients have NOT responded?

    // const sortedByStatus = currentNotification && okOrNot(currentNotification.responses)

    if (!!currentNotification) {
      
      const okOrNot = groupBy(response => { //sorts responses according to whether message body is both valid and contains 'OK'
        return messageParser.isOkMessage(response.body) === true ? 'ok' : 'notOk'
        console.log('ok students: ', okOrNot)
      })
      
      const noResponseYet = (recipients, responses) => {
        // nonResponders = .reject on recipients matching against ids in responses, filter out those with matching ids 
      }
      
      // if (!!currentNotification.responses) {
        const sortedByStatus = okOrNot(currentNotification.responses)
        const okResponses = sortedByStatus.ok.map(response => {
          return (
            <Message
            recipientId={ response.sender._id }
            contactNumber={ response.sender.mobile }
            recipientName={`${response.sender.firstName} ${response.sender.lastName}`}
            messageBody={ response.body }
          />
          )
        })
      // }

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
            // we roll out OK responses here
            !!currentNotification ? 
             1 // okResponses 
            : <p>loading responses...</p>
          )} 
          <Message
            recipientId="123891273"
            contactNumber="0476143646"
            recipientName="John Voon"
            messageBody="OK"
          />
          {activeTab === 1 && (
            // we roll out not OK responses here
            <Message />
          )}
          {activeTab === 2 && (
            // we roll out recipients who have not yet responded
            <Message />
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
