/*
* -- Change Password application component --
*  Enables a new user to create an account
*/

import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { authAPIURL } from '../../config';
import privateAxiosInstance from '../../config';
import Header from '../common/Header';
import FooterFlex from '../common/FooterFlex';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';

// Application styling
import '../../static/App.css';

class ChangePassword extends Component {
    // App component properties
    constructor(props) {
        super(props);
        this.state = {
            isChanged: false,
            newPassword: '',
            confirmNewPassword: '',
        };
    }

    // When input changes
    onInputChanged = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    // Handle password change
    onPasswordChange = (event) => {
        event.preventDefault();
        privateAxiosInstance.post(`${ authAPIURL }change_password`,
            {
                new_password: this.state.newPassword,
                confirm_new_password: this.state.confirmNewPassword
        })
        .then((response) => {
            if (response.status === 200) {
                this.setState({
                    isChanged: true,
                })
                toast.success('Your password has been changed.')
            }
        })
        .catch((error) => {
            if (error.response) {
                if (error.response.status === 400) {
                    let messages = error.response.data;
                    if (messages['new_password_message'] !== 'Valid') {
                        document.getElementById("newPasswordError").innerHTML = messages['new_password_message'];
                    } else {
                        document.getElementById("newPasswordError").innerHTML = "";
                    }
                    if (messages['confirm_new_password_message'] !== 'Valid') {
                        document.getElementById("confirmNewPasswordError").innerHTML = messages['confirm_new_password_message'];
                    } else {
                        document.getElementById("confirmNewPasswordError").innerHTML = "";
                    }
                    document.getElementById("error").innerHTML = "";
                } else {
                    document.getElementById("error").innerHTML = error.response.data['message'];
                    document.getElementById("newPasswordError").innerHTML = "";
                    document.getElementById("confirmNewPasswordError").innerHTML = "";
                }
            } 
        });
    };

    // Component rendering
    render() {
        if (this.state.isChanged) {
            return <Redirect to="/"/>
        }
        return (
            <div className="App-light">
                <Header/>
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12">
                            <h1 className="App-page-title">Change Password</h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-12 col-md-8 col-lg-6 col-md-offset-2 col-lg-offset-3">
                            <form onSubmit={ this.onPasswordChange }>
                                <p id="error" className="error"></p>
                                <div className="form-group">
                                    <input
                                        className="form-control"
                                        type="password"
                                        name="newPassword"
                                        value={ this.state.newPassword }
                                        onChange={ this.onInputChanged }
                                        maxLength="100"
                                        placeholder="New password"/>
                                        <p id="newPasswordError" className="text-left error"></p>
                                </div>
                                <div className="form-group">
                                    <input
                                        className="form-control"
                                        type="password"
                                        name="confirmNewPassword"
                                        value={ this.state.confirmNewPassword }
                                        onChange={ this.onInputChanged }
                                        maxLength="100"
                                        placeholder="Confirm new password"/>
                                        <p id="confirmNewPasswordError" className="text-left error"></p>
                                </div>
                                <div className="form-group">
                                    <button type="submit" className="btn btn-primary btn-block App-btn-add">SUBMIT</button>
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

export default ChangePassword;
