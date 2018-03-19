import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import PrivateRoute from './containers/PrivateRoute';
import './static/index.css';
import App from './App';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Logout from './components/auth/Logout';
import ResetPassword from './components/auth/ResetPassword';
import ChangePassword from './components/auth/ChangePassword';
import AddCategory from './components/category/AddCategory';
import EditCategory from './components/category/EditCategory';
import DeleteCategory from './components/category/DeleteCategory';
import Recipe from './components/recipe/Recipes';
import AddRecipe from './components/recipe/AddRecipe';
import EditRecipe from './components/recipe/EditRecipe';
import DeleteRecipe from './components/recipe/DeleteRecipe';

ReactDOM.render(<BrowserRouter>
  <div>
    <Route exact path="/" component={App} />
    <Route path="/register" component={Register} />
    <Route path="/login" component={Login} />
    <Route path="/reset_password" component={ResetPassword} />
    <PrivateRoute path="/change_password" component={ChangePassword} />
    <PrivateRoute path="/category/add" component={AddCategory} />
    <PrivateRoute path="/category/edit/:category_id" component={EditCategory} />
    <PrivateRoute path="/category/delete/:category_id" component={DeleteCategory} />
    <PrivateRoute path="/recipe/:category_id/add" component={AddRecipe} />
    <PrivateRoute path="/recipe/:category_id/edit/:recipe_id" component={EditRecipe} />
    <PrivateRoute path="/recipe/:category_id/delete/:recipe_id" component={DeleteRecipe} />
    <PrivateRoute path="/recipes/:category_id" component={Recipe} />
    <PrivateRoute path="/logout" component={Logout} />
  </div>
</BrowserRouter>, document.getElementById('root'));
