import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Graph from 'containers/Graph/Graph'
import labelGenerator from 'library/labelGenerator'

import api from 'library/dataGenerator'

export default class StatBlock extends Component {
  constructor (props) {
    super(props)
    this.state = {
      graph: {
        data: [],
        labels: []
      }
    }

    this.getData()
  }

  static propTypes = {
    type: PropTypes.string.isRequired,
    size: PropTypes.oneOf(['small', 'wide']),
    route: PropTypes.string.isRequired,
    post: PropTypes.arrayOf(PropTypes.object),
    period: PropTypes.object,
    section: PropTypes.number.isRequired
  }

  static defaultProps = {
    type: 'list',
    size: 'small',
    route: '/',
    post: [],
    name: 'Graph'
  }

  genLabels (period) {
    // Generate the labels for the current period if needed
    // If the period isn't over, determine up to when to generate
    return labelGenerator[period.name](this.props.section)
  }

  getData () {
    api.get(this.props.route, {
      period: this.props.period
    }).then(response => {
      let labels = response.data.labels ? response.data.labels : this.genLabels(this.props.period)

      this.setState({
        graph: {
          data: response.data.data,
          labels: labels
        }
      })
    }).catch(reponse => console.log(reponse))
  }

  render () {
    const baseClass = 'stat-block'
    let fullClass

    switch (this.props.size) {
      case 'wide':
        fullClass = baseClass + ' wide'
        break
      default:
        fullClass = baseClass
    }

    return (
      <div className={fullClass} key={this.props.route}>
        <h4 key={this.props.route + '-h4'}>
          {this.props.name}
        </h4>
        <Graph
          key={this.props.route + '-graph'}
          type={this.props.type}
          data={this.state.graph.data}
          labels={this.state.graph.labels}
          toColor={this.props.colors.to}
          fromColor={this.props.colors.from}
          size={this.props.size}
        />
      </div>
    )
  }
}
