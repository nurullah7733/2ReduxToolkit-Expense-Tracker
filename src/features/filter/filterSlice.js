import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  type: "",
  search: "",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setType: (state, action) => {
      state.type = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    reset: () => {
      return initialState;
    },
  },
});

export default filterSlice.reducer;
export const { setSearch, setType, reset } = filterSlice.actions;
