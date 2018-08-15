import React, { Component } from 'react'
import uuidv4 from 'uuid/v4'

export default class extends Component {
  constructor (props) {
    super(props)

    this.state = {
      fieldID: uuidv4(),
      value: props.value ? props.value : ''
    }
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      value: nextProps.value
    })
  }

  /**
   * Default props
   * @type {{className: string, onClick: defaultProps.onClick, onChange: defaultProps.onChange, onKeyDown: defaultProps.onKeyDown, onKeyUp: defaultProps.onKeyUp, onKeyPress: defaultProps.onKeyPress, onFocus: defaultProps.onFocus, onBlur: defaultProps.onBlur}}
   */
  static defaultProps = {
    className: '',
    onClick: null,
    onChange: null,
    onKeyDown: null,
    onKeyUp: null,
    onKeyPress: null,
    onFocus: null,
    onBlur: null
  }

  onChange = (e) => {
    this.setState({
      value: e.target.value
    })

    if (this.props.onChange) {
      this.props.onChange(e)
    }
  }

  render = () => {
    return (
      <div className={'field-input ' + this.props.className}>
        <input
          type={this.props.type}
          value={this.state.value}
          id={this.state.fieldID}
          /* Events */
          onClick={this.props.onClick}
          onChange={this.onChange}
          onKeyDown={this.props.onKeyDown}
          onKeyUp={this.props.onKeyUp}
          onKeyPress={this.props.onKeyPress}
          onFocus={this.props.onFocus}
          onBlur={this.props.onBlur}
        />
        <label
          htmlFor={this.state.fieldID}
          className={this.state.value ? 'reduced' : ''}>
          {this.props.label}
        </label>
      </div>
    )
  }
}
