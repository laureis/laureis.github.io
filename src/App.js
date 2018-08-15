// React
import React, { Component } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'

// Scene dependencies
import './style/App.scss'
import auth from 'library/auth'

// Scene scenes
import Landing from './scenes/Landing/Landing'
import Structure from './containers/Structure/Structure'

import Home from './scenes/Home/Home'
import About from './scenes/About/About'
import Settings from './scenes/Settings/Settings'

class App extends Component {
  constructor (props) {
    super(props)
    document.title = 'Totally not Last fm'

    // Set state as not logged in
    this.state = {
      loaded: false,
      isUser: false,
      token: '',
      user: {}
    }
  }

  componentWillMount () {
    // Allow for automated connection for tests
    // TODO: DO SOMETHING BETTER BECAUSE THIS IS BAD
    if (this.props.forceLogin) {
      auth.setToken('testtoken')
    }

    this.updateUserState(false)
  }

  updateUserState = () => {
    auth.i().userInfos().then(infos => {
      if (infos.id) {
        this.setState({
          isUser: true,
          user: infos,
          loaded: true
        })
        return
      }

      this.setState({
        isUser: false,
        user: {},
        loaded: true
      })
    })
  }

  render = () => {
    if (!this.state.loaded) {
      return null
    }

    if (!this.state.isUser) {
      return <Landing checkLogin={this.updateUserState}/>
    }

    return (
      <Structure ref="structure" userInfos={this.state.user}>
        <Switch >
          <Route
            path={'/about'}
            render={(props) => <About {...props} userInfos={this.state.user}/>} />
          <Route
            path={'/settings'}
            render={(props) => <Settings {...props} userInfos={this.state.user}/>} />
          <Route
            path={'/'}
            render={(props) => <Home {...props} userInfos={this.state.user}/>} />
        </Switch>
      </Structure>
    )
  }
}

export default withRouter(App)
