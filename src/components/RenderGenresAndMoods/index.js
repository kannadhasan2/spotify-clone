import {Link} from 'react-router-dom'
import './index.css'

const RenderGenresAndMoods = props => {
  const {playList, altAttribute} = props
  const {image, id, name} = playList

  return (
    <li className="render-list">
      <Link className="playlist-text-name" to={`/category/${id}/playlists`}>
        <img className="playlist-images" src={image} alt={altAttribute} />
        <p className="playlist-text-name">{name}</p>
      </Link>
    </li>
  )
}

export default RenderGenresAndMoods
