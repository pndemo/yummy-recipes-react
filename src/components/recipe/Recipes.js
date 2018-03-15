/*
* -- Recipes application component --
*  Display's logged in specific category's recipes
*/

import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { baseAPIURL } from '../../config';
import { recipeAPIURL } from '../../config';
import privateAxiosInstance from '../../config';
import Header from '../common/Header';
import FooterFlex from '../common/FooterFlex';
import axios from 'axios'
import Time from 'react-time-format'
import { ToastContainer, toast } from 'react-toastify';

// Application styling
import '../../static/App.css';

class Recipes extends Component {
    // App component properties
    constructor(props) {
        super(props);
        this.state = {
            recipes: [],
            previousLink: '',
            nextLink: '',
            q: '',
        };
    }

    // Get category recipes
    componentWillMount() {
        privateAxiosInstance.get(`${ recipeAPIURL }${ this.props.match.params.category_id }/`)
        .then((response) => {
        if (response.status === 200) {
            this.setState({
            recipes: response.data['results'],
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

    // Handle recipes search
    searchHandler = (event) => {
        event.preventDefault();
        privateAxiosInstance.get(`${ recipeAPIURL }${ this.props.match.params.category_id }/search?q=${ this.state.q }`)
        .then((response) => {
            this.setState({
            recipes: response.data['results'],
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
                recipes: response.data['results'],
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
                recipes: response.data['results'],
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
            <div className="App-light">
                <Header/>
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12">
                        <h1 className="App-page-title">Recipes</h1>
                        </div>
                    </div>
                    <p id="error" className="error"></p>
                    <form onSubmit={ this.searchHandler }>
                        <div className="row">
                        <div className="col-xs-12 col-md-4">
                            <a href={'/recipe/'+this.props.match.params.category_id+'/add'} className="btn btn-primary btn-block App-btn-add" role="button">
                            <span className="glyphicon glyphicon-edit"></span> ADD RECIPE
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
                                placeholder="Search recipes..."/>
                            </div>
                        </div>
                        <div className="col-xs-4 col-md-2">
                            <button type="submit" className="btn btn-default btn-block search-button">SEARCH</button>
                        </div>
                        </div>
                    </form>
                    <div className="row">
                        { this.state.recipes.length > 0 ? this.state.recipes.map((data, index) => {
                        return (
                            <div key={ index } className="col-xs-12 col-md-6 col-lg-4">
                            <div className="card">
                                <div className="card-body text-left">
                                <h3 className="card-title">{ data.recipe_name }</h3>
                                <p className="card-text card-text-dark">
                                    <strong>Ingredients</strong>
                                </p>
                                <p className="card-text card-text-dark">
                                    { data.ingredients }
                                </p>
                                <p className="card-text card-text-dark">
                                    <strong>Directions</strong>
                                </p>
                                <p className="card-text card-text-dark">
                                    { data.directions }
                                </p>
                                <p className="card-text card-text-light">
                                    <span className="glyphicon glyphicon-time"></span>
                                    <Time value={ data.date_modified } format="DD-MM-YYYY HH:mm" />
                                </p>
                                </div>
                                <div className="card-body text-left">
                                <a href={ '/recipe/'+data.category_id+'/edit/'+data.id } class="card-link">
                                    <span className="glyphicon glyphicon-edit"></span> EDIT
                                </a>
                                <a href={ '/recipe/'+data.category_id+'/delete/'+data.id } class="card-link">
                                    <span className="glyphicon glyphicon-edit"></span> DELETE
                                </a>
                                </div>
                            </div>
                            </div> 
                        )
                        }):
                        <div className="col-xs-12 col-md-8 col-lg-6 col-md-offset-2 col-lg-offset-3">
                            <p><strong>Sorry, no recipes found.</strong></p>
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
                <FooterFlex/>
            </div>
        );
    }
}

export default Recipes;
