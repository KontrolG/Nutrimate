import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import { setDate, setCurrentId } from "./actions/activity";

const initialState = {};

const middlewares = [thunk];
const enhancer = compose(
  applyMiddleware(...middlewares),
  window.__REDUX_DEVTOOLS_EXTENSION__
    ? window.__REDUX_DEVTOOLS_EXTENSION__()
    : compose
);

const store = createStore(rootReducer, initialState, enhancer);

console.log(setCurrentId(1));
store.dispatch(setCurrentId(1));
store.dispatch(setDate(new Date("1999/12/01")));

/* TEST */
const logState = () => console.log(store.getState());
logState();
const unsubscribe = store.subscribe(logState);
// store.dispatch(setSearchQuery("TEst 2"));
// unsubscribe();
// store.dispatch(setSearchQuery("TEst 3"));

export default store;
