import React from 'react'
import ReactDOM from 'react-dom'
import api from './index'

describe('Checking API library behaviour', () => {
  const standardResponse = {
    data: expect.anything(),
    status: 200,
    statusText: 'OK',
    headers: expect.anything(),
    config: expect.anything(),
    request: expect.anything()
  }

  it('Response has correct format on GET success', () => {
    return api.get('https://httpbin.org/get').then(response => {
      expect(response).toEqual(standardResponse)
    })
  })

  it('Response has correct format on POST success', () => {
    const testID = makeid()
    return api.post('https://httpbin.org/post', {testID: testID}).then(response => {
      expect(response).toEqual(standardResponse)
    })
  })

  it('Response has correct format on PUT success', () => {
    const testID = makeid()
    return api.put('https://httpbin.org/put', {testID: testID}).then(response => {
      expect(response).toEqual(standardResponse)
    })
  })

  it('Response has correct format on DELETE success', () => {
    const testID = makeid()
    return api.delete('https://httpbin.org/delete', {testID: testID}).then(response => {
      expect(response).toEqual(standardResponse)
    })
  })

  function makeid () {
    var text = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < 5; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return text
  }
})
