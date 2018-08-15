import React, { Component } from 'react'
import _ from 'lodash'
import ReactDOM from 'react-dom'

import StatsPeriodesNavBar from './scenes/StatsPeriodesNavBar/StatsPeriodesNavBar'
import StatsSection from './scenes/StatsSection/StatsSection'

export default class extends Component {
  constructor (props) {
    super(props)
    this.state = {period: 0}
  }
  showPeriodStats = (period) => {
    this.setState({period: _.clamp(period, 0, 3)})
  }
  componentWillMount () {
    document.addEventListener('keydown', this.handleKeyPress)
  }
  handleKeyPress = (event) => {
    event.stopPropagation()
    switch (event.keyCode) {
      case 38 : this.setState(this.state.period > 0 ? this.showPeriodStats(this.state.period - 1) : this.showPeriodStats(this.state.period))
        window.scrollTo(0, ReactDOM.findDOMNode(this.refs.top))
        event.preventDefault()
        break
      case 40 : this.setState(this.state.period < 3 ? this.showPeriodStats(this.state.period + 1) : this.showPeriodStats(this.state.period))
        window.scrollTo(0, ReactDOM.findDOMNode(this.refs.top))
        event.preventDefault()
        break
      default:break
    }
  }
  render = () => (
    <section className="home-page">
      <StatsPeriodesNavBar showPeriodStats={this.showPeriodStats} currentPeriod={this.state.period} handleKeyPress={this.handleKeyPress}/>
      <section className="home-stats">
        <StatsSection period={this.state.period} />
      </section>
    </section>
  )
}
