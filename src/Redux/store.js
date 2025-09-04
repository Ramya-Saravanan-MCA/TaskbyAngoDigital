import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./CartSlice";
import favReducer from "./FavSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    favorites: favReducer,
  },
});
