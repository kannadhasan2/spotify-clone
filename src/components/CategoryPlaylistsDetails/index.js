import {Component} from 'react'
import Cookies from 'js-cookie'
import NavBar from '../NavBar'
import RenderPlayList from '../RenderPlayList'
import Loading from '../Loading'
import './index.css'

class CategoryPlaylistsDetails extends Component {
  state = {categoryPlaylist: [], apiStatus: ''}

  componentDidMount() {
    this.getCategoryPlaylists()
  }

  goBackButton = () => {
    const {history} = this.props
    history.goBack()
  }

  getCategoryPlaylists = async () => {
    this.setState({apiStatus: 'INITIAL'})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis2.ccbp.in/spotify-clone/category-playlists/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const {playlists} = data
      console.log(playlists)

      const {items} = playlists
      const playList = items.map(each => ({
        name: each.name,
        id: each.id,
        image: each.images[0].url,
        tracks: each.tracks.total,
      }))

      this.setState({categoryPlaylist: playList, apiStatus: 'SUCCESS'})
    } else {
      this.setState({apiStatus: 'FAIL'})
    }
  }

  render() {
    const {categoryPlaylist, apiStatus} = this.state
    return (
      <div className="category-main-container">
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
          <div>
            {apiStatus === 'INITIAL' && <Loading />}
            {apiStatus === 'FAIL' && (
              <div className="loading-main-container">
                <img
                  className="failure-view"
                  alt="failure view"
                  src="https://res.cloudinary.com/dn6izpj6p/image/upload/v1724637766/alert-triangle_hocotq.png"
                />
                <p className="failure-text">
                  Something went wrong. Please try again
                </p>
                <button
                  onClick={this.getCategoryPlaylists}
                  type="button"
                  className="try-again-button"
                >
                  Try Again
                </button>
              </div>
            )}
            {apiStatus === 'SUCCESS' && (
              <ul className="home-ul-container">
                {categoryPlaylist.map(eachItem => (
                  <RenderPlayList
                    playList={eachItem}
                    key={eachItem.id}
                    altAttribute="featured playlist"
                    track="true"
                  />
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default CategoryPlaylistsDetails
