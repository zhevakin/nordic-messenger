import { Provider } from 'react-redux'
import { BrowserRouter, NavLink, Route, Switch } from "react-router-dom"
import { Auth0Provider } from '@auth0/auth0-react'
import { store } from './redux/store'
import Main from './routes/Main.js'
import About from './routes/About.js'
import Chats from './routes/Chats.js'
import LoginButton from './components/LoginButton'
import './App.css'

function App() {
  const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID
  const domain = process.env.REACT_APP_AUTH0_DOMAIN

  return (
    <Auth0Provider clientId={clientId} domain={domain} redirectUri={window.location.origin}>
      <Provider store={store}>
        <BrowserRouter>
          <div className="container">
            <div className="d-flex align-items-center justify-content-between">
              <ul className="nav">
                <li className="nav-item">
                  <NavLink className="nav-link" activeClassName="active" to="/">Главная</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" activeClassName="active" to="/chats">Чаты</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" activeClassName="active" to="/about">О компании</NavLink>
                </li>
              </ul>
              <LoginButton/>
            </div>
            <Switch>
              <Route path="/about">
                <Main/>
              </Route>
              <Route path="/chats/:chatId?">
                <Chats/>
              </Route>
              <Route path="/">
                <About/>
              </Route>
            </Switch>
          </div>
        </BrowserRouter>
      </Provider>
    </Auth0Provider>
  )
}

export default App
