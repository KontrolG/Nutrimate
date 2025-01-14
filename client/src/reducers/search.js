import { combineReducers } from "redux";
import {
  SET_SEARCH_QUERY,
  TOGGLE_SEARCH_IS_CLOSED,
  SET_SEARCH_IS_CLOSED,
  SET_IS_SEARCHING,
  SET_RESULTS,
  ADD_RESULTS,
  SET_LAST_UPDATE
} from "../actions/types";

const query = (previousState = "", action) => {
  if (action.type === SET_SEARCH_QUERY) {
    return action.query; // retorna el nuevo valor de la parte del estado que le toca.
  }
  return previousState; // Necesario para saber que parte del estado manejara este reducer cuando es iniciado el store.
};

const isClosed = (previousState = true, action) => {
  if (action.type === TOGGLE_SEARCH_IS_CLOSED) {
    return !previousState;
  }
  if (action.type === SET_SEARCH_IS_CLOSED) {
    return action.isClosed;
  }
  return previousState;
};

const isSearching = (previousState = false, action) => {
  if (action.type === SET_IS_SEARCHING) {
    return action.isSearching;
  }
  return previousState;
};

const results = (previousState = [], action) => {
  if (action.type === SET_RESULTS) {
    return [...action.results];
  }
  if (action.type === ADD_RESULTS) {
    return [...previousState, ...action.results];
  }
  return previousState;
};

const lastUpdate = (previousState = null, action) => {
  if (action.type === SET_LAST_UPDATE) {
    return action.lastUpdate;
  }
  return previousState;
};

const searchReducer = combineReducers({
  isClosed,
  query,
  isSearching,
  results,
  lastUpdate
});

export default searchReducer;
