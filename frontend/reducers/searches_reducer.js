import merge from 'lodash/merge';

import { RECEIVE_SEARCH_RESULTS } from '../actions/search_actions';

const SearchesReducer = (state = {}, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_SEARCH_RESULTS:
      return merge({}, action.searchResults);
    default:
      return state;
  }
};

export default SearchesReducer;
