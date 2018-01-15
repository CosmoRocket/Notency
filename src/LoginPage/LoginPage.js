import React, { Fragment } from 'react'
import Input from '../components/Input'
import LoginButton from '../components/LoginButton'
import Checkbox from '../components/Checkbox'
import './LoginPage.css'
import logo from './embassy_english.png'

function LoginPage({ onSubmit, passwordLink }) {
  return (
    <div className="text-center login-page">
      <img src={logo} className="logo" alt="embassy english logo" />
      <h3 className="greeting">Welcome Back!</h3>
      <form onSubmit={onSubmit} className="login-form">
        <Input type="name" name="username" placeholder="User" iconName="user" />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          iconName="lock"
        />
        <LoginButton />
        <div className="d-flex justify-content-between">
          <Checkbox name="rememberMe" value="rememberMe" text="Rember me" />
          <p>
            <a href={passwordLink} className="password-link">
              Forgot your password?
            </a>
          </p>
        </div>
      </form>
      <p className="fine-print">
        An app for sending bulk SMS and email notifications
      </p>
    </div>
  )
}

export default LoginPage
