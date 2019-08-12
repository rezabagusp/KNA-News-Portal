import React, { Component } from 'react';
import './App.css';
import { HashRouter, Route, NavLink, Link } from 'react-router-dom';

//View
import Home from './view/Home/Home';
import Bookmark from './view/Bookmark/Bookmark';
class App extends Component {
  isLinkActiveClass = () => {
    return {
      color: '#fff',
      fontWeight: 500,
      opacity: 1
    }
  }

  render() {
    return (
      <HashRouter>
        <div className="App">
          {/* Link */}
          <nav className="navbar">
            <div className="container navbar-container">
              <ul>
                <li>
                  <NavLink to='/' exact
                    activeStyle={
                      this.isLinkActiveClass()
                    }>Home</NavLink>
                </li>
                <li>
                  <NavLink to='/bookmark' exact
                    activeStyle={
                      this.isLinkActiveClass()
                    }>Bookmark</NavLink>
                </li>
              </ul>
            </div>
            <Link to='/'>
              <div className="app-name">News Portal</div>
            </Link>
          </nav>

          {/* router */}
          <div className="main-content">
            <Route path='/' exact strict component={Home} />
            <Route path='/bookmark' exact component={Bookmark} />
          </div>

          {/* footer */}
          <footer className="footer">
            <p><span> &copy; 2019 @rezabagusp.</span> Powered by NewsApi.org </p>
          </footer>
        </div>
      </HashRouter>
    );
  }
}

export default App;
