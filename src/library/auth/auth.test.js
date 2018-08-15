import React from 'react'
import ReactDom from 'react-dom'
import auth from './index'

import cookies from 'browser-cookies'

describe('Checking Auth library behaviour', () => {
  it('Token is set correctly', () => {
    const token = makeid()

    auth.setToken(token)
    expect(cookies.get('token')).toBe(token)
  })

  it('Token is retrieved correctly', () => {
    const token = makeid()
    cookies.set('token', token)

    expect(auth.getToken()).toBe(token)
  })

  it('Users are correctly identified', () => {
    // TODO: replace make id with a special token
    const token = makeid()
    cookies.set('token', token)

    expect(auth.isUser()).toBeTruthy()

    cookies.erase('token')

    expect(auth.isUser()).toBeFalsy()
  })

  it('Visitors are correctly identified', () => {
    cookies.erase('token')
    expect(auth.isVisitor()).toBeTruthy()
  })

  it('Invalid token are correctly detected', () => {
    // TODO: TO DO
    expect(auth.tokenIsValid()).toBeTruthy()
  })

  it('Sign up is working', () => {
    // TODO: TO DO
    expect(auth.signUp()).toBeTruthy()
  })

  it('Sign in is working', () => {
    // TODO: TO DO
    expect(auth.signIn()).toBeTruthy()
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
