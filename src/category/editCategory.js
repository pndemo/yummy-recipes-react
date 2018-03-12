import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import { categoryAPIURL } from '../config';
import Header from '../components/header';
import Footer from '../components/footer';
import axios from 'axios'

import '../App.css';

class EditCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEdited: false,
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

    resetState = () => {
        this.setState({
            categoryName: '',
        });
    };

    onInputChanged = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    editCategoryHandler = (event) => {
        event.preventDefault();

        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
        axios.put(`${ categoryAPIURL }${ this.props.match.params.category_id }`,
        {
            category_name: this.state.categoryName,
        })
        .then((response) => {
            this.resetState()
            this.setState({
                isEdited: true,
            })
        })
        .catch((error) => {
            if (error.response.status === 400) {
                document.getElementById("error").innerHTML = error.response.data['category_name_message'];
            } else {
                document.getElementById("error").innerHTML = ""
            }
        });
    };

    render() {
        if (this.state.isEdited) {
            return <Redirect to="/"/>
        }
        return (
            <div className="App-light">
                <Header/>
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12">
                            <h1 className="App-page-title">Edit Category</h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-12 col-md-8 col-lg-6 col-md-offset-2 col-lg-offset-3">
                            <form onSubmit={ this.editCategoryHandler }>
                                <p id="error" className="error"></p>
                                <div className="form-group">
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="categoryName"
                                        value={ this.state.categoryName }
                                        onChange={ this.onInputChanged }
                                        maxLength="50"
                                        placeholder="Category name"/>
                                </div>
                                <div className="form-group">
                                    <button type="submit" className="btn btn-primary btn-block App-btn-add">Add</button>
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

export default EditCategory;
