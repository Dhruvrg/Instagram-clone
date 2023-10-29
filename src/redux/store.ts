import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from 'redux';
import thunk from 'redux-thunk';
import moviesReducer from './Burger/reducers';
import userReducer from './user/reducers';
const rootReducer = combineReducers({
  userReducer,
});
export const store = createStore(rootReducer, applyMiddleware(thunk));
export type AppDispatch = typeof store.dispatch;
