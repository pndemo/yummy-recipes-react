import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { categoryAPIURL } from '../config';
import axios from 'axios'
import Time from 'react-time-format'

import '../App.css';

class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogged: localStorage.getItem('token'),
      categories: [],
    };
  }

  componentWillMount() {
    axios.get(`${ categoryAPIURL }`, { 'headers': { 'Authorization': 'Bearer ' + localStorage.getItem('token') }})
    .then((response) => {
      if (response.status === 200) {
        this.setState({
          categories: response.data['results'],
        });
      }
    })
    .catch((error) => {
      let messages = error.response.data['message'];
    });
  }

  render() {
    if (this.state.isLogged) {
      return (
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <h1 className="App-page-title">Recipe Categories</h1>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12 col-md-6 col-lg-4 col-md-offset-3 col-lg-offset-4">
              <a href="/category/add" className="btn btn-primary btn-block App-btn-add" role="button">
                <span className="glyphicon glyphicon-edit"></span> ADD CATEGORY
              </a>
            </div>
          </div>
          <div className="row">
            { this.state.categories.map((data, index) => {
              return (
                <div key={ index } className="col-xs-12 col-md-6 col-lg-4">
                  <div className="card">
                    <div className="card-body text-left">
                      <h3 className="card-title">{ data.category_name }</h3>
                      <p className="card-text">
                        <span className="glyphicon glyphicon-time"></span>
                        <Time value={ data.date_modified } format="DD-MM-YYYY HH:mm" />
                      </p>
                    </div>
                    <div className="card-body text-left">
                      <a href="#" class="card-link">
                        <span className="glyphicon glyphicon-cutlery"></span> RECIPES
                      </a>
                      <a href={ 'category/edit/'+data.id } class="card-link">
                        <span className="glyphicon glyphicon-edit"></span> EDIT
                      </a>
                      <a href={ 'category/delete/'+data.id } class="card-link">
                        <span className="glyphicon glyphicon-edit"></span> DELETE
                      </a>
                    </div>
                  </div>
                </div> 
              )
            })}
          </div>
        </div>
      );
    }
    return <Redirect to="/login"/>
  }
}

export default Categories;
