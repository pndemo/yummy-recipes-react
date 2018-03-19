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
            emailError: '',
            password: '',
            passwordError: '',
            confirmPassword: '',
            confirmPasswordError: '',
            error: '',
        };
    }

    // Reset error state
    resetErrorState = () => {
        this.setState({
            usernameError: '',
            emailError: '',
            passwordError: '',
            confirmPasswordError: '',
            error: '',
        });
    };

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
            if (error.response) {
                this.resetErrorState();
                if (error.response.status === 400) {
                    if (error.response.data['username_message'] !== 'Valid') {
                        this.setState({usernameError: error.response.data['username_message']});
                    }
                    if (error.response.data['email_message'] !== 'Valid') {
                        this.setState({emailError: error.response.data['email_message']});
                    }
                    if (error.response.data['password_message'] !== 'Valid') {
                        this.setState({passwordError: error.response.data['password_message']});
                    }
                    if (error.response.data['confirm_password_message'] !== 'Valid') {
                        this.setState({confirmPasswordError: error.response.data['confirm_password_message']});
                    }
                } else if (error.response.status === 500) {
                    this.setState({error: error.response.data['message']});
                }
            } 
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
                                        <p className="error">{ this.state.error }</p>
                                        <div className="form-group">
                                            <input
                                                className="form-control"
                                                type="text"
                                                name="username"
                                                value={ this.state.username }
                                                onChange={ this.onInputChanged }
                                                maxLength="80"
                                                placeholder="Username"/>
                                                <p className="text-left error">{ this.state.usernameError }</p>
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
                                                <p className="text-left error">{ this.state.emailError }</p>
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
                                                <p className="text-left error">{ this.state.passwordError }</p>
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
                                                <p className="text-left error">{ this.state.confirmPasswordError }</p>
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
