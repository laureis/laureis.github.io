import React, { Component } from 'react'
import PropTypes from 'prop-types'

import GraphManager from './GraphManager'

import BarGraph from './BarGraph'
import HorizontalBarGraph from './HorizontalBarGraph'
import LineGraph from './LineGraph'
import PieGraph from './Pie'
import DoughnutGraph from './DoughnutGraph'
import RadarGraph from './RadarGraph'

export default class extends Component {
  constructor (props) {
    super(props)
    this.state = {
      graphID: GraphManager.getInstance().addGraph(),
      data: [],
      labels: []
    }
  }

  static propTypes = {
    type: PropTypes.string.isRequired
  }

  static defaultProps = {
    type: 'list',
    data: []
  }

  componentWillReceiveProps (props) {
    this.setState({
      data: props.data,
      labels: props.labels
    })
  }

  graphs = {
    'bar': BarGraph,
    'horizontalBar': HorizontalBarGraph,
    'line': LineGraph,
    'pie': PieGraph,
    'doughnut': DoughnutGraph,
    'radar': RadarGraph
  }

  render () {
    const Graph = this.graphs[this.props.type]
    return <Graph
      data={this.state.data}
      labels={this.state.labels}
      graphID={this.state.graphID}
      toColor={this.props.toColor}
      fromColor={this.props.fromColor}
      size={this.props.size}
    />
  }
}
