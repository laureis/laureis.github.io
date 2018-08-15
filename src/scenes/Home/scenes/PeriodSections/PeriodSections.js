import React, { Component } from 'react'

import moment from 'moment'
import stats from 'library/stats'

export default class extends Component {
  constructor (props) {
    super(props)

    this.state = {
      period: this.props.period,
      currentSection: this.props.section
    }
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      period: nextProps.period,
      currentSection: 0
    })
  }

  genSections () {
    const sections = []

    switch (stats.periods[this.state.period].key) {
      case 'DAILY':
        sections[0] = 'today'
        sections[1] = 'yesterday'
        for (let i = 2; i < 7; ++i) {
          sections[i] = moment().weekday(-i).format('dddd')
        }
        break
      case 'WEEKLY':
        for (let i = 0; i < 5; ++i) {
          sections[i] = 'W' + moment().week(moment().week() - i).format('ww')
        }
        break
      case 'MONTHLY':
        for (let i = 0; i < 12; ++i) {
          sections[i] = moment().month(moment().month() - i).format('MMM')
        }
        break
      case 'YEARLY':
        for (let i = 0; i < 10; ++i) {
          sections[i] = moment().year(moment().year() - i).format('YYYY')
        }
        break
      default:
    }

    return sections
  }

  setSection = (index) => {
    this.setState({
      currentSection: index
    })

    this.props.onSectionChange(index)
  }

  render () {
    return (
      <ul className="period-sections">
        {
          this.genSections().map((section, index) => (
            <li
              key={section}
              className={this.state.currentSection === index ? 'selected' : ''}
              onClick={this.setSection.bind(this, index)}>
              {section}
            </li>
          ))
        }
      </ul>
    )
  }
}
