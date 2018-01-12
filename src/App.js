import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect, Link } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import NavSidebar from './components/NavSidebar'
import LoginPage from './LoginPage'

class App extends Component {
  state = {
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
        title: 'Flood warning',
        body:
          'Please note that there has been an announcement about a flood coming.'
      },
      {
        title: 'Heat wave',
        body:
          'Please note that there has been an announcement about a heat wave.'
      }
    ]
  }

  render() {
    return (

      <Router>
        <div className="App d-flex">
          <Switch>

            {/* Home */}
            <Route path='/home' exact render={() => (
              <Fragment>
                <NavSidebar />
                <Home
                  notifications={this.state.notifications}
                  announcements={this.state.announcements}
                />
              </Fragment>
            )} />

            {/* Login */}
            <Route path='/login' exact render={() => (
              <LoginPage />
            )} />

            {/* Route not found */}
            <Route render={({ location }) => (
              <h2
                className='text-center text-danger'
              >
                Page not found: {location.pathname}
              </h2>
            )} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App
