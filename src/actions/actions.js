import { get } from "lodash";
import * as types from "./actionTypes";



export function setSortParams(sortKey, sortType) {
  return (dispatch, getState) => {
    const { sortParams } = getState().app;
    const order = get(sortParams, "order");
    dispatch({
      type: types.SET_SORT_PARAMS,
      payload: {
        data: {
          key: sortKey,
          order: order === "desc" ? "asc" : "desc",
          type: sortType
        }
      }
    });
  };
}

export function deleteContact(id) {
  return (dispatch, getState) => {
   
    dispatch({
      type: types.REMOVE_CONTACT,
      id: id
    });
  };
}

export function clearSortParams() {
  return {
    type: types.SET_SORT_PARAMS,
    payload: {
      data: undefined
    }
  };
}

// export const deleteContact = (id) => {
//     return {
//         type: types.REMOVE_CONTACT,
//         id: id
//     }
// }
