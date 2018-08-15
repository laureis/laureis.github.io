import moment from 'moment/moment'

export default {
  daily: daily,
  weekly: weekly,
  monthly: monthly,
  yearly: yearly
}

function daily (section) {
  const labels = []
  let numOfHours = 24

  if (section === 0) numOfHours = moment().hour()

  for (let i = 0; i < numOfHours; ++i) {
    labels[i] = moment().hour(i).format('h A')
  }

  if (section === 0) labels[labels.length] = 'Now'

  return labels
}

function weekly (section) {
  const labels = []
  let numOfDays = 7

  if (section === 0) numOfDays = moment().weekday()

  for (let i = 0; i < numOfDays; ++i) {
    labels[i] = moment().weekday(i + 1).format('dddd')
  }

  if (section === 0) labels[labels.length - 1] = 'Today'

  return labels
}

function monthly (section) {
  const labels = []
  let numOfDaysInMonth

  if (section === 0) {
    numOfDaysInMonth = moment().date()
  } else {
    numOfDaysInMonth = moment().month(moment().month() - section + 1).date(0).date()
  }

  for (let i = 0; i < numOfDaysInMonth; ++i) {
    labels[i] = moment().date(i + 1).format('Do')
  }

  if (section === 0) labels[labels.length - 1] = 'today'

  return labels
}

function yearly (section) {
  const labels = []
  let numOfMonths = 12

  if (section === 0) numOfMonths = moment().month()

  for (let i = 0; i < numOfMonths; ++i) {
    labels[i] = moment().month(i).format('MMMM')
  }

  return labels
}
