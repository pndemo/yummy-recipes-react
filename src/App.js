/*
* -- Main application component --
*  Displays home page for unauthenticated user
*  Displays recipe categories for authenticated user
*/

import React, { Component } from 'react';
import Header from './components/common/Header';
import FooterFlex from './components/common/FooterFlex';
import FooterStatic from './components/common/FooterStatic';
import Categories from './components/category/Categories';

// Application styling
import './static/App.css';

class App extends Component {
  // App component properties
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: localStorage.getItem('token'),
    };
  }

  // Component rendering
  render() {
    if (this.state.isLoggedIn) {
      // Render recipe categories
      return (
        <div className="App-light">
          <Header />
          <Categories />
          <FooterFlex />
        </div>
      );
    }
    return (
      // Render home page
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">
            <span className="glyphicon glyphicon-fire" /> Yummy Recipes
          </h1>
        </header>
        <div className="row">
          <div className="col-xs-12">
            <p className="App-intro">
              Your Home of Quality Recipes
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-md-10 col-lg-8 col-md-offset-1 col-lg-offset-2">
            <p className="App-intro-desc">
              Yummy Recipes app provides a platform for users to keep track of their awesome recipes
              and share with others if they so wish.
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-6">
            <span className="pull-right">
              <a className="App-register btn btn-primary btn-lg" href="/register" role="button">
                Create Account
              </a>
            </span>
          </div>
          <div className="col-xs-6">
            <span className="pull-left">
              <a className="App-login btn btn-primary btn-lg" href="/login" role="button">
                Sign In &raquo;
              </a>
            </span>
          </div>
        </div>
        <FooterStatic />
      </div>
    );
  }
}

export default App;
