import faker from 'faker'
import YANG from 'yet-another-name-generator'
// import _ from 'lodash'

// import { periodsItemNbr } from './index'
import genres from './musicGenres.json'

export function getMostListenedAlbums (/* options */) {
  const itemsNbr = Math.floor(Math.random() * 8) + 3

  const data = []
  const labels = []

  for (let i = 1; i < itemsNbr; ++i) {
    data[i] = (Math.floor(Math.random() * 58)) + 7
    labels[i] = YANG.generate() + ' by ' + faker.address.streetName()
  }

  return {data: data, labels: labels}
}

export function getMostListenedGenres (/* options */) {
  const itemsNbr = Math.floor(Math.random() * 5) + 5

  const data = []
  const labels = []

  for (let i = 1; i < itemsNbr; ++i) {
    data[i] = (Math.floor(Math.random() * 30)) + 10
    labels[i] = genres[Math.floor(Math.random() * genres.length)]
  }

  return {data: data, labels: labels}
}

export function getMostListenedArtists (/* options */) {
  const itemsNbr = Math.floor(Math.random() * 8) + 3

  const data = []
  const labels = []

  for (let i = 1; i < itemsNbr; ++i) {
    data[i] = (Math.floor(Math.random() * 58)) + 7
    labels[i] = faker.address.streetName()
  }

  return {data: data, labels: labels}
}

export function getMostListenedAlbumsByArtists (options) {
  return getMostListenedAlbums(options)
}

export function getMostListenedTracksByArtists (/* options */) {
  const itemsNbr = Math.floor(Math.random() * 8) + 3

  const data = []
  const labels = []

  for (let i = 1; i < itemsNbr; ++i) {
    data[i] = (Math.floor(Math.random() * 58)) + 7
    labels[i] = YANG.generate() + ' by ' + faker.address.streetName()
  }

  return {data: data, labels: labels}
}
