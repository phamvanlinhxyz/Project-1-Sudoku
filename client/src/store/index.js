import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "./reducers/gameSlice";

const store = configureStore({
  reducer: { gameReducer },
});

export default store;
