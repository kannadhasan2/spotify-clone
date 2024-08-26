import {Link} from 'react-router-dom'
import './index.css'

const RenderPlayList = props => {
  const {playList, altAttribute, track} = props
  const {image, id, name, tracks} = playList
  let link
  if (altAttribute === 'featured playlist') {
    link = '/playlist/'
  } else {
    link = '/album/'
  }
  return (
    <li className="render-list">
      <Link className="playlist-text-name" to={`${link}${id}`}>
        <img className="playlist-images" src={image} alt={altAttribute} />
        <p className="playlist-text-name">{name}</p>
        {track === 'true' && (
          <p className="playlist-text-name">{tracks} Tracks</p>
        )}
      </Link>
    </li>
  )
}

export default RenderPlayList
