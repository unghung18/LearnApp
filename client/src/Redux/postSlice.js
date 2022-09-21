import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
    findPost: {}
}

export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        addAll: (state, action) => {
            state.items = action.payload;
        },
        addOne: (state, action) => {
            state.items.push(action.payload);
        },
        deletePost: (state, action) => {
            const id = action.payload._id;
            const nextPostItems = state.items.filter(item => item._id !== id);
            state.items = nextPostItems;
        },
        updatePost: (state, action) => {
            const id = action.payload._id;

            const itemIndex = state.items.findIndex(item => item._id === id);

            state.items[itemIndex] = action.payload;
        },
        findPost: (state, action) => {
            state.findPost = action.payload;
        }
    }
})

export const { addOne, addAll, deletePost, findPost, updatePost } = postSlice.actions;
export default postSlice.reducer;