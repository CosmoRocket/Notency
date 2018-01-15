import React, { Component, Fragment } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
  withRouter
} from 'react-router-dom'
import './App.css'
import HomePage from './HomePage'
import NotificationShowPage from './NotificationShowPage'
import AnnouncementShowPage from './AnnouncementShowPage'
import CreateNotificationPage from './CreateNotificationPage'
import CreateAnnouncementPage from './CreateAnnouncementPage'
import DesktopNav from './components/DesktopNav'
import Input from './components/Input'
import LoginPage from './LoginPage'
import MobileNav from './components/MobileNav'
import Container from './components/Container'

class App extends Component {
  state = {
    error: null,
    contentState: null, // Captures current contents of Editor
    activeTab: 0,
    totalRecipients: 700,
    notifications: [
      {
        id: '12n3kj12k3',
        title: 'Flood warning',
        sentAt: Date.now(),
        received: 50,
        failed: 10,
        responded: 10,
        body:
          'Please note that there has been an announcement about a flood coming.',
        group: {
          country: 'France',
          status: 'Student'
        }
      },
      {
        id: '2343n4jknj3',
        title: 'Heat wave',
        sentAt: Date.now(),
        received: 50,
        failed: 10,
        responded: 10,
        body:
          'Please note that there has been an announcement about a heat wave.'
      }
    ],
    announcements: [
      {
        id: '5m65k6m5k6m',
        title: 'Graduation Day for Students of Class 1024',
        sentAt: Date.now(),
        body:
          'The graduation for course eA342 will be hold on Thursday the 2nd of March 2018 at 12am. Please be punctual.'
      },
      {
        id: '34mk534mk5',
        title: 'Christmas Party',
        sentAt: Date.now(),
        body:
          'Please note there will be a Christmas Party in your respective classes on 11 December 2018. Wishing you all a Merry Christmas and Happy New Year'
      }
    ]
  }

  handleContentStateChange = (contentState) => {
    this.setState({ contentState })
  }

  handleChangeActiveTab = index => {
    this.setState({ activeTab: index })
  }

  render() {
    const { notifications, announcements, activeTab } = this.state
    return (
      <Router>
        <Container>
          <Switch>
            {/* Login */}
            <Route path="/login" exact render={() => <LoginPage />} />
            <Route
              path="/"
              exact
              render={() => (
                <HomePage
                  activeTab={activeTab}
                  notifications={notifications}
                  announcements={announcements}
                  handleChangeActiveTab={this.handleChangeActiveTab}
                />
              )}
            />
            <Route
              path="/notifications/new"
              exact
              render={() => <CreateNotificationPage />}
            />
            <Route
              path="/announcements/new"
              exact
              render={() => <CreateAnnouncementPage 
                              handleContentStateChange={ this.handleContentStateChange}
                              />
                            }
            />
            <Route
              path="/notifications"
              render={withRouter(props => (
                <NotificationShowPage
                  {...props}
                  notifications={notifications}
                />
              ))}
            />
            <Route
              path="/announcements"
              render={withRouter(props => (
                <AnnouncementShowPage
                  {...props}
                  announcements={announcements}
                />
              ))}
            />
            <Route
              render={({ location }) => (
                <h2 className="text-center text-danger">
                  Page not found: {location.pathname}
                </h2>
              )}
            />
          </Switch>
        </Container>
      </Router>
    )
  }
}

export default App
