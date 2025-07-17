import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FileItem } from "@/models/file";

const renameSlice = createSlice({
  name: "rename",
  initialState: {
    files: [] as FileItem[],
  },
  reducers: {
    addFiles: (state, action: PayloadAction<FileItem[]>) => {
      state.files = [...action.payload];
    },
    removeFile: (state, action: PayloadAction<FileItem>) => {
      state.files = state.files.filter(
        (file) => file.name !== action.payload.name
      );
    },
    updateFile: (state, action: PayloadAction<FileItem>) => {
      const { name, newName, status, error } = action.payload;

      state.files = state.files.map((file) => {
        if (file.name === name) {
          return {
            ...file,
            newName: newName ?? file.newName,
            status: status ?? file.status,
            error: error ?? file.error,
          };
        }
        return file;
      });
    },
    clearFiles: (state) => {
      state.files = [];
    },
  },
});
export const { actions: renameActions, reducer: renameReducer } = renameSlice;
export default renameReducer;
export type RenameState = ReturnType<typeof renameReducer>;
