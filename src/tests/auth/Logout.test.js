import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Logout from '../../components/auth/Logout';

global.localStorage = {
  removeItem: () => {},
};

// Component Logout
describe('Component: Logout', () => {
  configure({ adapter: new Adapter() });
  it('renders without exploding', () => {
    expect(
      shallow(
        <Logout />,
      ).length,
    ).toEqual(1);
  });
});
