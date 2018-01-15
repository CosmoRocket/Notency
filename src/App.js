import React, { Component, Fragment } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link
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

class App extends Component {
  state = {
    decodedToken: getDecodedToken(),
    totalRecipients: 700,
    notifications: [
      {
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
        title: 'Graduation Day for Students of Class 1024',
        sentAt: Date.now(),
        body:
          'The graduation for course eA342 will be hold on Thursday the 2nd of March 2018 at 12am. Please be punctual.'
      },
      {
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

  render() {
    const { notifications, announcements, decodedToken } = this.state

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
                  notifications={notifications}
                  announcements={announcements}
                  onSignOut={this.onSignOut}
                />
              )}
            />
            <Route
              path="/notifications"
              render={() => <NotificationShowPage />}
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
