import {Component} from 'react'
import Cookies from 'js-cookie'
import Loading from '../Loading'
import NavBar from '../NavBar'
import RenderPlayList from '../RenderPlayList'
import RenderGenresAndMoods from '../RenderGenresAndMoods'
import './index.css'

class Home extends Component {
  state = {
    editorPicked: [],
    categoryList: [],
    newReleases: [],
    isLoadingEditor: '',
    isLoadingCategory: '',
    isLoadingNewReleases: '',
  }

  componentDidMount() {
    this.getPlayList()
    this.getGenreAndMoods()
    this.getNewReleases()
  }

  getNewReleases = async () => {
    this.setState({isLoadingNewReleases: 'INITIAL'})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis2.ccbp.in/spotify-clone/new-releases'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()

      const {albums} = data
      const {items} = albums
      const newReleases = items.map(each => ({
        name: each.name,
        id: each.id,
        image: each.images[0].url,
      }))
      this.setState({newReleases, isLoadingNewReleases: 'SUCCESS'})
    } else {
      this.setState({isLoadingNewReleases: 'FAIL'})
    }
  }

  getGenreAndMoods = async () => {
    this.setState({isLoadingCategory: 'INITIAL'})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis2.ccbp.in/spotify-clone/categories'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()

      const {categories} = data
      const {items} = categories
      const categoryList = items.map(each => ({
        name: each.name,
        id: each.id,
        image: each.icons[0].url,
      }))
      this.setState({categoryList, isLoadingCategory: 'SUCCESS'})
    } else {
      this.setState({isLoadingCategory: 'FAIL'})
    }
  }

  getPlayList = async () => {
    this.setState({isLoadingEditor: 'INITIAL'})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis2.ccbp.in/spotify-clone/featured-playlists'
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
      const {items} = playlists
      const editor = items.map(each => ({
        id: each.id,
        image: each.images[0].url,
        name: each.name,
      }))

      this.setState({editorPicked: editor, isLoadingEditor: 'SUCCESS'})
    } else {
      this.setState({isLoadingEditor: 'FAIL'})
    }
  }

  render() {
    const {
      isLoadingCategory,
      isLoadingNewReleases,
      isLoadingEditor,
      editorPicked,
      categoryList,
      newReleases,
    } = this.state
    return (
      <div className="home-main-container">
        <NavBar />

        <div>
          <div>
            <h1 className="home-content-text">Editor Picks</h1>
            {isLoadingEditor === 'INITIAL' && <Loading />}
            {isLoadingEditor === 'FAIL' && (
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
                  onClick={this.getPlayList}
                  type="button"
                  className="try-again-button"
                >
                  Try Again
                </button>
              </div>
            )}
            {isLoadingEditor === 'SUCCESS' && (
              <ul className="home-ul-container">
                {editorPicked.map(eachItem => (
                  <RenderPlayList
                    playList={eachItem}
                    key={eachItem.id}
                    altAttribute="featured playlist"
                  />
                ))}
              </ul>
            )}
          </div>
          <div>
            <h1 className="home-content-text">Genres & Moods</h1>
            {isLoadingCategory === 'INITIAL' && <Loading />}
            {isLoadingCategory === 'FAIL' && (
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
                  onClick={this.getGenreAndMoods}
                  type="button"
                  className="try-again-button"
                >
                  Try Again
                </button>
              </div>
            )}
            {isLoadingCategory === 'SUCCESS' && (
              <ul className="home-ul-container">
                {categoryList.map(eachItem => (
                  <RenderGenresAndMoods
                    playList={eachItem}
                    key={eachItem.id}
                    altAttribute="category"
                  />
                ))}
              </ul>
            )}
          </div>
          <div>
            <h1 className="home-content-text">New releases</h1>
            {isLoadingNewReleases === 'INITIAL' && <Loading />}
            {isLoadingNewReleases === 'FAIL' && (
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
                  onClick={this.getNewReleases}
                  type="button"
                  className="try-again-button"
                >
                  Try Again
                </button>
              </div>
            )}
            {isLoadingNewReleases === 'SUCCESS' && (
              <ul className="home-ul-container">
                {newReleases.map(eachItem => (
                  <RenderPlayList
                    playList={eachItem}
                    key={eachItem.id}
                    altAttribute="new release album"
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
export default Home
