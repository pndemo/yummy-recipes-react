import React, { Component } from 'react';
import { categoryAPIURL } from './config';
import axios from 'axios'

import Header from './components/header';
import Footer from './components/footer';
import Categories from './category/categories';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogged: localStorage.getItem('token'),
    };
  }

  render() {
    if (this.state.isLogged) {
      return (
        <div className="App-light">
          <Header/>
          <Categories/>
          <Footer/>
        </div>
      );
    }
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">
            <span className="glyphicon glyphicon-fire"></span> Yummy Recipes
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
        <Footer/>
      </div>
    );
  }
}

export default App;
