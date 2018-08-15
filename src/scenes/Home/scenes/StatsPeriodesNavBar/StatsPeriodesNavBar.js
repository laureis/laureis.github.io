import React, { Component } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import stats from 'library/stats'

export default class extends Component {
  render = () => (
    <nav className="stats-period-nav">
      <div className="stats-bar">
      </div>
      <ReactCSSTransitionGroup
        transitionName={
          this.props.currentSection > 0
            ? 'period-nav-top' : 'period-nav-bottom'
        }
        transitionEnterTimeout={150}
        transitionLeaveTimeout={150}
        transitionEnter={true}
        transitionLeave={true}
        component="div"
        className="period-nav-animation">
        <ul className="side-nav">
          {
            stats.periods.map((p, i) => (
              <li
                className={this.props.currentPeriod === i ? 'selected' : ''}
                key={p.key}
                onClick={this.props.showPeriodStats.bind(this, i)}
                onKeyPress={this.props.handleKeyPress}>
                { p.name.charAt(0) }
                <span>{ p.name.substr(1) }</span>
              </li>
            ))
          }
        </ul>
      </ReactCSSTransitionGroup>
    </nav>
  )
}
