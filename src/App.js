import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import Home from './components/Home'
import NavSidebar from './components/NavSidebar'
import Input from './components/Input'

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
      <div className="App d-flex">
        <NavSidebar />
        <Home
          notifications={this.state.notifications}
          announcements={this.state.announcements}
        />
        <Input
          type="text"
          name="loginName"
          placeholder="User"
          iconName="spinner"
        />
      </div>
    )
  }
}

export default App
