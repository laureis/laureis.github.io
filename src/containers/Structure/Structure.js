// React
import React, { Component } from 'react'

import Header from 'scenes/Header/Header'
import Footer from 'scenes/Footer/Footer'

export default class extends Component {
  render = () => (
    <section className='App'>
      <Header userInfos={this.props.userInfos}/>
      <section id="page-structure">
        {this.props.children}
      </section>
      <Footer />
    </section>
  )
}
