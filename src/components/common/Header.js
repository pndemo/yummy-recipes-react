import React from 'react';

import '../../static/App.css';

function Header() {
  return (
    <nav className="navbar navbar-default">
      <div className="container">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed nav-button" data-toggle="collapse" data-target="#navigationbar" aria-expanded="false">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar" />
            <span className="icon-bar" />
            <span className="icon-bar" />
          </button>
          <a className="App-title-navbar navbar-brand" href="/">
            <span className="glyphicon glyphicon-fire" /> Yummy Recipes
          </a>
        </div>
        <div className="collapse navbar-collapse" id="navigationbar">
          <ul className="nav navbar-nav navbar-right">
            <li><a href="/change_password"><span className="glyphicon glyphicon-user" /> Change Password</a></li>
            <li><a href="/logout"><span className="glyphicon glyphicon-log-out" /> Sign out</a></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
