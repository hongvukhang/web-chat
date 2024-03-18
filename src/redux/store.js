import { configureStore } from "@reduxjs/toolkit";
import showImageReducer from "./showImageSlice";
import showAlertReducer from "./showAlertSlice";
// import { GetDefaultMiddleware } from "@reduxjs/toolkit/dist/getDefaultMiddleware";
export default configureStore({
  reducer: {
    show_image: showImageReducer,
    show_alert: showAlertReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
