/*
* -- Private route container --
*  Allow display of private routes for authenticated user
*  Redirect to login page if user not unauthenticated
*/

import { Redirect, Route } from 'react-router';
import React from 'react';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
        window.localStorage.getItem('token') ? (<Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/login' }} />
            )
    )}
  />
);

export default PrivateRoute;
