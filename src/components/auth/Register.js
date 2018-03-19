/*
* -- Register application component --
*  Enables a new user to create an account
*/

import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { authAPIURL } from '../../config';
import FooterStatic from '../common/FooterStatic';
import axios from 'axios'

// Application styling
import '../../static/App.css';

class Register extends Component {
    // App component properties
    constructor(props) {
        super(props);
        this.state = {
            isRegistered: false,
            username: '',
            usernameError: '',
            email: '',
            error: '',
        };
    }

    // When input changes
    onInputChanged = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    // Handle user registration
    onRegisterClick = (event) => {
        event.preventDefault();
        axios.post(`${ authAPIURL }register`,
            {
                username: this.state.username,
                email: this.state.email,
                password: this.state.password,
                confirm_password: this.state.confirmPassword
        })
        .then((response) => {
            if (response.status === 201) {
                this.setState({
                    isRegistered: true,
                })
            }
        })
        .catch((error) => {
            this.setState({error: error.response.data});
        });
    };

    // Component rendering
    render() {
        if (this.state.isRegistered) {
            return <Redirect to="/login"/>
        }
        return (
            <div className="App-light">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-xs-12 col-sm-10 col-md-8 col-lg-6 col-sm-offset-1 col-md-offset-2 col-lg-offset-3">
                            <div className="App-header">
                                <h1 className="App-title-form">
                                    <span className="glyphicon glyphicon-fire"></span> Yummy Recipes
                                </h1>
                            </div>
                            <div className="panel panel-primary">
                                <div className="panel-heading text-center">
                                    Create Account
                                </div>
                                <div className="panel-body">
                                    <form onSubmit={ this.onRegisterClick }>
                                        { this.state.error['message'] !== 'Valid' ? (
                                        <p className="error">{ this.state.error['message'] }</p>
                                        ): (<p/>)}
                                        <div className="form-group">
                                            <input
                                                className="form-control"
                                                type="text"
                                                name="username"
                                                value={ this.state.username }
                                                onChange={ this.onInputChanged }
                                                maxLength="80"
                                                placeholder="Username"/>
                                                { this.state.error['username_message'] !== 'Valid' ? (
                                                <p className="text-left error">{ this.state.error['username_message'] }</p>
                                                ): (<p/>)}
                                        </div>
                                        <div className="form-group">
                                            <input
                                                className="form-control"
                                                type="text"
                                                name="email"
                                                value={ this.state.email }
                                                onChange={ this.onInputChanged }
                                                maxLength="100"
                                                placeholder="Email address"/>
                                                { this.state.error['email_message'] !== 'Valid' ? (
                                                <p className="text-left error">{ this.state.error['email_message'] }</p>
                                                ): (<p/>)}
                                        </div>
                                        <div className="form-group">
                                            <input
                                                className="form-control"
                                                type="password"
                                                name="password"
                                                value={ this.state.password }
                                                onChange={ this.onInputChanged }
                                                maxLength="100"
                                                placeholder="Password"/>
                                                { this.state.error['password_message'] !== 'Valid' ? (
                                                <p className="text-left error">{ this.state.error['password_message'] }</p>
                                                ): (<p/>)}
                                        </div>
                                        <div className="form-group">
                                            <input
                                                className="form-control"
                                                type="password"
                                                name="confirmPassword"
                                                value={ this.state.confirmPassword }
                                                onChange={ this.onInputChanged }
                                                maxLength="100"
                                                placeholder="Confirm password"/>
                                                { this.state.error['confirm_password_message'] !== 'Valid' ? (
                                                <p className="text-left error">{ this.state.error['confirm_password_message'] }</p>
                                                ): (<p/>)}
                                        </div>
                                        <div className="form-group">
                                            <button type="submit" className="btn btn-primary btn-block">Register</button>
                                        </div>
                                        <p className="form-group text-center">
                                            Already have an account? <a href="/login">Login</a>
                                        </p>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <FooterStatic/>
                </div>
            </div>
        );
    }
}

export default Register;
