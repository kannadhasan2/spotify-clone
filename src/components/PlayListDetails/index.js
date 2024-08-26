import {Component} from 'react'
import Cookies from 'js-cookie'
import ReactAudioPlayer from 'react-audio-player'
import RenderSongs from '../RenderSongs'
import NavBar from '../NavBar'
import './index.css'

class PlayListDetails extends Component {
  state = {
    playListDetail: {},
    songs: [],
    song: '',
  }

  componentDidMount() {
    this.getPlayListSongs()
  }

  getMusic = song => {
    this.setState({song})
  }

  getPlayListSongs = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis2.ccbp.in/spotify-clone/playlists-details/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      console.log(data.description)
      const playlistDetail = {
        description: data.description,
        name: data.name,
        image: data.images[0].url,
        owner: data.owner.display_name,
      }
      const {tracks} = data
      const {items} = tracks
      const musics = items.map(eachMusic => ({
        addedAt: eachMusic.added_at,
        artist: eachMusic.track.artists[0].name,
        durationInMs: eachMusic.track.duration_ms,
        id: eachMusic.track.id,
        songUrl: eachMusic.track.preview_url,
        songName: eachMusic.track.name,
        popularity: eachMusic.track.popularity,
      }))
      this.setState({playListDetail: playlistDetail, songs: musics})
    }
  }

  goBackButton = () => {
    const {history} = this.props
    history.goBack()
  }

  render() {
    const {playListDetail, songs, song} = this.state
    const {name, image, description, owner} = playListDetail
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
              <p className="editor">Editor Picks</p>
              <h1 className="song-playlist-name">{name}</h1>
              <p className="owner">{description}</p>
              <p className="owner">{owner}</p>
            </div>
          </div>
          <div className="playlist-topics-container">
            <h1 className="playlist-topics">Track</h1>
            <h1 className="playlist-topics">Album</h1>
            <h1 className="playlist-topics">Time</h1>
            <h1 className="playlist-topics">Artist</h1>
            <h1 className="playlist-topics">Added</h1>
          </div>
          <hr className="hr-line" />
          <ul className="ul-container">
            {songs.map((each, index) => (
              <RenderSongs
                songs={each}
                key={each.id}
                index={index + 1}
                description={description}
                getMusic={this.getMusic}
              />
            ))}
          </ul>
          <ReactAudioPlayer className="player" autoPlay controls src={song} />
        </div>
      </div>
    )
  }
}

export default PlayListDetails
