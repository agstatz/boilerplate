/**
 * userSlice.js
 * 
 * A slice is a function that has an initial state,
 * object of reducer functions, and a name. It is used
 * via redux toolkit to generate action creators and action
 * types - **this is used to store states in redux
 * 
 * @author Ashton Statz
 */

import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null
    },
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
        },
        register: (state, action) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.user = null;
        }
    }
});

export const {login, register, logout} = userSlice.actions;

export const selectUser = (state) => state.user.user;

export default userSlice.reducer;