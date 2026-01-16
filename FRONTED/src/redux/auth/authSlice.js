import  {createSlice} from '@reduxjs/toolkit';

const initialState = {
    isLoggedIn : false,
    userData : null,
    isInChat : false,
    memberData : null,

}

const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers: {
        login: (state,action) => {
            state.isLoggedIn = true;
            state.userData = action.payload;
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.userData = null;
        },
        currentChat: (state,action) =>{
            state.isInChat = true,
            state.memberData = action.payload
        },
        leftChat: (state) => {
            state.isInChat = false,
            state.memberData = null
        },
        

    }
})
export const { login, logout, currentChat, leftChat } = authSlice.actions;
export default authSlice.reducer