import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import AddCategory from '../../components/category/AddCategory';
import { categoryAPIURL } from '../../config';

jest.mock('react-notifications');

const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');

const mock = new MockAdapter(axios);

mock.onPost(`${categoryAPIURL}`).reply(201, {});

describe('Component: AddCategory', () => {
  const addCategoryMock = jest.fn();
  const addCategoryComponent = mount(<AddCategory addCategory={addCategoryMock} />);
  const categoryNameInput = addCategoryComponent.find('[name="categoryName"]');
  const addCategoryButton = addCategoryComponent.find('[type="submit"]');

  it('Display AddCategory component', () => {
    const rendered = renderer.create(
      <AddCategory />,
    );
    expect(rendered.toJSON()).toMatchSnapshot();
  });
  it('update state on input change', () => {
    categoryNameInput.simulate('change', { target: { name: 'categoryName', value: 'Breakfast' } });
    expect(addCategoryComponent.state().categoryName).toEqual('Breakfast');
  });
  it('Add a category', () => {
    addCategoryButton.simulate('submit');
    expect(addCategoryMock.mock.calls.length === 1);
  });
});
