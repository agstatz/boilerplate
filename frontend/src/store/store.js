import {combineReducers, createStore } from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

export const UpdateForm = (key, value) => ({
    type: "SET_VALUE",
    payload: {key, value}
});

const appreducer = (state = {}, action) => {
    switch (action.type) {
        case "SET_VALUE":
            return {...state, [action.payload.key]: action.payload.value};
        default:
            return state;
    }
}

const reducer = combineReducers({
    app: appreducer
})

const persistConfig = {
    key: 'primary',
    storage
}

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = createStore(
    persistedReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export const persistor = persistStore(store);