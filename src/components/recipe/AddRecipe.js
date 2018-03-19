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
                if (error.response.status === 400 || error.response.status === 500) {
                    this.setState({error: error.response.data});
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
                                { this.state.error['message'] !== 'Valid' ? (
                                <p className="error">{ this.state.error['message'] }</p>
                                ): (<p/>)}
                                <div className="form-group">
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="recipeName"
                                        value={ this.state.recipeName }
                                        onChange={ this.onInputChanged }
                                        maxLength="100"
                                        placeholder="Recipe name"/>
                                    { this.state.error['recipe_name_message'] !== 'Valid' ? (
                                    <p className="text-left error">{ this.state.error['recipe_name_message'] }</p>
                                    ): (<p/>)}
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
                                    { this.state.error['ingredients_message'] !== 'Valid' ? (
                                    <p className="text-left error">{ this.state.error['ingredients_message'] }</p>
                                    ): (<p/>)}
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
                                    { this.state.error['directions_message'] !== 'Valid' ? (
                                    <p className="text-left error">{ this.state.error['directions_message'] }</p>
                                    ): (<p/>)}
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
