import { configureStore } from '@reduxjs/toolkit';
import {combineReducers } from "redux"
import thunk from "redux-thunk"







const reducer = combineReducers({



});


const middleware = [thunk]

const store = configureStore({

    reducer,

    middleware,

    devTools: process.env.NODE_ENV !== 'production',


})

export default store;