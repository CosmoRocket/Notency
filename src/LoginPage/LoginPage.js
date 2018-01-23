import React, { Component } from 'react'
import Input from '../components/Input'
import LoginButton from '../components/LoginButton'
import Checkbox from '../components/Checkbox'
import './LoginPage.css'
import logo from './embassy_english.png'

class LoginPage extends Component {
  state = { error: '' }

  render() {
    const { onSignIn, passwordLink } = this.props
    const { error } = this.state

    return (
      <div className="text-center login-page">
        <img src={logo} className="logo" alt="embassy english logo" />
        <h3 className="greeting">Welcome Back!</h3>
        <form
          className="login-form"
          onSubmit={event => {
            event.preventDefault()

            const form = event.target
            const username = form.username.value
            const password = form.password.value

            onSignIn({ username, password }).catch(error => {
              this.setState({ error: error.message })
            })
          }}
        >
          <Input
            type="text"
            name="username"
            placeholder="User"
            iconName="user"
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            iconName="lock"
          />
          {error && <p className="error-message">{error}</p>}
          <LoginButton />
        </form>
        <p className="fine-print">
          An app for sending bulk SMS and email notifications
        </p>
      </div>
    )
  }
}

export default LoginPage
