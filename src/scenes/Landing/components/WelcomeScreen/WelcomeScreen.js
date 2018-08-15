import React, { Component } from 'react'

import FieldInput from 'containers/FieldInput/FieldInput'

export default class extends Component {
  constructor (props) {
    super(props)
    this.state = { email: '' }
  }

  onInputChange = (event) => {
    // Update state with current input value
    this.setState({email: event.target.value})
  }

  onEmailUpdated = (event) => {
    // If enter, check and sanitize email
    if (event.key === 'Enter') {
      return this.props.verifyEmail(this.state.email)
    }

    // Otherwise udpate state
    this.onInputChange(event)
  }

  render = () => {
    const displayClass = this.props.display ? 'show' : 'hide'

    return (
      <section id="welcome-screen" className={displayClass}>
        <h6 className="caption">What does your music say about you ?</h6>
        <h1 className="title line-1">Totally not</h1>
        <h1 className="title line-2">Last fm</h1>
        <div className="access-form">
          <FieldInput
            type="email"
            className="access-input-form"
            label="Enter your e-mail address"
            value={this.state.email}
            onKeyPress={this.onEmailUpdated}
            onChange={this.onInputChange}/>
          <input
            type="button"
            value="Find out now"
            onClick={this.props.verifyEmail.bind(this, this.state.email)} />
        </div>
      </section>
    )
  }
}
