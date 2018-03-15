/*
* -- Edit recipe application component --
*  Enables a user to edit a recipe
*/

import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { recipeAPIURL } from '../../config';
import privateAxiosInstance from '../../config';
import Header from '../common/Header';
import FooterFlex from '../common/FooterFlex';
import axios from 'axios'
import Time from 'react-time-format'
import { ToastContainer, toast } from 'react-toastify';

// Application styling
import '../../static/App.css';

class EditRecipe extends Component {
    // App component properties
    constructor(props) {
        super(props);
        this.state = {
            isEdited: false,
            recipeName: '',
            ingredients: '',
            directions: '',
        };
    }

    // Get recipe details
    componentWillMount() {
        privateAxiosInstance.get(`${ recipeAPIURL }${ this.props.match.params.category_id }/${ this.props.match.params.recipe_id }`)
        .then((response) => {
            if (response.status === 200) {
                this.setState({
                    recipeName: response.data['recipe_name'],
                    ingredients: response.data['ingredients'],
                    directions: response.data['directions'],
                });
            }
        })
        .catch((error) => {
            document.getElementById("error").innerHTML = error.response.data['message'];
        });
    }

    // Reset state
    resetState = () => {
        this.setState({
            recipeName: '',
            ingredients: '',
            directions: '',
        });
    };

    // When input changes
    onInputChanged = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    // Handle edit recipe
    editRecipeHandler = (event) => {
        event.preventDefault();
        privateAxiosInstance.put(`${ recipeAPIURL }${ this.props.match.params.category_id }/${ this.props.match.params.recipe_id }`,
        {
            recipe_name: this.state.recipeName,
            ingredients: this.state.ingredients,
            directions: this.state.directions,
        })
        .then((response) => {
            this.resetState()
            this.setState({
                isEdited: true,
            })
        })
        .catch((error) => {
            if (error.response.status === 400) {
                let messages = error.response.data;
                if (messages['recipe_name_message'] !== 'Valid') {
                    document.getElementById("recipeNameError").innerHTML = messages['recipe_name_message'];
                } else {
                    document.getElementById("recipeNameError").innerHTML = "";
                }
                if (messages['ingredients_message'] !== 'Valid') {
                    document.getElementById("ingredientsError").innerHTML = messages['ingredients_message'];
                } else {
                    document.getElementById("ingredientsError").innerHTML = "";
                }
                if (messages['directions_message'] !== 'Valid') {
                    document.getElementById("directionsError").innerHTML = messages['directions_message'];
                } else {
                    document.getElementById("directionsError").innerHTML = "";
                }
                document.getElementById("error").innerHTML = "";
            } else {
                document.getElementById("error").innerHTML = error.response.data['message'];
                document.getElementById("recipeNameError").innerHTML = "";
                document.getElementById("ingredientsError").innerHTML = "";
                document.getElementById("directionsError").innerHTML = "";
            }  
        });
    };

    // Component rendering
    render() {
        if (this.state.isEdited) {
            return <Redirect to={ '/recipes/'+this.props.match.params.category_id }/>
        }
        return (
            <div className="App-light">
                <Header/>
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12">
                            <h1 className="App-page-title">Edit Recipe</h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-12 col-md-8 col-lg-6 col-md-offset-2 col-lg-offset-3">
                            <form onSubmit={ this.editRecipeHandler }>
                                <p id="error" className="error"></p>
                                <div className="form-group">
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="recipeName"
                                        value={ this.state.recipeName }
                                        onChange={ this.onInputChanged }
                                        maxLength="100"
                                        placeholder="Recipe name"/>
                                    <p id="recipeNameError" className="text-left error"></p>
                                </div>
                                <div className="form-group">
                                    <textarea
                                        className="form-control"
                                        type="text"
                                        name="ingredients"
                                        value={ this.state.ingredients }
                                        onChange={ this.onInputChanged }
                                        rows="5"
                                        maxLength="800"
                                        placeholder="Ingredients"/>
                                    <p id="ingredientsError" className="text-left error"></p>
                                </div>
                                <div className="form-group">
                                    <textarea
                                        className="form-control"
                                        type="text"
                                        name="directions"
                                        value={ this.state.directions }
                                        onChange={ this.onInputChanged }
                                        maxLength="2000"
                                        rows="8"
                                        placeholder="Directions"/>
                                    <p id="directionsError" className="text-left error"></p>
                                </div>
                                <div className="form-group">
                                    <button type="submit" className="btn btn-primary btn-block App-btn-add">EDIT</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <FooterFlex/>
            </div>
        );
    }
}

export default EditRecipe;
