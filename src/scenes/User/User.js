// React
import React, { Component } from 'react'

export default class extends Component {
  render = () => (
    <section className='user-profile'>
      <div className='profile-picture'>
      </div>
      <div className='main-information'>
        <h4>Username</h4>
        <h5>currently listening to despacito</h5>
      </div>
      <div className='following-information'>
        <h5>1000 followers</h5>
        <h5>1000 followings</h5>
      </div>
    </section>
  )
}
