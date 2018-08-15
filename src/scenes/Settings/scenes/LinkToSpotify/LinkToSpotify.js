import React, { Component } from 'react'

export default class extends Component {
  render () {
    return (
      <div className="settings-section">
        <div className="spotify-link btn">Connect to Spotify</div>
        <p className="settings-disclaimer">
          By connecting to Spotify, you allows us to retrieve and store your listening history.<br />
          This is used to provide statistics on your listening behaviour.<br />
          We do not share the data we gather to anyone. <i>Totally not Last.fm</i> respect your privacy.
        </p>
      </div>
    )
  }
}
