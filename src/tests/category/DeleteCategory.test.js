import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import DeleteCategory from '../../components/category/DeleteCategory';
import { categoryAPIURL } from '../../config';

jest.mock('react-notifications');

const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');

const mock = new MockAdapter(axios);

mock.onDelete(`${categoryAPIURL}1`).reply(200, {});

describe('Component: DeleteCategory', () => {
  const deleteCategoryMock = jest.fn();
  const deleteCategoryComponent = mount(<DeleteCategory match={{ params: { category_id: 1 } }} deleteCategory={deleteCategoryMock} />);
  const deleteCategoryButton = deleteCategoryComponent.find('[type="submit"]');

  it('Display DeleteCategory component', () => {
    const rendered = renderer.create(
      <DeleteCategory match={{ params: { category_id: 1 } }} />,
    );
    expect(rendered.toJSON()).toMatchSnapshot();
  });
  it('Delete a category', () => {
    deleteCategoryButton.simulate('submit');
    expect(deleteCategoryMock.mock.calls.length === 1);
  });
});
