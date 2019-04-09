import { createStore, compose as origCompose, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import app from './reducers/app.js'
import { loadState, saveState } from './localStorage.js'
import { lazyReducerEnhancer } from 'pwa-helpers/lazy-reducer-enhancer.js'

const compose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || origCompose

export const store = createStore(
    (state, action) => state,
    loadState(),
    compose(lazyReducerEnhancer(combineReducers), applyMiddleware(thunk))
);

// initially loaded reducers
store.addReducers({
    app
});

// this subscriber writes to local storage anytime the state updates
store.subscribe(() => {
    saveState(store.getState());
});

export const RootState = {};