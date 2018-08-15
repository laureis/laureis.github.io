import React, { Component } from 'react'
import uuidv4 from 'uuid/v4'

import FieldsCoverUp from './containers/FieldsCoverUp/FieldsCoverUp'
import FieldInput from '../FieldInput/FieldInput'

export default class extends Component {
  constructor (props) {
    super(props)
    this.state = {
      id: uuidv4(),
      needConfirm: this.props.confirm,
      allowEmpty: this.props.allowEmpty,
      alwaysOpen: this.props.alwaysOpen,
      onEdit: false,
      mainInput: {
        id: uuidv4(),
        value: props.value ? props.value : ''
      },
      confirmInput: {
        id: uuidv4(),
        value: props.value ? props.value : ''
      }
    }
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      mainInput: {
        value: nextProps.value
      },
      confirmInput: {
        value: nextProps.value
      }
    })
  }

  /**
   * Default props
   * @type {{className: string, onClick: defaultProps.onClick, onChange: defaultProps.onChange, onKeyDown: defaultProps.onKeyDown, onKeyUp: defaultProps.onKeyUp, onKeyPress: defaultProps.onKeyPress, onFocus: defaultProps.onFocus, onBlur: defaultProps.onBlur}}
   */
  static defaultProps = {
    className: '',
    needConfirm: false,
    allowEmpty: false,
    alwaysOpen: false,
    onConfirm: () => {},
    onCancel: () => {},
    onBlur: () => {}
  }

  openEdit = () => {
    this.setState({
      onEdit: true
    })
  }

  closeEdit = () => {
    this.setState({
      onEdit: false
    })
  }

  onInputUpdate = (field, event) => {
    this.setState({[field + 'Input']: { value: event.target.value }})
  }

  onConfirm = () => {
    // Check field isn't null if it is not allowed
    if (!this.state.allowEmpty &&
      this.state.mainInput.value.length === 0) {
      return null
    }

    // Check the two input are equals if we need confirm
    if (this.state.needConfirm &&
      this.state.mainInput.value !== this.state.confirmInput.value) {
      return null
    }

    // Everything's ok, we send the new data back up
    this.props.onConfirm(this.state.mainInput.value)

    this.closeEdit()
  }

  render = () => {
    if (!this.state.onEdit && !this.state.alwaysOpen) {
      return <FieldsCoverUp
        label={this.props.type === 'password' ? '•••••' : this.state.mainInput.value}
        openEdit={this.openEdit}
      />
    }

    const fields = [<FieldInput
      type={this.props.type}
      key={'editable-main-' + this.state.mainInput.id}
      label={this.props.label}
      value={this.state.mainInput.value}
      onChange={this.onInputUpdate.bind(this, 'main')} />]

    if (this.state.needConfirm) {
      fields.push(<FieldInput
        type={this.props.type}
        key={'editable-confirm-' + this.state.confirmInput.id}
        label="Confirmation"
        value={this.state.confirmInput.value}
        onChange={this.onInputUpdate.bind(this, 'confirm')}/>)
    }

    return (
      <div
        className="editable-field-input"
        id={ 'editable-field-input-' + this.state.id } >
        {fields}
        <div className="controls">
          <span
            className="text-link"
            onClick={this.closeEdit} >
            cancel
          </span>
          <input
            type="button"
            value="Confirm"
            onClick={this.onConfirm}/>
        </div>
      </div>
    )
  }
}
