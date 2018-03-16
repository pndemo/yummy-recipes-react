import React from 'react';
import { mount, configure } from 'enzyme';
import { StaticRouter } from 'react-router';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import ResetPassword from '../../components/auth/ResetPassword';
import { authAPIURL } from '../../config';

const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');

// Set the mock adapter on default instance
const mock = new MockAdapter(axios);

// Mock reset password POST request
mock.onPost(`${authAPIURL}reset_password`).reply(200, { message: 'Your password has been reset.' });

// Component ResetPassword
describe('Component: ResetPassword', () => {
  configure({ adapter: new Adapter() });
  const routerComponent = mount(
  <StaticRouter location="reset_password" context={{}}>
    <ResetPassword />
  </StaticRouter>
  );

  const resetPasswordComponent = routerComponent.find('ResetPassword');
  const emailInput = resetPasswordComponent.find('[name="email"]');
  const resetPassword = resetPasswordComponent.instance();

  it('Display ResetPassword', () => {
    const rendered = renderer.create(
      <StaticRouter location="reset_password" context={{}}>
        <ResetPassword />
      </StaticRouter>,
    );
    expect(rendered.toJSON()).toMatchSnapshot();
  });

  it('updates state on input change', () => {
    emailInput.simulate('change', { target: { name: 'email', value: 'testuser@yummy.com' } });
    expect(resetPassword.state.email).toEqual('testuser@yummy.com');
  });

  it('reser user password', () => {
    const resetPasswordButton = resetPasswordComponent.find('[type="submit"]');
    resetPasswordButton.simulate('submit');
  });
});
