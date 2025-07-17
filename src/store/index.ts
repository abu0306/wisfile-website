import { configureStore } from "@reduxjs/toolkit";
import renameReducer from "./slice/rename";
export const store = configureStore({
  reducer: {
    rename: renameReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
