import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedUsers : [],
    selectedUser : null,
}
const chatSlice = createSlice({
    name:"chat",
    initialState,
    reducers:{
        addUser:(state, action)=>{
            state.selectedUsers = state.selectedUsers.filter(Boolean)
            const userExists = state.selectedUsers.some(user =>user && user._id === action.payload._id)
            if( !userExists){
                state.selectedUsers.push(action.payload)
            }
        },
        setSelectedUser :(state, action) =>{
            state.selectedUser = action.payload;
        }, 
    }
})
export const { setSelectedUser, addUser } =chatSlice.actions;
export default chatSlice.reducer