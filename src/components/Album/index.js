import {Component} from 'react'
import Cookies from 'js-cookie'
import NavBar from '../NavBar'

import './index.css'

class Album extends Component {
  state = {albumDetails: {}}

  componentDidMount() {
    this.getAlbumSongs()
  }

  getAlbumSongs = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis2.ccbp.in/spotify-clone/album-details/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()

      const albumDetails = {
        artist: data.artists[0].name,
        image: data.images[0].url,
        movieName: data.name,
        songUrl: data.tracks.items[0].preview_url,
        songName: data.tracks.items[0].name,
        duration: data.tracks.items[0].duration_ms,
      }
      this.setState({albumDetails})
    }
  }

  convertMilliseconds = ms => {
    const totalSeconds = Math.floor(ms / 1000)
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60

    return `${minutes}:${seconds}`
  }

  render() {
    const {albumDetails} = this.state
    const {artist, image, movieName, duration, songName, songUrl} = albumDetails
    return (
      <div className="home-main-container">
        <NavBar />
        <div>
          <button
            onClick={this.goBackButton}
            className="back-button"
            type="button"
          >
            <img
              src="https://res.cloudinary.com/dn6izpj6p/image/upload/v1724599063/arrow_back_evuwad.png"
              alt="back arrow"
            />
            <p>Back</p>
          </button>
          <div className="song-container-section">
            <img
              className="play-song-images"
              src={image}
              alt="featured playlist"
            />
            <div>
              <p className="editor">New Releases</p>
              <h1 className="song-playlist-name">{movieName}</h1>
              <p className="owner">{artist}</p>
            </div>
          </div>
          <div className="playlist-topics-container">
            <h1 className="playlist-topics">Track</h1>
            <h1 className="playlist-topics">Time</h1>
            <h1 className="playlist-topics">Artist</h1>
          </div>
          <hr className="hr-line" />
          <ul className="ul-container">
            <li className="songs-list list">
              <p className="song">{songName}</p>
              <p className="song">{this.convertMilliseconds(duration)}</p>
              <p className="song">{artist}</p>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

export default Album
