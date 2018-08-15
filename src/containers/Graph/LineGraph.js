import React from 'react'
import GraphEntity from './GraphEntity'

import {Line} from 'react-chartjs-2'
import lineStyle from './styles/line.json'
import { graphTooltip } from './tooltips'

export default class extends GraphEntity {
  genData (props) {
    // Create gradient
    const gradient = this.getLinearGradient(props.toColor, props.fromColor, this.ctx.canvas.offsetHeight)

    let labels = props.labels
    let data = props.data

    if (labels.length === 1) {
      labels[1] = labels[0]
      data[1] = data[0]
    }

    this.setState({ graphData: {
      labels: labels,
      datasets: [{
        data: data,
        backgroundColor: gradient,
        pointBackgroundColor: 'transparent',
        borderColor: 'transparent'
      }]
    }})

    document.getElementById('tooltip-' + props.graphID).style.backgroundColor = props.toColor
  }

  getGraphOption () {
    let graphOptions = lineStyle
    graphOptions.tooltips.custom = graphTooltip

    return graphOptions
  }

  render () {
    return super.render(Line, 'line')
  }
}
