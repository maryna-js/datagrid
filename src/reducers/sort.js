import * as actionTypes from "../actions/actionTypes";
const initialState = {};

export default (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.SET_SORT_PARAMS:
        return { ...state, sortParams: action.payload.data };
      case actionTypes.REMOVE_CONTACT:
        return { ...state.filter((data, i) => console.log('i'))} ;
      default:
        return state;
    }
  };
