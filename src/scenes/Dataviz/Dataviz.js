import React, {Component} from 'react'

import '../../containers/Graph/Dataviz.scss'
import LineGraph from '../../containers/Graph/LineGraph'
import BarGraph from '../../containers/Graph/BarGraph'
import DoughnutGraph from '../../containers/Graph/DoughnutGraph'

export default class extends Component {
  render = () => {
    return <div className='graph-wrapper'>
      <LineGraph/>
      <BarGraph/>
      <DoughnutGraph/>
    </div>
  }
}
