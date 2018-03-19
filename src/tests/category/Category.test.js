import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import Categories from '../../components/category/Categories';

describe('Categories Component', () => {
  const wrapper = shallow(<Categories />);

  it('renders without crashing', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('renders state initially', () => {
    expect(wrapper.state().categories).toEqual([]);
    expect(wrapper.state().previousLink).toEqual('');
    expect(wrapper.state().nextLink).toEqual('');
    expect(wrapper.state().page).toEqual('');
    expect(wrapper.state().pages).toEqual('');
    expect(wrapper.state().q).toEqual('');
    expect(wrapper.state().error).toEqual('');
  });
});
