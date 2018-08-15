import React from 'react'
import { mount } from 'enzyme'
import { MemoryRouter } from 'react-router-dom'

import App from './App'
import Header from './scenes/Header/Header'
import Footer from './scenes/Footer/Footer'
import Landing from './scenes/Landing/Landing'
import Home from './scenes/Home/Home'
import About from './scenes/About/About'
import User from './scenes/User/User'

const setup = propOverrides => {
  const props = Object.assign({
    url: '/',
    forceLogin: false
  }, propOverrides)

  const wrapper = mount(
    <MemoryRouter initialEntries={[props.url]}>
      <App forceLogin={props.forceLogin}/>
    </MemoryRouter>
  )

  return {
    wrapper,
    landing: wrapper.find(Landing),
    header: wrapper.find(Header),
    footer: wrapper.find(Footer),
    home: wrapper.find(Home),
    user: wrapper.find(User),
    about: wrapper.find(About)
  }
}

describe('App display the correct page', () => {
  describe('When not connected', () => {
    it('/ => Landing page', () => {
      const { landing } = setup({forceLogin: false})
      expect(landing.length).toBe(1)
    })
  })
  describe('When connected', () => {
    it('display Header and Footer', () => {
      const { header, footer } = setup({url: '/'})
      expect(header.length).toBe(1)
      expect(footer.length).toBe(1)
    })
    it('/ => Home page', () => {
      const { home } = setup({url: '/'})
      expect(home.length).toBe(1)
    })
    it('/about => About page', () => {
      const { about } = setup({url: '/about'})
      expect(about.length).toBe(1)
    })
  })
})
