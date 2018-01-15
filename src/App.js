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
import { setToken } from './api/init'
import { getDecodedToken } from './api/token'
import { signIn, signOutNow } from './api/auth'
import Container from './components/Container'
import LoginPage from './LoginPage'
import MobileNav from './components/MobileNav'
import DesktopNav from './components/DesktopNav'
import HomePage from './HomePage'
import NotificationShowPage from './NotificationShowPage'
import AnnouncementShowPage from './AnnouncementShowPage'
import CreateNotificationPage from './CreateNotificationPage'
import CreateAnnouncementPage from './CreateAnnouncementPage'

class App extends Component {
  state = {
    decodedToken: getDecodedToken(),
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

  onSignIn = ({ username, password }) => {
    signIn({ username, password })
      .then(decodedToken => {
        this.setState({ decodedToken })
      })
      .catch((error) => {
        this.setState({ error })
      })
  }

  onSignOut = () => {
    signOutNow()
    this.setState({ decodedToken: null })
  }

  handleChangeActiveTab = index => {
    this.setState({ activeTab: index })
  }

  render() {
    const { notifications, announcements, activeTab, decodedToken } = this.state

    return (
      <Router>
        <Container>
          <Switch>
            {/* Login */}
            <Route
              path="/login"
              exact
              render={() => (
                <Fragment>
                  <LoginPage
                    onSignIn={this.onSignIn}
                  />
                  {/* To remove :p */}
                  <h1 class='text-center'>{decodedToken && 'Yey! You are logged!' || 'Not logged'}</h1>
                </Fragment>
              )
              }
            />

            <Route
              path="/"
              exact
              render={() => (
                <HomePage
                  activeTab={activeTab}
                  notifications={notifications}
                  announcements={announcements}
                  handleChangeActiveTab={this.handleChangeActiveTab}
                  onSignOut={this.onSignOut}
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
              render={() => <CreateAnnouncementPage />}
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
