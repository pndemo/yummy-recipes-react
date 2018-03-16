/*
* -- Delete categories application component --
*  Enables a user to delete a category
*/

import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { categoryAPIURL } from '../../config';
import privateAxiosInstance from '../../config';
import Header from '../common/Header';
import FooterFlex from '../common/FooterFlex';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';

// Application styling
import '../../static/App.css';

class DeleteCategory extends Component {
    // App component properties
    constructor(props) {
        super(props);
        this.state = {
            isDeleted: false,
            categoryName: '',
        };
    }

    // Get category details
    componentWillMount() {
        privateAxiosInstance.get(`${ categoryAPIURL }${ this.props.match.params.category_id }`)
        .then((response) => {
        if (response.status === 200) {
            this.setState({
                categoryName: response.data['category_name'],
            });
        }
        })
        .catch((error) => {
            if (error.response){
                document.getElementById("error").innerHTML = error.response.data['message'];
            }
        });  
    }

    // Handle delete category
    deleteCategoryHandler = (event) => {
        event.preventDefault();
        privateAxiosInstance.delete(`${ categoryAPIURL }${ this.props.match.params.category_id }`)
        .then((response) => {
            this.setState({
                isDeleted: true,
            })
            toast.success('Category has been deleted.')
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
            return <Redirect to="/"/>
        }
        return (
            <div className="App-light">
                <Header/>
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12">
                            <h1 className="App-page-title">Delete Category</h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-12 col-md-8 col-lg-6 col-md-offset-2 col-lg-offset-3">
                            <p>Do you want to delete category
                                <strong> { this.state.categoryName }</strong>?
                            </p>
                            <form onSubmit={ this.deleteCategoryHandler }>
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

export default DeleteCategory;
