import { Link } from 'react-router-dom';
import React from 'react';

import '../App.css';

function Header() {
  return (
    <nav className="navbar navbar-default">
      <div className="container">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed nav-button" data-toggle="collapse" data-target="#navigationbar" aria-expanded="false">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <a className="App-title-navbar navbar-brand" href="/">
            <span className="glyphicon glyphicon-fire"></span> Yummy Recipes
          </a>
        </div>
        <div className="collapse navbar-collapse" id="navigationbar">
          <div className="search-box">
            <form action="/search" className="search-form navbar-form navbar-left" method="get" target="_top">
              <div className="form-group">
                <input
                  className="form-control search-input"
                  type="text"
                  name="q"
                  maxLength="50"
                  placeholder="Search categories..."/>
              </div>
              <button type="submit" className="btn btn-default search-button">Go</button>
            </form>
          </div>
          <ul className="nav navbar-nav navbar-right">
            <li><a href="/logout"><span className="glyphicon glyphicon-user"></span> Sign out</a></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
