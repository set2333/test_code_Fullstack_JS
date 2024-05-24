import { ACTIONS } from './consts.js';

const initialState = [];

export const reducer = (state = initialState, action) => {
  switch (action?.type) {
    case ACTIONS.ADDED:
      return [...state, action.payload];
    case ACTIONS.REMOVED:
      return state.filter(({ id }) => id !== action.payload.id);
    case ACTIONS.SET:
      return action.payload;
    default:
      return state;
  }
}