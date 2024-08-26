import './index.css'

const Loading = () => (
  <div data-testid="loader" className="loading-main-container">
    <img
      className="loading-logo"
      src="https://res.cloudinary.com/dn6izpj6p/image/upload/v1724581341/music_jmyunj.png"
      alt="website logo"
    />
    <h1 className="loading-text">Loading...</h1>
  </div>
)

export default Loading
