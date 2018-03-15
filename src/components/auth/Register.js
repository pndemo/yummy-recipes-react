/*
* -- Register application component --
*  Enables a new user to create an account
*/

import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { authAPIURL } from '../../config';
import FooterStatic from '../common/FooterStatic';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';

// Application styling
import '../../static/App.css';

class Register extends Component {
    // App component properties
    constructor(props) {
        super(props);
        this.state = {
            isRegistered: false,
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
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
                toast.success('Your account has been created.')
            }
        })
        .catch((error) => {
            if (error.response) {
                if (error.response.status === 400) {
                    let messages = error.response.data;
                    if (messages['username_message'] !== 'Valid') {
                        document.getElementById("usernameError").innerHTML = messages['username_message'];
                    } else {
                        document.getElementById("usernameError").innerHTML = "";
                    }
                    if (messages['email_message'] !== 'Valid') {
                        document.getElementById("emailError").innerHTML = messages['email_message'];
                    } else {
                        document.getElementById("emailError").innerHTML = "";
                    }
                    if (messages['password_message'] !== 'Valid') {
                        document.getElementById("passwordError").innerHTML = messages['password_message'];
                    } else {
                        document.getElementById("passwordError").innerHTML = "";
                    }
                    if (messages['confirm_password_message'] !== 'Valid') {
                        document.getElementById("confirmPasswordError").innerHTML = messages['confirm_password_message'];
                    } else {
                        document.getElementById("confirmPasswordError").innerHTML = "";
                    }
                    document.getElementById("error").innerHTML = "";
                } else {
                    document.getElementById("error").innerHTML = error.response.data['message'];
                    document.getElementById("usernameError").innerHTML = "";
                    document.getElementById("emailError").innerHTML = "";
                    document.getElementById("passwordError").innerHTML = "";
                    document.getElementById("confirmPasswordError").innerHTML = "";
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
                                        <p id="error" className="error"></p>
                                        <div className="form-group">
                                            <input
                                                className="form-control"
                                                type="text"
                                                name="username"
                                                value={ this.state.username }
                                                onChange={ this.onInputChanged }
                                                maxLength="80"
                                                placeholder="Username"/>
                                                <p id="usernameError" className="text-left error"></p>
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
                                                <p id="emailError" className="text-left error"></p>
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
                                                <p id="passwordError" className="text-left error"></p>
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
                                                <p id="confirmPasswordError" className="text-left error"></p>
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
