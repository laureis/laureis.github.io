import React from 'react'
import { mount } from 'enzyme'

import EditableFieldInput from './EditableFieldInput'

const setup = propOverrides => {
  const props = Object.assign({
    value: '',
    onConfirm: () => {},
    confirm: false,
    allowEmpty: false,
    alwaysOpen: false
  }, propOverrides)

  const wrapper = mount(
    <EditableFieldInput
      type="text"
      label="Test input field"
      value={props.value}
      onConfirm={props.onConfirm}
      confirm={props.confirm}
      allowEmpty={props.allowEmpty}
      alwaysOpen={props.alwaysOpen}/>
  )

  return {
    wrapper,
    inputNbr: wrapper.find('input').length // Ignore confirm btn
  }
}

describe('Editable field input', () => {
  it('Correct number of inputs if simple', () => {
    const { inputNbr } = setup({confirm: false, alwaysOpen: true})
    expect(inputNbr).toBe(2) // field + btn
  })

  it('Correct number of inputs if confirm', () => {
    const { inputNbr } = setup({ confirm: true, alwaysOpen: true })
    console.log(setup({ confirm: true, alwaysOpen: true }).wrapper.html())
    expect(inputNbr).toBe(3) // field + confirm + btn
  })

  it('Fields can be shown/hidden', () => {
    const { wrapper, inputNbr } = setup()
    expect(inputNbr).toBe(0) // No interactions

    wrapper._instance().openEdit()
    wrapper.update()
    expect(wrapper.find('input').length).toBe(2) // input + btn

    wrapper._instance().closeEdit()
    wrapper.update()
    expect(wrapper.find('input').length).toBe(0)
  })
})
