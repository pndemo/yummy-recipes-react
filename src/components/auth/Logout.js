/*
* -- Logout application component --
*  Enables a user to logout
*/

import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Logout extends Component {
  constructor(props) {
    super(props);
    localStorage.removeItem('token');
  }

  // Redirects user to login page after logout
  render() {
    return <Redirect to="/" />;
  }
}

export default Logout;
