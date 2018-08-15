import React, { Component } from 'react'

// Regroup all methods and inforamtions needed
// by all the different graphs
export default class GraphEntity extends Component {
  static defaultProps = {
    topColor: 'red',
    bottomColor: '#F2DDDE',
    graphID: 0
  }

  constructor (props) {
    super(props)
    this.state = {
      graphData: {}
    }

    this.ctx = null
  }

  genData () {
    throw new Error('You need to implement genData in child class')
  }

  dataSelector = (canvas) => {
    // Store the graph ctx for the later use.
    this.ctx = canvas.getContext('2d')
    return this.state.graphData
  }

  componentDidMount () {
    this.genData(this.props) // Generate data only when graph has been mounted
  }

  componentWillReceiveProps (newProps) {
    this.genData(newProps)
  }

  onMouseOut = () => {
    // Hide tooltip on mouse out
    const tooltip = document.getElementById('tooltip-' + this.props.graphID)
    if (!tooltip) return

    tooltip.style.opacity = 0
  }

  getLinearGradient (topColor, bottomColor, height) {
    const gradient = this.ctx.createLinearGradient(0, 0, 0, height)
    gradient.addColorStop(0, topColor)
    gradient.addColorStop(1, bottomColor)

    return gradient
  }

  getRadialGradient (outerColor, innerColor, radiusX, radiusY) {
    const gradient = this.ctx.createRadialGradient(radiusX, radiusY, 0, radiusX, radiusY, radiusY)
    gradient.addColorStop(0, innerColor)
    gradient.addColorStop(1, outerColor)

    return gradient
  }

  render (Graph, className = '') {
    const height = this.props.size === 'wide' ? 50 : 60
    return <div
      className={'graph-item ' + className + '-graph'}
      onMouseOut={this.onMouseOut}>
      <Graph
        data={this.dataSelector}
        width={100}
        height={height}
        options={this.getGraphOption()}
      />
      <div
        className="chartjs-tooltip"
        id={'tooltip-' + this.props.graphID}>
      </div>
    </div>
  }
}
