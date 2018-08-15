import React from 'react'
import GraphEntity from './GraphEntity'

import {HorizontalBar} from 'react-chartjs-2'
import barStyle from './styles/bar.json'
import { horizontalTooltip } from './tooltips'

export default class extends GraphEntity {
  genData (props) {
    // Create gradient
    const gradient = this.getLinearGradient(props.toColor, props.fromColor, this.ctx.canvas.offsetHeight)

    // YoU R NoT sUpPoSeD To UnDeRsTaNd ThIs
    props.labels.shift()
    props.data.shift()

    this.setState({ graphData: {
      labels: props.labels,
      datasets: [{
        data: props.data,
        backgroundColor: gradient,
        borderColor: 'transparent',
        hoverBackgroundColor: props.toColor
      }]
    }})

    document.getElementById('tooltip-' + props.graphID).style.backgroundColor = this.props.toColor
  }

  getGraphOption () {
    let graphOptions = barStyle
    graphOptions.tooltips.custom = horizontalTooltip

    return graphOptions
  }

  render = () => {
    return super.render(HorizontalBar, 'bar')
  }
}
