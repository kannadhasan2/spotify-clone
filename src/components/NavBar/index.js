import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const NavBar = props => {
  const logout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <div className="nav-container">
      <Link to="/">
        <img
          className="logo"
          src="https://res.cloudinary.com/dn6izpj6p/image/upload/v1724581341/music_jmyunj.png"
          alt="website logo"
        />
      </Link>
      <div>
        <button onClick={logout} className="logout-button " type="button">
          <img
            src="https://res.cloudinary.com/dn6izpj6p/image/upload/v1724581340/log-out-04_zfxsl6.png"
            alt="logout"
          />
          <p className="logout-text">Logout</p>
        </button>
      </div>
      <button className="menu-button" type="button">
        <img
          src="https://res.cloudinary.com/dn6izpj6p/image/upload/v1724588679/menu_usmpfn.png"
          alt="logout"
        />
      </button>
      <button className="menu-button" type="button">
        Logout
      </button>
    </div>
  )
}

export default withRouter(NavBar)
