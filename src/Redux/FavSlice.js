import { createSlice } from "@reduxjs/toolkit";

const favSlice = createSlice({
  name: "favorites",
  initialState: [],
  reducers: {
    addToFav: (state, action) => {
      const exists = state.find((item) => item.id === action.payload.id);
      if (!exists) {
        state.push(action.payload);
      }
    },
    removeFromFav: (state, action) => {
      return state.filter((item) => item.id !== action.payload);
    },
    clearFav: () => {
      return [];
    },
  },
});

export const { addToFav, removeFromFav, clearFav } = favSlice.actions;
export default favSlice.reducer;
