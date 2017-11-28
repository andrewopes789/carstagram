import { combineReducers } from 'redux';

import {
  RECEIVE_FEED_PHOTOS,
  RECEIVE_PHOTO,
  REMOVE_PHOTO
} from '../actions/photo_actions';

import { RECEIVE_USER } from '../actions/user_actions';

import { merge } from 'lodash';

const initialState = {};

export default (state=initialState, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_FEED_PHOTOS:
      return merge({}, action.payload.photos);
    case RECEIVE_USER:
      return merge({}, action.payload.photos);
    case RECEIVE_PHOTO:
      return merge({}, state, action.photo);
    case REMOVE_PHOTO:
      let newState1 = merge({}, state);
      delete newState1[action.photoId];
      return newState1;
    default:
      return state;
    }
  };