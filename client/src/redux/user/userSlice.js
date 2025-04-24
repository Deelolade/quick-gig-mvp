import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    error: null,
    loading: false,
    isAuthenticated: false,
    selectedRole: null,
};
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        signInStart: (state)=>{
            state.loading = true;
            state.error = null;
        },
        signInSuccess: ( state, action )=>{
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null 
            state.isAuthenticated = true;
            state.selectedRole = action.payload.role || null;
        },
        signInFailure: ( state) =>{
            state.loading = false;
            state.error = null;
            state.isAuthenticated = false;
        },
        logOut: (state)=>{
            state.loading = false;
            state.currentUser =null;
            state.error = null;
            state.isAuthenticated = false;
            state.selectedRole = null;
        },
        selectRole: (state,action ) =>{
            state.selectedRole = action.payload || null;
        },
        updateStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        updateSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        updateFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    }
})

export const {
    signInStart,
    signInSuccess,
    signInFailure,
    logOut,
    selectRole,
    updateStart,
    updateSuccess,
    updateFailure
} = userSlice.actions;



export default userSlice.reducer;