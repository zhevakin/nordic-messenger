import './App.css'
import Main from './routes/Main.js'
import About from './routes/About.js'
import Chats from './routes/Chats.js'
import { BrowserRouter, NavLink, Route, Switch } from "react-router-dom"

import { store } from './redux/store'
import { Provider } from 'react-redux'

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="container">
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
  )
}

export default App
