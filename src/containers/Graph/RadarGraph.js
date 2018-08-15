import React from 'react'
import GraphEntity from './GraphEntity'
import _ from 'lodash'

import { Radar } from 'react-chartjs-2'
import { radarTooltip } from './tooltips'
import radarStyle from './styles/radar.json'

export default class extends GraphEntity {
  genData (props) {
    // Create gradient
    const gradient = this.getRadialGradient(props.toColor, props.fromColor, this.ctx.canvas.offsetWidth / 2, this.ctx.canvas.offsetHeight / 2)

    this.setState({ graphData: {
      labels: props.labels,
      datasets: [{
        data: _.take(props.data, props.labels.length),
        backgroundColor: gradient,
        pointBackgroundColor: 'transparent',
        pointBorderColor: 'transparent',
        borderColor: 'transparent',
        pointHitRadius: 10
      }]
    }})

    document.getElementById('tooltip-' + props.graphID).style.backgroundColor = props.toColor
  }

  getGraphOption () {
    let graphOptions = radarStyle
    graphOptions.tooltips.custom = radarTooltip

    return graphOptions
  }

  render () {
    return super.render(Radar, 'radar')
  }
}
