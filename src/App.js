import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  withRouter
} from 'react-router-dom'
import './App.css'
import { setToken } from './api/init'
import { getDecodedToken } from './api/token'
import { signIn, signOutNow } from './api/auth'
import { uploadFile } from './api/fileupload'
import { listNotifications } from './api/notifications'
import { listAnnouncements } from './api/announcements'
import { listRecipients } from './api/recipients'
import Container from './components/Container'
import ContentContainer from './components/ContentContainer'
import LoginPage from './LoginPage'
import HomePage from './HomePage'
import NotificationShowPage from './NotificationShowPage'
import AnnouncementShowPage from './AnnouncementShowPage'
import CreateNotificationPage from './CreateNotificationPage'
import CreateAnnouncementPage from './CreateAnnouncementPage'
import ContactsPage from './ContactsPage'

class App extends Component {
  state = {
    userData: getDecodedToken(),
    error: null,
    contentState: null, // Captures current contents of Editor
    activeTab: 0,
    totalRecipients: 700,
    notifications: [],
    announcements: [],
    recipients: []
  }

  onSignIn = ({ username, password }) => {
    signIn({ username, password })
      .then(userData => {
        this.setState({ userData })
      })
      .catch(error => {
        this.setState({ error })
      })
  }

  onSignOut = () => {
    signOutNow()
    this.setState({ userData: null })
  }

  handleContentStateChange = contentState => {
    this.setState({ contentState })
  }

  handleChangeActiveTab = index => {
    this.setState({ activeTab: index })
  }

  onUpload = csvFile => {
    uploadFile(csvFile)
      .then(data => {
        console.log(data)
      })
      .catch(error => {
        console.error('error in appJs', error)
      })
  }

  load() {
    const { userData } = this.state
    const saveError = error => {
      this.setState({ error })
    }

    listNotifications()
      .then(notifications => {
        this.setState({ notifications })
      })
      .catch(saveError)

    listAnnouncements()
      .then(announcements => {
        this.setState({ announcements })
      })
      .catch(saveError)

    listRecipients()
      .then(recipients => {
        this.setState({ recipients })
      })
      .catch(saveError)
  }

  componentDidMount() {
    this.load()
  }

  render() {
    const {
      notifications,
      announcements,
      recipients,
      activeTab,
      userData
    } = this.state

    const requireAuth = render => props =>
      userData ? render(props) : <Redirect to="/login" />

    return (
      <Router>
        <Container>
          <Switch>
            {/* Login */}
            <Route
              path="/login"
              exact
              render={() =>
                userData ? (
                  <Redirect to="/" />
                ) : (
                  <LoginPage onSignIn={this.onSignIn} />
                )
              }
            />
            <Route path="/logout" render={() => <Redirect to="/login" />} />
            <ContentContainer onSignOut={this.onSignOut}>
              <Route
                path="/"
                exact
                render={requireAuth(() => (
                  <HomePage
                    activeTab={activeTab}
                    notifications={notifications}
                    announcements={announcements}
                    handleChangeActiveTab={this.handleChangeActiveTab}
                  />
                ))}
              />
              <Route
                path="/new_notification"
                exact
                render={requireAuth(() => (
                  <CreateNotificationPage recipients={recipients} />
                ))}
              />
              <Route
                path="/new_announcement"
                exact
                render={requireAuth(() => <CreateAnnouncementPage />)}
              />
              <Route
                path="/notifications/:id"
                exact
                render={requireAuth(
                  withRouter(props => (
                    <NotificationShowPage
                      {...props}
                      notifications={notifications}
                    />
                  ))
                )}
              />
              <Route
                path="/announcements/:id"
                exact
                render={requireAuth(
                  withRouter(props => (
                    <AnnouncementShowPage
                      {...props}
                      announcements={announcements}
                    />
                  ))
                )}
              />
              <Route
                path="/update_contacts"
                exact
                render={requireAuth(
                  withRouter(props => <ContactsPage onUpload={this.onUpload} />)
                )}
              />
            </ContentContainer>
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
