import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { authAPIURL } from '../config';
import axios from 'axios'

import Footer from '../components/footer';

import '../App.css';

class Register extends Component {
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

    onInputChanged = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };

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
                } 
            });
    };

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
                    <Footer/>
                </div>
            </div>
        );
    }
}

export default Register;
