// React
import React, { Component } from 'react'
import auth from 'library/auth'

import FieldInput from 'containers/FieldInput/FieldInput'

export default class extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      email: this.props.email,
      password: '',
      confirmation: '',
      badSignup: false
    }
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      email: nextProps.email
    })
  }

  onInputUpdate = (field, event) => {
    if (field !== 'email' && field !== 'password' && field !== 'confirmation' && field !== 'name') {
      return
    }

    this.setState({ [field]: event.target.value })

    if (event.key === 'Enter') {
      this.signUp(event)
    }
  }

  signUp = (e) => {
    e.preventDefault()
    // Check validity of credentials against the server
    // if ok, a token will be retrieved from the server
    auth.i().signUp(this.state.name, this.state.email, this.state.password, this.state.confirmation).then(() => {
      this.props.onLogin()
    }).catch(() => {
      this.setState({
        badSignup: true
      })
    })
  }

  render = () => {
    const displayClass = this.props.display ? 'show' : 'hide'

    return (
      <section id="signup-form" className={displayClass}>
        <div className="access-form">
          <h5 className="caption">Join us</h5>
          <form onSubmit={this.signUp}>
            <FieldInput
              type="text"
              className="input-signup-pseudo"
              label="Enter your name"
              value={this.state.name}
              onChange={this.onInputUpdate.bind(this, 'name')}/>
            <FieldInput
              type="email"
              className="input-signup-email"
              label="Enter your e-mail address"
              value={this.state.email}
              onChange={this.onInputUpdate.bind(this, 'email')}/>
            <FieldInput
              type="password"
              className="input-signup-password"
              label="Enter your password"
              value={this.state.password}
              onChange={this.onInputUpdate.bind(this, 'password')} />
            <FieldInput
              type="password"
              className="input-signup-confirmation"
              label="Confirm your password"
              value={this.state.confirmation}
              onChange={this.onInputUpdate.bind(this, 'confirmation')} />
            { this.state.badSignup ? (<p className="login-msg">Bad credentials</p>) : null }
            <input
              type="submit"
              value="Sign up"
              onClick={this.signUp}/>
            <h6 onClick={this.props.showSignIn} className="clickable">Click here to sign in</h6>
          </form>
        </div>
      </section>
    )
  }
}
