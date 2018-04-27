import * as actionTypes from '../actions/actionTypes';
import {updateObject} from './utility';

const initialState = {
    ingredients: null,
    price: 4,
    error: false
};

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.7,
    cheese: 0.4,
    meat: 1.3
};

const addIngredient = (state, action) => {
    let updatedIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] + 1};
    let updatedIngredients = updateObject(state.ingredients, updatedIngredient);
    let updatedState = {state, 
        ingredients: updatedIngredients,
        price: state.price + INGREDIENT_PRICES[action.ingredientName]
    };
    return updateObject(state, updatedState);
};

const removeIngredient = (state, action) => {
    let updatedIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] - 1};
    let updatedIngredients = updateObject(state.ingredients, updatedIngredient);
    let updatedState = {state, 
        ingredients: updatedIngredients,
        price: state.price - INGREDIENT_PRICES[action.ingredientName]
    };
    return updateObject(state, updatedState);
};

const setIngredients = (state, action) => {
    return updateObject(state, {
        ingredients: {
            salad: action.ingredients.salad,
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            meat: action.ingredients.meat,
        },
        price: 4,
        error: false
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT: return addIngredient(state, action);
        case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action);
        case actionTypes.SET_INGREDIENTS: return setIngredients(state, action);
        case actionTypes.FETCH_INGREDIENTS_FAILED: return updateObject(state, {error: true});
        default: return state;
    };
};

export default reducer;