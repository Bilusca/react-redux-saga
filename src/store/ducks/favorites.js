/**
 * TYPES
 */
export const Types = {
  ADD_REQUEST: "favorites/ADD_FAVORITE_REQUEST",
  ADD_SUCCESS: "favorites/ADD_FAVORITE_SUCCESS",
  ADD_FAILURE: "favorites/ADD_FAVORITE_FAILURE"
};

/**
 * REDUCER
 */
const INITIAL_STATE = {
  loading: false,
  data: [],
  error: null
};

export default function favorites(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.ADD_REQUEST:
      return { ...state, loading: true };
    case Types.ADD_SUCCESS:
      return {
        ...state,
        loading: false,
        data: [...state.data, action.payload.data],
        error: null
      };
    case Types.ADD_FAILURE:
      return { ...state, loading: false, error: action.payload.error };
    default:
      return state;
  }
}

/**
 * ACTIONS
 */
export const Creators = {
  addFavoriteRequest: repository => ({
    type: Types.ADD_REQUEST,
    payload: { repository }
  }),

  addFavoriteSuccess: data => ({
    type: Types.ADD_SUCCESS,
    payload: { data }
  }),

  addFavoriteFailure: error => ({
    type: Types.ADD_FAILURE,
    payload: { error }
  })
};
