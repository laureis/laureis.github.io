import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import pages from 'library/pagesList'
import auth from 'library/auth'

export default class extends Component {
  logout = () => {
    auth.i().onLogout()
  }

  render = () => {
    return (
      <menu id="main-menu">
        <ul className="pages-list">
          {
            Object.keys(pages).map((key) => (
              <li key={ pages[key].name }>
                <Link
                  to={'/' + key}
                  onClick={this.props.closeMenu.bind(this, '/' + key)} >
                  { '_' + pages[key].name }
                </Link>
              </li>
            ))
          }
        </ul>
        <div className="account-line">
          <div className="user-name">{ this.props.userInfos.username }</div>
          <div className="log-out" onClick={this.logout}>log-out</div>
        </div>
      </menu>
    )
  }
}
