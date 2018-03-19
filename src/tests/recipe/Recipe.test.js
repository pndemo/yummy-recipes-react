import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import Recipes from '../../components/recipe/Recipes';

describe('Recipes Component', () => {
  const wrapper = shallow(<Recipes match={{ params: { category_id: 1 } }} />);

  it('renders without crashing', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
