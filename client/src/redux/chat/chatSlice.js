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
            if (!state.selectedUsers) {
                state.selectedUsers = [];
            }
            state.selectedUsers = state.selectedUsers.filter(Boolean)
            const userExists = state.selectedUsers.some(user =>user && user._id === action.payload._id)
            if( !userExists){
                state.selectedUsers.push(action.payload)
            }
        },
        setSelectedUser :(state, action) =>{
            state.selectedUser = action.payload;
        }, 
          resetChat: (state) => {
            state.selectedUsers = [];
            state.selectedUser = null;
        }
    }
})
export const { setSelectedUser, addUser, resetChat } =chatSlice.actions;
export default chatSlice.reducer