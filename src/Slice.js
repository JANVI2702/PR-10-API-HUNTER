import { createSlice ,createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPost = createAsyncThunk("posts/fetchPosts",async()=>{
    const response = await fetch("https://jsonplaceholder.typicode.com/posts")
    return response.json(
    )
})

const postSlice=createSlice({
    name:"posts",
    initialState:{
        data:[],
        loading:false,
        error:null
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchPost.pending,(state)=>{
            state.loading=true
        }).addCase(fetchPost.fulfilled,(state,action)=>{
            state.loading=false,
            state.data=action.payload
        }).addCase(fetchPost.rejected,(state,action)=>{
            state.loading=false,
            state.error=action.error.message
        })
    }
})

export default postSlice.reducer