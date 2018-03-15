import React from 'react';
import { mount, configure } from 'enzyme';
import { StaticRouter } from 'react-router';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import Login from '../../components/auth/Login';
import { authAPIURL } from '../../config';

const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');

// Set the mock adapter on default instance
const mock = new MockAdapter(axios);

// Mock login POST request to /login
mock.onPost(`${authAPIURL}login`).reply(201, { message: 'You are now logged in.' });

// Local storage
global.localStorage = {
  getItem: () => {},
  setItem: () => {},
};

// Component Login
describe('Component: Login', () => {
  configure({ adapter: new Adapter() });
  const routerComponent = mount(
  <StaticRouter location="login" context={{}}>
    <Login />
  </StaticRouter>
  );

  const loginComponent = routerComponent.find('Login');
  const usernameInput = loginComponent.find('[name="username"]');
  const passwordInput = loginComponent.find('[name="password"]');
  const login = loginComponent.instance();

  it('Display Login', () => {
    const rendered = renderer.create(
      <StaticRouter location="login" context={{}}>
        <Login />
      </StaticRouter>,
    );
    expect(rendered.toJSON()).toMatchSnapshot();
  });

  it('updates state on input change', () => {
    usernameInput.simulate('change', { target: { name: 'username', value: 'testuser' } });
    passwordInput.simulate('change', { target: { name: 'password', value: 'Bootcamp' } });
    expect(login.state.username).toEqual('testuser');
    expect(login.state.password).toEqual('Bootcamp');
  });

  it('login user', () => {
    const loginButton = loginComponent.find('[type="submit"]');
    loginButton.simulate('submit');
  });
});
