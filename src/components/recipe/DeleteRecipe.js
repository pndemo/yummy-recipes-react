/*
* -- Delete recipe application component --
*  Enables a user to delete a recipe
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

class DeleteRecipe extends Component {
    // App component properties
    constructor(props) {
        super(props);
        this.state = {
            isDeleted: false,
            recipeName: '',
        };
    }

    // Get recipe details
    componentWillMount() {
        privateAxiosInstance.get(`${ recipeAPIURL }${ this.props.match.params.category_id }/${ this.props.match.params.recipe_id }`)
        .then((response) => {
            if (response.status === 200) {
                this.setState({
                    recipeName: response.data['recipe_name'],
                });
            }
        })
        .catch((error) => {
            if (error.response){
                document.getElementById("error").innerHTML = error.response.data['message'];
            }
        });
    }

    // Handle delete recipe
    deleteRecipeHandler = (event) => {
        event.preventDefault();
        privateAxiosInstance.delete(`${ recipeAPIURL }${ this.props.match.params.category_id }/${ this.props.match.params.recipe_id }`,
        {
            recipe_name: this.state.recipeName,
        })
        .then((response) => {
            this.setState({
                isDeleted: true,
            })
            toast.success('Recipe has been deleted.')
        })
        .catch((error) => {
            if (error.response){
                document.getElementById("error").innerHTML = error.response.data['message'];
            }
        });
    };

    // Component rendering
    render() {
        if (this.state.isDeleted) {
            return <Redirect to={ '/recipes/'+this.props.match.params.category_id }/>
        }
        return (
            <div className="App-light">
                <Header/>
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12">
                            <h1 className="App-page-title">Delete Recipe</h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-12 col-md-8 col-lg-6 col-md-offset-2 col-lg-offset-3">
                            <p>Do you want to delete recipe
                                <strong> { this.state.recipeName }</strong>?
                            </p>
                            <form onSubmit={ this.deleteRecipeHandler }>
                                <p id="error" className="error"></p>
                                <div className="form-group">
                                    <button type="submit" className="btn btn-primary btn-block App-btn-add">Delete</button>
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

export default DeleteRecipe;
