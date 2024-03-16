import { configureStore } from "@reduxjs/toolkit";
import showImageReducer from "./showImageSlice";

export default configureStore({
  reducer: {
    show_image: showImageReducer,
  },
});
