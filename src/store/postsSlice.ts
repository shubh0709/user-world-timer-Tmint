import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { StorePostsState, TransformedPostsData } from "../types/types";

const initialState: StorePostsState = {
  data: null,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    storeSetPosts: (
      state,
      action: PayloadAction<TransformedPostsData | null>
    ) => {
      state.data = action.payload;
    },
  },
});

export const { storeSetPosts } = postsSlice.actions;

export default postsSlice.reducer;
