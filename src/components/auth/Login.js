/*
* -- Login application component --
*  Enables a register user to login
*/

import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { authAPIURL } from '../../config';
import FooterStatic from '../common/FooterStatic';
import axios from 'axios'

// Application styling
import '../../static/App.css';

class Login extends Component {
    // App component properties
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: localStorage.getItem('token'),
            username: '',
            password: '',
            usernameError: '',
            passwordError: '',
            error: '',
        };
    }

    // Reset error state
    resetErrorState = () => {
        this.setState({
            usernameError: '',
            passwordError: '',
            error: '',
        });
    };

    // When input changes
    onInputChanged = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    // Handle user login
    onLoginClick = (event) => {
        event.preventDefault();
        axios.post(`${ authAPIURL }login`,
            {
                username: this.state.username,
                password: this.state.password,
        })
        .then((response) => {
            if (response.status === 200) {
                localStorage.setItem('token', response.data['access_token']);
                this.setState({
                    isLogged: true,
                })
            }
        })
        .catch((error) => {
            this.resetErrorState();
            if (error.response.status === 400) {
                if (error.response.data['username_message'] !== 'Valid') {
                    this.setState({usernameError: error.response.data['username_message']});
                }
                if (error.response.data['password_message'] !== 'Valid') {
                    this.setState({passwordError: error.response.data['password_message']});
                }
            } else if (error.response.status === 401 || error.response.status === 500) {
                this.setState({error: error.response.data['message']});
            }
        });
    };

    // Component rendering
    render() {
        if (this.state.isLogged) {
            return <Redirect to="/"/>
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
                                    Login
                                </div>
                                <div className="panel-body">
                                    <form onSubmit={ this.onLoginClick }>
                                        <p className="error">{ this.state.error }</p>
                                        <div className="form-group">
                                            <input
                                                className="form-control"
                                                type="text"
                                                name="username"
                                                value={ this.state.username }
                                                onChange={ this.onInputChanged }
                                                maxLength="50"
                                                placeholder="Username"/>
                                                <p className="text-left error">{ this.state.usernameError }</p>
                                        </div>
                                        <div className="form-group">
                                            <input
                                                className="form-control"
                                                type="password"
                                                name="password"
                                                value={ this.state.password }
                                                onChange={ this.onInputChanged }
                                                maxLength="50"
                                                placeholder="Password"/>
                                                <p className="text-left error">{ this.state.passwordError }</p>
                                        </div>
                                        <div className="form-group">
                                            <button type="submit" className="btn btn-primary btn-block">Login</button>
                                        </div>
                                        <p className="form-group text-center">
                                            Don't have an account? <a href="/register">Register</a>
                                        </p>
                                        <p className="form-group text-center">
                                            Forgot password? <a href="/reset_password">Reset</a>
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

export default Login;
