import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import AddRecipe from '../../components/recipe/AddRecipe';
import { recipeAPIURL } from '../../config';

jest.mock('react-notifications');

const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');

const mock = new MockAdapter(axios);

mock.onPost(`${recipeAPIURL}1/`).reply(201, {});

global.localStorage = {
  getItem: () => {},
  setItem: () => {},
};

describe('Component: AddRecipe', () => {
  const addRecipeMock = jest.fn();
  const addRecipeComponent = mount(<AddRecipe match={{ params: { category_id: 1 } }} addRecipe={addRecipeMock} />);
  const recipeNameInput = addRecipeComponent.find('[name="recipeName"]');
  const ingredientsInput = addRecipeComponent.find('[name="ingredients"]');
  const directionsInput = addRecipeComponent.find('[name="directions"]');
  const addRecipeButton = addRecipeComponent.find('[type="submit"]');

  it('Display AddRecipe component', () => {
    const rendered = renderer.create(
      <AddRecipe match={{ params: { category_id: 1 } }} />,
    );
    expect(rendered.toJSON()).toMatchSnapshot();
  });
  it('update state on input change', () => {
    recipeNameInput.simulate('change', { target: { name: 'recipeName', value: 'Espresso' } });
    ingredientsInput.simulate('change', { target: { name: 'ingredients', value: 'Coffee & Milk' } });
    directionsInput.simulate('change', { target: { name: 'directions', value: 'Mix & Boil' } });
    expect(addRecipeComponent.state().recipeName).toEqual('Espresso');
    expect(addRecipeComponent.state().ingredients).toEqual('Coffee & Milk');
    expect(addRecipeComponent.state().directions).toEqual('Mix & Boil');
  });
  it('Add a recipe', () => {
    addRecipeButton.simulate('submit');
    expect(addRecipeMock.mock.calls.length === 1);
  });
});
