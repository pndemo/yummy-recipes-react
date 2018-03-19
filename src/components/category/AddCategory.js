/*
* -- Add category application component --
*  Enables a user to add a category
*/

import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { categoryAPIURL } from '../../config';
import privateAxiosInstance from '../../config';
import Header from '../common/Header';
import FooterFlex from '../common/FooterFlex';

// Application styling
import '../../static/App.css';

class AddCategory extends Component {
    // App component properties
    constructor(props) {
        super(props);
        this.state = {
            isAdded: false,
            categoryName: '',
            error: '',
        };
    }

    // Reset state
    resetState = () => {
        this.setState({
            categoryName: '',
        });
    };

    // When input changes
    onInputChanged = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    // Handle add category
    addCategoryHandler = (event) => {
        event.preventDefault();
        privateAxiosInstance.post(`${ categoryAPIURL }`,
            {
                category_name: this.state.categoryName,
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
            return <Redirect to="/"/>
        }
        return (
            <div className="App-light">
                <Header/>
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12">
                            <h1 className="App-page-title">Add Category</h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-12 col-md-8 col-lg-6 col-md-offset-2 col-lg-offset-3">
                            <form onSubmit={ this.addCategoryHandler }>
                                { this.state.error['message'] !== 'Valid' ? (
                                <p className="error">{ this.state.error['message'] }</p>
                                ): (<p/>)}
                                <div className="form-group">
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="categoryName"
                                        value={ this.state.categoryName }
                                        onChange={ this.onInputChanged }
                                        maxLength="50"
                                        placeholder="Category name"/>
                                        { this.state.error['category_name_message'] !== 'Valid' ? (
                                        <p className="error">{ this.state.error['category_name_message'] }</p>
                                        ): (<p/>)}
                                </div>
                                <div className="form-group">
                                    <button type="submit" id="addCategory" className="btn btn-primary btn-block App-btn-add">ADD</button>
                                    <a className="btn btn-primary btn-block App-btn-cancel" href="/" role="button">CANCEL</a>
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

export default AddCategory;
