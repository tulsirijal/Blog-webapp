import { createSlice } from "@reduxjs/toolkit";
interface UserDetails {
    id: number;
    name: string;
    image: string | null;
    email: string;
  }
interface InitialState {
    token:string | null,
    user:UserDetails | null
}

const initialState:InitialState = {
    token:localStorage.getItem('token') ? localStorage.getItem('token') : null,
    user:null
}
const authSlice = createSlice({
    name:"auth",
    initialState:initialState,
    reducers:{
        setToken:(state,actions)=>{
            state.token = actions.payload
            localStorage.setItem('token',actions.payload)
        },
        setUser:(state,action)=>{
            state.user = action.payload
        }
    }
});

export const {setToken,setUser} = authSlice.actions
export default authSlice.reducer