import React, { Component } from 'react'
import validator from 'validator'

import WelcomeScreen from './components/WelcomeScreen/WelcomeScreen'
import SignUpForm from './components/SignUpForm/SignUpForm'
import SignInForm from './components/SignInForm/SignInForm'

import api from 'library/api'

export default class extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showWelcomeScreen: true,
      showSignInForm: false,
      showSignUpForm: false,

      email: ''
    }
  }

  showLanding = () => {
    this.setState({
      showWelcomeScreen: true,
      showSignInForm: false,
      showSignUpForm: false
    })
  }

  showSignUp = () => {
    this.setState({
      showWelcomeScreen: false,
      showSignInForm: false,
      showSignUpForm: true
    })
  }

  showSignIn = () => {
    this.setState({
      showWelcomeScreen: false,
      showSignInForm: true,
      showSignUpForm: false
    })
  }

  verifyEmail = (rawEmail) => {
    // Checking email format
    if (!validator.isEmail(rawEmail)) {
      return // ignore bad emails
    }

    // Sanitize email
    const email = validator.normalizeEmail(rawEmail)

    // Email unknown, display signUp form
    api.post('/user/mailExist', {
      email: email
    }).then(response => {
      this.setState({
        email: email
      })
      console.log(response.data.exists)
      if (response.data.exists) return this.showSignIn()
      this.showSignUp()
    })
  }

  render = () => {
    const topPartClass = this.state.showSignUpForm || this.state.showSignInForm ? 'expand' : ''
    return (
      <main id="landing-page">
        <section className={'top-part ' + topPartClass}>
          <SignUpForm
            email={this.state.email}
            display={this.state.showSignUpForm}
            showLanding={this.showLanding}
            showSignUp={this.showSignUp}
            showSignIn={this.showSignIn}
            onLogin={this.props.checkLogin} />
          <SignInForm
            email={this.state.email}
            display={this.state.showSignInForm}
            showLanding={this.showLanding}
            showSignUp={this.showSignUp}
            showSignIn={this.showSignIn}
            onLogin={this.props.checkLogin} />
        </section>
        <WelcomeScreen
          verifyEmail={this.verifyEmail}
          display={this.state.showWelcomeScreen}/>
      </main>
    )
  }
}
