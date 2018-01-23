import React, { Fragment, Component } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  withRouter
} from 'react-router-dom'
import './App.css'
import { getDecodedToken } from './api/token'
import { signIn, signOutNow } from './api/auth'
import { uploadFile } from './api/fileupload'
import {
  listSomeNotifications,
  listNotifications,
  createNotification
} from './api/notifications'
import {
  listSomeAnnouncements,
  listAnnouncements,
  createAnnouncement
} from './api/announcements'
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
    activeTab: 0,
    totalRecipients: 700,
    notifications: [],
    announcements: [],
    recipients: [],
    showButtonText: 'Show All'
  }

  onSignIn = ({ username, password }) => {
    return signIn({ username, password }).then(userData => {
      this.setState({ userData })
    })
  }

  onSignOut = () => {
    signOutNow()
    this.setState({ userData: null })
  }

  handleChangeActiveTab = index => {
    this.setState({ activeTab: index })
    this.load()
  }

  handleLoadMore = activeTab => {
    const saveError = error => {
      this.setState({ error })
    }
    const { notifications, announcements } = this.state

    if (activeTab === 0) {
      if (notifications.length > 5)
        listSomeNotifications()
          .then(notifications => {
            this.setState({
              notifications,
              showButtonText: 'Show All'
            })
          })
          .catch(saveError)
      else
        listNotifications()
          .then(notifications => {
            this.setState({
              notifications,
              showButtonText: 'Hide'
            })
          })
          .catch(saveError)
    } else if (activeTab === 1) {
      if (announcements.length > 5)
        listSomeAnnouncements()
          .then(announcements => {
            this.setState({ announcements })
          })
          .catch(saveError)
      else
        listAnnouncements()
          .then(announcements => {
            this.setState({ announcements })
          })
          .catch(saveError)
    }
  }

  handleCreateAnnouncement = announcementData => {
    return createAnnouncement(announcementData).then(newAnnouncement => {
      this.setState(prevState => {
        return {
          announcements: [newAnnouncement, ...prevState.announcements]
        }
      })

      return { announcementData, newAnnouncement }
    })
  }

  handleCreateNotification = notificationData => {
    return createNotification(notificationData).then(newNotification => {
      this.setState(prevState => {
        return {
          notifications: [newNotification, ...prevState.notifications]
        }
      })
      return { notificationData, newNotification }
    })
  }

  onUpload = formData => {
    const saveError = error => {
      this.setState({ error })
    }
    return uploadFile(formData).then(() => {
      listRecipients()
        .then(recipients => {
          this.setState({ recipients })
        })
        .catch(saveError)
    })
  }

  load = () => {
    const saveError = error => {
      this.setState({ error })
    }

    listSomeNotifications()
      .then(notifications => {
        this.setState({ notifications })
      })
      .catch(saveError)

    listSomeAnnouncements()
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
      userData,
      showButtonText
    } = this.state

    const requireAuth = render => props =>
      userData ? render(props) : <Redirect to="/login" />

    return (
      <Router>
        <Fragment>
          <div className="headerBar">
            <h2>NOTENCY</h2>
            <div>
              <h6>Reset Account</h6>
              <h6>Submit Issue</h6>
            </div>
          </div>
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
                      loadAppData={this.load}
                      activeTab={activeTab}
                      notifications={notifications}
                      announcements={announcements}
                      handleChangeActiveTab={this.handleChangeActiveTab}
                      handleLoadMore={this.handleLoadMore}
                      showButtonText={showButtonText}
                    />
                  ))}
                />
                <Route
                  path="/new_notification"
                  exact
                  render={requireAuth(() => (
                    <CreateNotificationPage
                      recipients={recipients}
                      handleCreateNotification={this.handleCreateNotification}
                    />
                  ))}
                />
                <Route
                  path="/new_announcement"
                  exact
                  render={requireAuth(() => (
                    <CreateAnnouncementPage
                      recipients={recipients}
                      handleCreateAnnouncement={this.handleCreateAnnouncement}
                    />
                  ))}
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
                    withRouter(props => (
                      <ContactsPage
                        onUpload={this.onUpload}
                        recipients={recipients}
                      />
                    ))
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
        </Fragment>
      </Router>
    )
  }
}

export default App
