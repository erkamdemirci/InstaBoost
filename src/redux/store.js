import { createStore, combineReducers } from 'redux';
import colorReducer from './reducers/colorReducer';
import accountReducer from './reducers/accountReducer';

const rootReducer = combineReducers({
  colorReducer: colorReducer,
  accountReducer: accountReducer
})

const configureStore = () => createStore(rootReducer);

export default configureStore;