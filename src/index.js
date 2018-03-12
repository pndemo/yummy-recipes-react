import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import Register from './auth/register';
import Login from './auth/login';
import Logout from './auth/logout';
import AddCategory from './category/addCategory';
import EditCategory from './category/editCategory';
import DeleteCategory from './category/deleteCategory';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <BrowserRouter>
    <div>
      <Route exact path="/" component={ App } />
      <Route path="/register" component={ Register } />
      <Route path="/login" component={ Login } />
      <Route path="/category/add" component={ AddCategory } />
      <Route path="/category/edit/:category_id" component={ EditCategory } />
      <Route path="/category/delete/:category_id" component={ DeleteCategory } />
      <Route path="/logout" component={ Logout } />
    </div>
  </BrowserRouter>, document.getElementById('root'));

registerServiceWorker();
