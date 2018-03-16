import React from 'react';
import { mount, configure } from 'enzyme';
import { StaticRouter } from 'react-router';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import Register from '../../components/auth/Register';
import { authAPIURL } from '../../config';

const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');

// Set the mock adapter on default instance
const mock = new MockAdapter(axios);

// Mock register POST request
mock.onPost(`${authAPIURL}register`).reply(201, { message: 'Your account has been created.' });

// Component Register
describe('Component: Register', () => {
  configure({ adapter: new Adapter() });
  const routerComponent = mount(
  <StaticRouter location="register" context={{}}>
    <Register />
  </StaticRouter>
  );

  const registerComponent = routerComponent.find('Register');
  const usernameInput = registerComponent.find('[name="username"]');
  const emailInput = registerComponent.find('[name="email"]');
  const passwordInput = registerComponent.find('[name="password"]');
  const confirmPasswordInput = registerComponent.find('[name="confirmPassword"]');
  const register = registerComponent.instance();

  it('Display Register', () => {
    const rendered = renderer.create(
      <StaticRouter location="register" context={{}}>
        <Register />
      </StaticRouter>,
    );
    expect(rendered.toJSON()).toMatchSnapshot();
  });

  it('updates state on input change', () => {
    usernameInput.simulate('change', { target: { name: 'username', value: 'testuser' } });
    emailInput.simulate('change', { target: { name: 'email', value: 'testuser@yummy.com' } });
    passwordInput.simulate('change', { target: { name: 'password', value: 'Bootcamp' } });
    confirmPasswordInput.simulate('change', { target: { name: 'confirmPassword', value: 'Bootcamp' } });
    expect(register.state.username).toEqual('testuser');
    expect(register.state.email).toEqual('testuser@yummy.com');
    expect(register.state.password).toEqual('Bootcamp');
    expect(register.state.confirmPassword).toEqual('Bootcamp');
  });

  it('register user', () => {
    const registerButton = registerComponent.find('[type="submit"]');
    registerButton.simulate('submit');
  });
});
