import { createSlice } from "@reduxjs/toolkit";
interface Post {
    posts:{
        id:number,
        title:string,
        description:string,
        image?:string
    }[]
}
const initialState:Post = {
    posts:[]
}

const userPost = createSlice({
    name:"userPost",
    initialState,
    reducers:{
        setUserPost:(state,action)=>{
            state.posts = action.payload
        }
    }
})

export const {setUserPost} = userPost.actions;
export default userPost.reducer