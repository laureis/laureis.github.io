import React, { Component } from 'react'

export default class extends Component {
  render () {
    return (
      <div className="field-cover-up">
        <span className="field">
          {this.props.label}
        </span>
        <span
          className="text-link"
          onClick={this.props.openEdit}>
          edit
        </span>
      </div>
    )
  }
}
