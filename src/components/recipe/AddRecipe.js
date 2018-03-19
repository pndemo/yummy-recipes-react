/*
* -- Add recipe application component --
*  Enables a user to add a recipe
*/

import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { recipeAPIURL } from '../../config';
import privateAxiosInstance from '../../config';
import Header from '../common/Header';
import FooterFlex from '../common/FooterFlex';

// Application styling
import '../../static/App.css';

class AddRecipe extends Component {
    // App component properties
    constructor(props) {
        super(props);
        this.state = {
            isAdded: false,
            recipeName: '',
            ingredients: '',
            directions: '',
            recipeNameError: '',
            ingredientsError: '',
            directionsError: '',
            error: '',
        };
    }

    // Reset state
    resetState = () => {
        this.setState({
            recipeName: '',
            ingredients: '',
            directions: '',
        });
    };

    // Reset error state
    resetErrorState = () => {
        this.setState({
            recipeNameError: '',
            ingredientsError: '',
            directionsError: '',
            error: '',
        });
    };

    // When input changes
    onInputChanged = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    // Handle add recipe
    addRecipeHandler = (event) => {
        event.preventDefault();
        privateAxiosInstance.post(`${ recipeAPIURL }${ this.props.match.params.category_id }/`,
            {
                recipe_name: this.state.recipeName,
                ingredients: this.state.ingredients,
                directions: this.state.directions,
        })
        .then((response) => {
            this.resetState();
            if (response.status === 201) {
                this.setState({
                    isAdded: true,
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
        if (this.state.isAdded) {
            return <Redirect to={ '/recipes/'+this.props.match.params.category_id }/>
        }
        return (
            <div className="App-light">
                <Header/>
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12">
                            <h1 className="App-page-title">Add Recipe</h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-12 col-md-8 col-lg-6 col-md-offset-2 col-lg-offset-3">
                            <form onSubmit={ this.addRecipeHandler }>
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
                                        rows="8"
                                        maxLength="2000"
                                        placeholder="Directions"/>
                                    <p className="text-left error">{ this.state.directionsError }</p>
                                </div>
                                <div className="form-group">
                                    <button type="submit" className="btn btn-primary btn-block App-btn-add">ADD</button>
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

export default AddRecipe;
