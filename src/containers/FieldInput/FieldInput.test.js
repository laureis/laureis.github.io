import React from 'react'
import { mount } from 'enzyme'

import FieldInput from './FieldInput'

const setup = propOverrides => {
  const props = Object.assign({
    value: '',
    onChange: () => {}
  }, propOverrides)

  const wrapper = mount(
    <FieldInput
      type="text"
      className="test-input"
      label="Test input field"
      value={props.value}
      onChange={props.onChange}/>
  )

  return {
    wrapper,
    input: wrapper.find('input')
  }
}

describe('Field input', () => {
  it('Always render exactly one input field', () => {
    const { input } = setup({ value: 'testvalue' })
    expect(input.length).toBe(1)
  })

  it('Props update correctly update the input value', () => {
    const { wrapper } = setup()
    const testValue = 'testValue'

    wrapper._instance().componentWillReceiveProps({value: testValue})
    expect(wrapper.state().value).toBe(testValue)
  })

  it('OnChange event correctly call parent\'s one', () => {
    const mock = jest.fn()
    const event = {
      preventDefault () {},
      target: { value: 'the-value' }
    }

    // Test with mockfunction
    const wrapperMock = setup({onChange: mock}).wrapper
    wrapperMock.find('input').simulate('change', event)

    expect(mock.mock.calls.length).toBe(1)

    // Test without any function
    const wrapperEmpty = setup({onChange: null}).wrapper
    wrapperEmpty.find('input').simulate('change', event)

    expect(mock.mock.calls.length).toBe(1)
  })
})
