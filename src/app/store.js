import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import transactionSlice from "../features/transection/transectionSlice";
import filterSlice from "../features/filter/filterSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    transactions: transactionSlice,
    filter: filterSlice,
  },
});
