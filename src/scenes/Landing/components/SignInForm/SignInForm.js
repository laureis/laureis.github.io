// React
import React, { Component } from 'react'
import auth from 'library/auth'

import FieldInput from 'containers/FieldInput/FieldInput'

export default class extends Component {
  constructor (props) {
    super(props)
    this.state = {
      email: this.props.email,
      password: '',
      badLogin: false
    }
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      email: nextProps.email,
      password: ''
    })
  }

  onInputUpdate = (field, event) => {
    if (field !== 'email' && field !== 'password') {
      return
    }

    this.setState({ [field]: event.target.value })
  }

  signIn = (e) => {
    e.preventDefault()
    // Check validity of credentials against the server
    // if ok, a token will be retrived from the server
    auth.i().signIn(this.state.email, this.state.password).then(() => {
      this.props.onLogin()
    }).catch(() => {
      this.setState({
        badLogin: true
      })
    })
  }

  render = () => {
    const displayClass = this.props.display ? 'show' : 'hide'

    return (
      <section id="signin-form" className={displayClass}>
        <div className="access-form">
          <h5 className="caption">Plug in </h5>
          <form onSubmit={this.signIn}>
            <FieldInput
              type="email"
              className="input-signin-email"
              label="Enter your e-mail address"
              value={this.state.email}
              onChange={this.onInputUpdate.bind(this, 'email')}/>
            <FieldInput
              type="password"
              className="input-signin-password"
              label="Enter your password"
              value={this.state.password}
              onChange={this.onInputUpdate.bind(this, 'password')} />
            { this.state.badLogin ? (<p className="login-msg">Bad credentials</p>) : null }
            <input
              type="submit"
              value="Sign in"
              onClick={this.signIn}/>
            <h6 onClick={this.props.showSignUp} className="clickable">Click here to sign up</h6>
          </form>
        </div>
      </section>
    )
  }
}
