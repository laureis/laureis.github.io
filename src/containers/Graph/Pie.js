import React from 'react'
import GraphEntity from './GraphEntity'

import {Pie} from 'react-chartjs-2'
import doughnutStyle from './styles/doughnut.json'
import { interpolateRgb } from 'd3-interpolate'
import { doughnutTooltip } from './tooltips'

export default class extends GraphEntity {
  genData = (props) => {
    const getColor = interpolateRgb(props.toColor, props.fromColor)
    const gradientStops = props.data.map((val, index, { length }) => {
      return getColor(index / length)
    })

    // Create gradient
    this.setState({ graphData: {
      labels: props.labels,
      datasets: [{
        data: props.data,
        backgroundColor: gradientStops,
        pointBackgroundColor: 'transparent',
        borderColor: '#FFF',
        borderWidth: 2,
        hoverBorderColor: '#FFF',
        hoverBorderWidth: 2
      }]
    }})

    document.getElementById('tooltip-' + props.graphID).style.backgroundColor = props.toColor
  }

  getGraphOption () {
    let graphOptions = doughnutStyle
    graphOptions.tooltips.custom = doughnutTooltip

    return graphOptions
  }

  render = () => {
    return super.render(Pie, 'doughnut')
  }
}
