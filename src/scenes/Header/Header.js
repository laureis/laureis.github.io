// React
import React, { Component } from 'react'
import { Link, Route, withRouter } from 'react-router-dom'

// Scene dependencies
import pages from 'library/pagesList'
import Menu from './scenes/Menu/Menu'

class Header extends Component {
  constructor (props) {
    super(props)
    this.state = {
      menuIsOpen: false,
      lastPath: this.props.location.pathname,
      animateClosing: true
    }
  }

  componentDidUpdate (prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.setState({
        lastPath: prevProps.location.pathname
      })
    }
  }

  mapUrlToPageName = (routeProps) => {
    const { params } = routeProps.match

    if (!params.pageName) {
      return null
    }

    if (!pages[params.pageName]) {
      return null
    }

    if (!pages[params.pageName].displayInHeader) {
      return null
    }

    return <span className="page-title" >{ '_' + pages[params.pageName].name }</span>
  }

  toggleMenu = () => {
    this.setState({
      menuIsOpen: !this.state.menuIsOpen
    })
  }

  closeMenu = (nextPath) => {
    this.setState({
      menuIsOpen: false
    })

    if (this.state.lastPath !== nextPath) {
      return this.setState({
        animateClosing: true
      })
    }

    this.setState({
      animateClosing: false
    })
  }

  render () {
    const toggleActive = this.state.menuIsOpen ? 'is-active' : ''
    const headerClass =
      (this.state.menuIsOpen ? 'menu-opened' : '') + ' ' +
      (this.state.animateClosing ? 'closing-animation' : '')

    return (
      <header className={headerClass} ref="top">
        <h3>
          <Link
            to={'/home'}>
            Totally not <span className="red">Last fm</span>
          </Link>
          <Route path="/:pageName" render={this.mapUrlToPageName} />
        </h3>
        <h5 className="menu-button">
          <button
            className={'hamburger hamburger--squeeze ' + toggleActive}
            type="button"
            aria-label="Menu"
            aria-controls="navigation"
            onClick={this.toggleMenu}>
            <span className="hamburger-box">
              <span className="hamburger-inner"></span>
            </span>
            <span className="hamburger-label">Menu</span>
          </button>
        </h5>
        <Menu
          isOpen={this.state.menuIsOpen}
          closeMenu={this.closeMenu}
          userInfos={this.props.userInfos}
        />
      </header>
    )
  }
}

export default withRouter(Header)
