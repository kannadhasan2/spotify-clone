import {Link} from 'react-router-dom'
import NavBar from '../NavBar'
import './index.css'

const NotFound = props => {
  const goBackButton = () => {
    const {history} = props
    history.goBack()
  }

  return (
    <div className="not-found-main-container ">
      <NavBar />
      <div>
        <button onClick={goBackButton} className="back-button" type="button">
          <img
            src="https://res.cloudinary.com/dn6izpj6p/image/upload/v1724599063/arrow_back_evuwad.png"
            alt="back arrow"
          />
          <p>Back</p>
        </button>
        <div className="not-found">
          <div className="not-found">
            <img
              className="not-found-image"
              src="https://res.cloudinary.com/dn6izpj6p/image/upload/v1724598681/404_rjjccq.png"
              alt="page not found"
            />
            <h1>Page Not Found</h1>
            <Link to="/">
              <button type="button">Home Page</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFound
