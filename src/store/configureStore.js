import { fromJS } from 'immutable';
import { createStore, applyMiddleware, compose } from "redux";
import { combineReducers } from 'redux-immutable';
import thunkMiddleware from "redux-thunk";

import pathwaysPageReducer from '../containers/Pathways/reducer';
import badgesPageReducer from '../containers/Badges/reducer';
import badgePageReducer from '../containers/Badge/reducer';
const initialState = fromJS({});

const rootReducer = combineReducers({
  pathwaysPage: pathwaysPageReducer,
  badgesPage: badgesPageReducer,
  badgePage: badgePageReducer
});

export default function configureStore() {
	const store = createStore(
		rootReducer,
		initialState,
		compose(
			applyMiddleware(thunkMiddleware),
			window.devToolsExtension ? window.devToolsExtension() : f => f
		)
	);

	return store;
}
