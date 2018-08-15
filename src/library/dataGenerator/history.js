// import chance from 'chance'
// import YANG from 'yet-another-name-generator'
import _ from 'lodash'

import { periodsItemNbr } from './index'

export function getHistory (options) {
  const itemsNbr = periodsItemNbr[options.period.key]
  const startValue = Math.floor(Math.random() * 10)
  const data = []

  data[0] = startValue
  for (let i = 1; i < itemsNbr; ++i) {
    data[i] = _.clamp(data[i - 1] + (Math.floor(Math.random() * 14) - 7), 0, 20)
  }

  return {data: data}
}
