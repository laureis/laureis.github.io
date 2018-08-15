import { getHistory } from './history'
import {
  getMostListenedAlbums,
  getMostListenedGenres,
  getMostListenedArtists,
  getMostListenedAlbumsByArtists,
  getMostListenedTracksByArtists
} from './mostlistened'

// Data generator 'simulate' api.get behavior by using a promise,
// just like an API would do
// The result is given inside a data object like an axios reponse
const dataGenerator = (route, post) => {
  return new Promise((resolve, reject) => {
    const routeElements = route.split('/')
    if (routeElements[0].length === 0) routeElements.shift()

    // Dispatch to different generation methods
    if (!routes[routeElements[0]]) return reject(rsp('bad route', 400))

    if (typeof routes[routeElements[0]] === 'function') {
      resolve(rsp(routes[routeElements[0]](post)))
    }

    if (!routes[routeElements[0]][routeElements[1]]) return reject(rsp('bad route', 400))

    if (typeof routes[routeElements[0]][routeElements[1]] === 'function') {
      resolve(rsp(routes[routeElements[0]][routeElements[1]](post)))
    }

    if (!routes[routeElements[0]][routeElements[1]][routeElements[2]]) return reject(rsp('bad route', 400))

    if (typeof routes[routeElements[0]][routeElements[1]][routeElements[2]] === 'function') {
      resolve(rsp(routes[routeElements[0]][routeElements[1]][routeElements[2]](post)))
    }
  })
}

const routes = {
  'history': getHistory,
  'stats': {
    'mostlistened': {
      'albums': getMostListenedAlbums,
      'genres': getMostListenedGenres,
      'artists': getMostListenedArtists,
      'albumsbyartists': getMostListenedAlbumsByArtists,
      'tracksbyartists': getMostListenedTracksByArtists,
      'artistsbyseason': 'getMostListenedArtistsBySeason'
    },
    'cumulatedtime': 'getCumulatedTime'
  }
}

export const periodsItemNbr = {
  'DAILY': 24,
  'WEEKLY': 7,
  'MONTHLY': 31,
  'YEARLY': 12
}

const rsp = (obj, code = 200) => {
  return {
    status: code,
    data: obj
  }
}

export default {
  get: dataGenerator
}
