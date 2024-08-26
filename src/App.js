import {Route, Switch, Redirect} from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CategoryPlaylistsDetails from './components/CategoryPlaylistsDetails'
import PlayListDetails from './components/PlayListDetails'
import Album from './components/Album'
import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute
      exact
      path="/category/:id/playlists"
      component={CategoryPlaylistsDetails}
    />
    <ProtectedRoute exact path="/playlist/:id" component={PlayListDetails} />
    <ProtectedRoute exact path="/album/:id" component={Album} />
    <ProtectedRoute exact path="/bad-path" component={NotFound} />
    <Redirect to="/bad-path" />
  </Switch>
)

export default App
