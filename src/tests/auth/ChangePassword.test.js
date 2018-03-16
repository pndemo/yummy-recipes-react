import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import ChangePassword from '../../components/auth/ChangePassword';
import { authAPIURL } from '../../config';

jest.mock('react-notifications');

const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');

const mock = new MockAdapter(axios);

mock.onPost(`${authAPIURL}change_password`).reply(201, {});

describe('Component: ChangePassword', () => {
  const changePasswordMock = jest.fn();
  const changePasswordComponent = mount(<ChangePassword changePassword={changePasswordMock} />);
  const newPasswordInput = changePasswordComponent.find('[name="newPassword"]');
  const confirmNewPasswordInput = changePasswordComponent.find('[name="confirmNewPassword"]');
  const changePasswordButton = changePasswordComponent.find('[type="submit"]');

  it('Display ChangePassword component', () => {
    const rendered = renderer.create(
      <ChangePassword />,
    );
    expect(rendered.toJSON()).toMatchSnapshot();
  });
  it('update state on input change', () => {
    newPasswordInput.simulate('change', { target: { name: 'newPassword', value: 'Bootcamp17' } });
    confirmNewPasswordInput.simulate('change', { target: { name: 'confirmNewPassword', value: 'Bootcamp17' } });
    expect(changePasswordComponent.state().newPassword).toEqual('Bootcamp17');
    expect(changePasswordComponent.state().confirmNewPassword).toEqual('Bootcamp17');
  });
  it('Add a category', () => {
    changePasswordButton.simulate('submit');
    expect(changePasswordMock.mock.calls.length === 1);
  });
});
