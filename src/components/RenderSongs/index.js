import moment from 'moment'
import './index.css'

const RenderSongs = props => {
  const {songs, index, description, getMusic} = props
  const convertMilliseconds = ms => {
    const totalSeconds = Math.floor(ms / 1000)
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60

    return `${minutes}:${seconds}`
  }
  const {songUrl, songName, artist, durationInMs, addedAt} = songs
  const date = new Date(addedAt)
  console.log(date)
  const da = `${date.getFullYear()}, ${date.getMonth() + 1},${date.getDate()}`
  return (
    <li>
      <button
        onClick={() => getMusic(songUrl)}
        type="button"
        className="songs-list"
      >
        <p>{index}</p>
        <p className="song-name">{songName}</p>
        <h1 className="song-name1">{description}</h1>
        <p className="song-name1">{convertMilliseconds(durationInMs)}</p>
        <p className="song-name">{artist}</p>
        <p className="song-name">{moment([da]).toNow(true)} ago </p>
      </button>
    </li>
  )
}

export default RenderSongs
