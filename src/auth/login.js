import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { authAPIURL } from '../config';
import axios from 'axios'

import '../App.css';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogged: localStorage.getItem('token'),
            username: '',
            password: '',
        };
    }

    onInputChanged = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };

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
                if (error.response.status === 400) {
                    let messages = error.response.data;
                    if (messages['username_message'] !== 'Valid') {
                        document.getElementById("usernameError").innerHTML = messages['username_message'];
                    } else {
                        document.getElementById("usernameError").innerHTML = "";
                    }
                    if (messages['password_message'] !== 'Valid') {
                        document.getElementById("passwordError").innerHTML = messages['password_message'];
                    } else {
                        document.getElementById("passwordError").innerHTML = "";
                    }
                    document.getElementById("error").reset;
                } else if (error.response.status === 401) {
                    document.getElementById("error").innerHTML = error.response.data['message'];
                    document.getElementById("usernameError").innerHTML = "";
                    document.getElementById("passwordError").innerHTML = "";
                }
            });
    };

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
                                        <p id="error" className="error"></p>
                                        <div className="form-group">
                                            <input
                                                className="form-control"
                                                type="text"
                                                name="username"
                                                value={ this.state.username }
                                                onChange={ this.onInputChanged }
                                                maxLength="50"
                                                placeholder="Username"/>
                                                <p id="usernameError" className="text-left error"></p>
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
                                                <p id="passwordError" className="text-left error"></p>
                                        </div>
                                        <div className="form-group">
                                            <button type="submit" className="btn btn-primary btn-block">Login</button>
                                        </div>
                                        <p className="form-group text-center">
                                            Don't have an account?<a href="/register">Register</a>
                                        </p>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <footer className="App-footer">
                        <p className="App-copyright">&copy; 2018 Yummy Recipes LLC</p>
                    </footer>
                </div>
            </div>
        );
    }
}

export default Login;
