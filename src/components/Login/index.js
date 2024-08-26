import {Redirect} from 'react-router-dom'
import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', errorMsg: ''}

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {
      username,
      password,
    }
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      const jwtToken = data.jwt_token
      this.onSubmitSuccess(jwtToken)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({errorMsg})
  }

  getUsername = event => {
    this.setState({username: event.target.value})
  }

  getPassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {username, password, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-main-container">
        <div className="login-cart-container">
          <div className="spotify-logo-container">
            <img
              className="website-logo"
              src="https://res.cloudinary.com/dn6izpj6p/image/upload/v1724581341/music_jmyunj.png"
              alt="login website logo"
            />
            <h1 className="app-name">Spotify Remix</h1>
          </div>
          <form onSubmit={this.submitForm}>
            <label className="login-label" htmlFor="username">
              USERNAME
            </label>
            <br />
            <input
              onChange={this.getUsername}
              value={username}
              className="login-input"
              id="username"
              type="text"
            />
            <br />
            <label className="login-label" htmlFor="password">
              PASSWORD
            </label>
            <br />
            <input
              onChange={this.getPassword}
              value={password}
              className="login-input"
              id="password"
              type="password"
            />
            <br />
            <button type="submit" className="login-button">
              LOGIN
            </button>
            <p>{errorMsg}</p>
          </form>
        </div>
      </div>
    )
  }
}

export default Login
