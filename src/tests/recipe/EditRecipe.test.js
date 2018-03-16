import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import EditRecipe from '../../components/recipe/EditRecipe';
import { recipeAPIURL } from '../../config';

jest.mock('react-notifications');

const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');

const mock = new MockAdapter(axios);

mock.onPost(`${recipeAPIURL}1/1`).reply(200, {});

describe('Component: EditRecipe', () => {
  const editRecipeMock = jest.fn();
  const editRecipeComponent = mount(<EditRecipe match={{ params: { category_id: 1, recipe_id: 1 } }} editRecipe={editRecipeMock} />);
  const recipeNameInput = editRecipeComponent.find('[name="recipeName"]');
  const ingredientsInput = editRecipeComponent.find('[name="ingredients"]');
  const directionsInput = editRecipeComponent.find('[name="directions"]');
  const editRecipeButton = editRecipeComponent.find('[type="submit"]');

  it('Display EditRecipe component', () => {
    const rendered = renderer.create(
      <EditRecipe match={{ params: { category_id: 1, recipe_id: 1 } }} />,
    );
    expect(rendered.toJSON()).toMatchSnapshot();
  });
  it('update state on input change', () => {
    recipeNameInput.simulate('change', { target: { name: 'recipeName', value: 'Espresso' } });
    ingredientsInput.simulate('change', { target: { name: 'ingredients', value: 'Coffee & Milk' } });
    directionsInput.simulate('change', { target: { name: 'directions', value: 'Mix & Boil' } });
    expect(editRecipeComponent.state().recipeName).toEqual('Espresso');
    expect(editRecipeComponent.state().ingredients).toEqual('Coffee & Milk');
    expect(editRecipeComponent.state().directions).toEqual('Mix & Boil');
  });
  it('Edit a recipe', () => {
    editRecipeButton.simulate('submit');
    expect(editRecipeMock.mock.calls.length === 1);
  });
});
