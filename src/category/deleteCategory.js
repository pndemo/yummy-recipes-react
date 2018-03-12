import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import { categoryAPIURL } from '../config';
import Header from '../components/header';
import Footer from '../components/footer';
import axios from 'axios'

import '../App.css';

class DeleteCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDeleted: false,
            categoryName: '',
        };
    }

    componentWillMount() {
        axios.get(`${ categoryAPIURL }${ this.props.match.params.category_id }`, { 'headers': { 'Authorization': 'Bearer ' + localStorage.getItem('token') }})
        .then((response) => {
          if (response.status === 200) {
            this.setState({
                categoryName: response.data['category_name'],
            });
          }
        })
        .catch((error) => {
          let message = error.response.data['message'];
        });
      }

    deleteCategoryHandler = (event) => {
        event.preventDefault();

        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
        axios.delete(`${ categoryAPIURL }${ this.props.match.params.category_id }`,
        {
            category_name: this.state.categoryName,
        })
        .then((response) => {
            this.setState({
                isDeleted: true,
            })
        })
        .catch((error) => {

        });
    };

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
                <Footer/>
            </div>
        );
    }
}

export default DeleteCategory;
