/*
* -- Categories application component --
*  Display's logged in user's categories
*/

import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { baseAPIURL } from '../../config';
import { categoryAPIURL } from '../../config';
import privateAxiosInstance from '../../config';
import axios from 'axios'
import Time from 'react-time-format'

// Application styling
import '../../static/App.css';

class Categories extends Component {
  // App component properties
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      previousLink: '',
      nextLink: '',
      q: '',
    };
  }

  // Get recipe categories
  componentWillMount() {
    privateAxiosInstance.get(`${ categoryAPIURL }`)
    .then((response) => {
      if (response.status === 200) {
        this.setState({
          categories: response.data['results'],
          previousLink: response.data['previous_link'],
          nextLink: response.data['next_link'],
        });
      }
    })
    .catch((error) => {
      document.getElementById("error").innerHTML = error.response.data['message'];
    });
  }

  // When input changes
  onInputChanged = (event) => {
    this.setState({
        [event.target.name]: event.target.value
    })
  };

  // Handle categories search
  searchHandler = (event) => {
    event.preventDefault();
    privateAxiosInstance.get(`${ categoryAPIURL }search?q=${ this.state.q }`)
    .then((response) => {
        this.setState({
          categories: response.data['results'],
          previousLink: response.data['previous_link'],
          nextLink: response.data['next_link'],
        })
    })
    .catch((error) => {
      document.getElementById("error").innerHTML = error.response.data['message'];
    });
  };

  // Get previous page
  getPreviousPage = (event) => {
    event.preventDefault();
    privateAxiosInstance.get(`${ baseAPIURL }${ this.state.previousLink }`)
    .then((response) => {
        this.setState({
          categories: response.data['results'],
          previousLink: response.data['previous_link'],
          nextLink: response.data['next_link'],
        })
    })
    .catch((error) => {
      document.getElementById("error").innerHTML = error.response.data['message'];
    });
  };

  // Get next page
  getNextPage = (event) => {
    event.preventDefault();
    privateAxiosInstance.get(`${ baseAPIURL }${ this.state.nextLink }`)
    .then((response) => {
        this.setState({
          categories: response.data['results'],
          previousLink: response.data['previous_link'],
          nextLink: response.data['next_link'],
        })
    })
    .catch((error) => {
      document.getElementById("error").innerHTML = error.response.data['message'];
    });
  };

  // Component rendering
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <h1 className="App-page-title">Recipe Categories</h1>
          </div>
        </div>
        <p id="error" className="error"></p>
        <form onSubmit={ this.searchHandler }>
          <div className="row">
            <div className="col-xs-12 col-md-4">
              <a href="/category/add" className="btn btn-primary btn-block App-btn-add" role="button">
                <span className="glyphicon glyphicon-edit"></span> ADD CATEGORY
              </a>
            </div>
            <div className="col-xs-8 col-md-6">
              <div className="form-group">
                <input
                  className="form-control search-input"
                  type="text"
                  name="q"
                  value={ this.state.q }
                  onChange={ this.onInputChanged }
                  maxLength="50"
                  placeholder="Search categories..."/>
              </div>
            </div>
            <div className="col-xs-4 col-md-2">
              <button type="submit" className="btn btn-default btn-block search-button">SEARCH</button>
            </div>
          </div>
        </form>
        <div className="row">
          { this.state.categories.length > 0 ? this.state.categories.map((data, index) => {
            return (
              <div key={ index } className="col-xs-12 col-md-6 col-lg-4">
                <div className="card">
                  <div className="card-body text-left">
                    <h3 className="card-title">{ data.category_name }</h3>
                    <p className="card-text card-text-light">
                      <span className="glyphicon glyphicon-time"></span>
                      <Time value={ data.date_modified } format="DD-MM-YYYY HH:mm" />
                    </p>
                  </div>
                  <div className="card-body text-left">
                  <a href={ '/recipes/'+data.id } class="card-link">
                      <span className="glyphicon glyphicon-cutlery"></span> RECIPES
                    </a>
                    <a href={ '/category/edit/'+data.id } class="card-link">
                      <span className="glyphicon glyphicon-edit"></span> EDIT
                    </a>
                    <a href={ '/category/delete/'+data.id } class="card-link">
                      <span className="glyphicon glyphicon-edit"></span> DELETE
                    </a>
                  </div>
                </div>
              </div> 
            )
          }):
          <div className="col-xs-12 col-md-8 col-lg-6 col-md-offset-2 col-lg-offset-3">
            <p><strong>Sorry, no categories found.</strong></p>
          </div>
        }
        </div>
        <div className="row">
          <div className="col-xs-6 text-left">
            { this.state.previousLink !== '' ? (
              <form onSubmit={ this.getPreviousPage }>
                <button type="submit" className="btn btn-default search-button">
                <span className="glyphicon glyphicon-chevron-left"/> PREVIOUS
                </button>
              </form>
            ): (
              <form/>
            )}
          </div>
          <div className="col-xs-6 text-right">
            { this.state.nextLink !== '' ? (
              <form onSubmit={ this.getNextPage }>
                <button type="submit" className="btn btn-default search-button">
                  NEXT <span className="glyphicon glyphicon-chevron-right"/>
                </button>
              </form>
            ): (
              <form/>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Categories;
