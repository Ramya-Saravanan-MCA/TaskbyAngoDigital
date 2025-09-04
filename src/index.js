import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./Redux/CartSlice";
import favReducer from "./Redux/FavSlice";   
import "./index.css";

const store = configureStore({
  reducer: { 
    cart: cartReducer,
    favorites: favReducer   
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
