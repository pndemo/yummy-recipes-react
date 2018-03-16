import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import DeleteRecipe from '../../components/recipe/DeleteRecipe';
import { recipeAPIURL } from '../../config';

jest.mock('react-notifications');

const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');

const mock = new MockAdapter(axios);

mock.onDelete(`${recipeAPIURL}1/1`).reply(200, {});

describe('Component: DeleteRecipe', () => {
  const deleteRecipeMock = jest.fn();
  const deleteRecipeComponent = mount(<DeleteRecipe match={{ params: { category_id: 1, recipe_id: 1 } }} DeleteRecipe={deleteRecipeMock} />);
  const deleteRecipeButton = deleteRecipeComponent.find('[type="submit"]');

  it('Display DeleteRecipe component', () => {
    const rendered = renderer.create(
      <DeleteRecipe match={{ params: { category_id: 1, recipe_id: 1 } }} />,
    );
    expect(rendered.toJSON()).toMatchSnapshot();
  });
  it('Delete a recipe', () => {
    deleteRecipeButton.simulate('submit');
    expect(deleteRecipeMock.mock.calls.length === 1);
  });
});
