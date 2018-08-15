// React imports
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

// Bind service worker
import registerServiceWorker from './registerServiceWorker'

// Page structure imports
import App from './App'

// Create the dom
ReactDOM.render(
  <BrowserRouter>
    <App isConnected={false} />
  </BrowserRouter>, document.getElementById('root'))

registerServiceWorker()
