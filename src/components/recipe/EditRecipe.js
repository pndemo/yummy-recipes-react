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
            recipeNameError: '',
            ingredientsError: '',
            directionsError: '',
            error: '',
        };
    }

    // Reset error state
    resetErrorState = () => {
        this.setState({
            recipeNameError: '',
            ingredientsError: '',
            directionsError: '',
            error: '',
        });
    };

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
            if (error.response) {
                this.resetErrorState();
                if (error.response.status === 404 || error.response.status === 500) {
                    this.setState({error: error.response.data['message']});
                } else if (error.response.status === 401) {
                    return window.location.href = '/login';
                }
            }   
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
            if (response.status === 200) {
                this.setState({
                    isEdited: true,
                })
            }
        })
        .catch((error) => {
            if (error.response) {
                this.resetErrorState();
                if (error.response.status === 400) {
                    if (error.response.data['recipe_name_message'] !== 'Valid') {
                        this.setState({recipeNameError: error.response.data['recipe_name_message']});
                    }
                    if (error.response.data['ingredients_message'] !== 'Valid') {
                        this.setState({ingredientsError: error.response.data['ingredients_message']});
                    }
                    if (error.response.data['directions_message'] !== 'Valid') {
                        this.setState({directionsError: error.response.data['directions_message']});
                    }
                } else if (error.response.status === 404 || error.response.status === 500) {
                    this.setState({error: error.response.data['message']});
                } else if (error.response.status === 401) {
                    return window.location.href = '/login';
                }
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
                                <p className="error">{ this.state.error }</p>
                                <div className="form-group">
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="recipeName"
                                        value={ this.state.recipeName }
                                        onChange={ this.onInputChanged }
                                        maxLength="100"
                                        placeholder="Recipe name"/>
                                    <p className="text-left error">{ this.state.recipeNameError }</p>
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
                                    <p className="text-left error">{ this.state.ingredientsError }</p>
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
                                    <p className="text-left error">{ this.state.directionsError }</p>
                                </div>
                                <div className="form-group">
                                    <button type="submit" className="btn btn-primary btn-block App-btn-add">EDIT</button>
                                    <a className="btn btn-primary btn-block App-btn-cancel" href={ '/recipes/'+this.props.match.params.category_id } role="button">CANCEL</a>
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
