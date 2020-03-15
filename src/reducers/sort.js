import * as actionTypes from "../actions/actionTypes";
const initialState = {};

export default (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.SET_SORT_PARAMS:
        return { ...state, sortParams: action.payload.data };
      default:
        return state;
    }
  };
