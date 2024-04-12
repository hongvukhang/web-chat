import { createSlice } from "@reduxjs/toolkit";

const createGroupSlice = createSlice({
  name: "group",
  initialState: {
    isShow: false,
  },
  reducers: {
    isShow: (state, payload) => {
      state.isShow = payload.payload;
    },
  },
});
export const { isShow } = createGroupSlice.actions;
export default createGroupSlice.reducer;
