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
            newPasswordError: '',
            confirmNewPasswordError: '',
            error: '',
        };
    }

    // Reset error state
    resetErrorState = () => {
        this.setState({
            newPasswordError: '',
            confirmNewPasswordError: '',
            error: '',
        });
    };

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
            }
        })
        .catch((error) => {
            if (error.response) {
                this.resetErrorState();
                if (error.response.status === 400) {
                    if (error.response.data['new_password_message'] !== 'Valid') {
                        this.setState({newPasswordError: error.response.data['new_password_message']});
                    }
                    if (error.response.data['confirm_new_password_message'] !== 'Valid') {
                        this.setState({confirmNewPasswordError: error.response.data['confirm_new_password_message']});
                    }
                } else if (error.response.status === 500){
                    this.setState({error: error.response.data['message']});
                } else if (error.response.status === 401) {
                    return window.location.href = '/login';
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
                                <p className="error">{ this.state.error }</p>
                                <div className="form-group">
                                    <input
                                        className="form-control"
                                        type="password"
                                        name="newPassword"
                                        value={ this.state.newPassword }
                                        onChange={ this.onInputChanged }
                                        maxLength="100"
                                        placeholder="New password"/>
                                        <p className="text-left error">{ this.state.newPasswordError }</p>
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
                                        <p className="text-left error">{ this.state.confirmNewPasswordError }</p>
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
