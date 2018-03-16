import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import EditCategory from '../../components/category/EditCategory';
import { categoryAPIURL } from '../../config';

jest.mock('react-notifications');

const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');

const mock = new MockAdapter(axios);

mock.onPost(`${categoryAPIURL}1`).reply(200, {});

describe('Component: EditCategory', () => {
  const editCategoryMock = jest.fn();
  const editCategoryComponent = mount(<EditCategory match={{ params: { category_id: 1 } }} editCategory={editCategoryMock} />);
  const categoryNameInput = editCategoryComponent.find('[name="categoryName"]');
  const editCategoryButton = editCategoryComponent.find('[type="submit"]');

  it('Display EditCategory component', () => {
    const rendered = renderer.create(
      <EditCategory />,
    );
    expect(rendered.toJSON()).toMatchSnapshot();
  });
  it('update state on input change', () => {
    categoryNameInput.simulate('change', { target: { name: 'categoryName', value: 'Breakfast2' } });
    expect(editCategoryComponent.state().categoryName).toEqual('Breakfast2');
  });
  it('Edit a category', () => {
    editCategoryButton.simulate('submit');
    expect(editCategoryMock.mock.calls.length === 1);
  });
});
