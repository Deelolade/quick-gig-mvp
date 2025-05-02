import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedUsers : [],
}
const chatSlice = createSlice({
    name:"chat",
    initialState,
    reducers:{
        addUser:(state, action)=>{
            
            console.log(action.payload);
            const userExists = state.selectedUsers.some(user => user._id === action.payload._id)
            if( !userExists){
                state.selectedUsers.push(action.payload)
            }
        },
        setSelectedUser :(state, action) =>{
            state.selectedUsers = [action.payload];
        }
    }
})
export const { setSelectedUser, addUser } =chatSlice.actions;
export default chatSlice.reducer