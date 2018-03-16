/*
* -- Reset application component --
*  Enables a registered user to request password reset
*/

import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { authAPIURL } from '../../config';
import FooterStatic from '../common/FooterStatic';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';

// Application styling
import '../../static/App.css';

class ResetPassword extends Component {
    // App component properties
    constructor(props) {
        super(props);
        this.state = {
            isReset: false,
            email: '',
        };
    }

    // When input changes
    onInputChanged = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    // Handle password reset
    onResetClick = (event) => {
        event.preventDefault();
        axios.post(`${ authAPIURL }reset_password`,
            {
                email: this.state.email,
        })
        .then((response) => {
            if (response.status === 200) {
                this.setState({
                    isReset: true,
                })
                toast.success('Your password has been reset.')
            }
        })
        .catch((error) => {
            if (error.response.status === 400) {
                document.getElementById("error").innerHTML = error.response.data['email_message'];
            } else {
                document.getElementById("error").innerHTML = error.response.data['message'];
            }
        });
    };

    // Component rendering
    render() {
        if (this.state.isReset) {
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
                                    Reset Password
                                </div>
                                <div className="panel-body">
                                    <form onSubmit={ this.onResetClick }>
                                        <p id="error" className="error"></p>
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
                                            <button type="submit" className="btn btn-primary btn-block">Submit</button>
                                        </div>
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

export default ResetPassword;
