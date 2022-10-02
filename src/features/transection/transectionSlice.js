import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  deleteTransection,
  createTransection,
  getTransection,
  updateTransection,
} from "./transectionAPI";

const initialState = {
  transactions: [],
  isLoading: false,
  isError: false,
  errors: {},
  edit: {},
  visibleEditFormInAllTransactionPage: false,
};

// async thunks
// export const fetchTransectionThank = createAsyncThunk(
//   "transection/fetchtransection",
//   async () => {
//     const getTransectionData = await getTransection();
//     return getTransectionData;
//   }
// );

export const fetchTransectionThank = createAsyncThunk(
  "allTransactions/fetchtransactions",
  async ({ type, search }) => {
    const getAllTransactionData = await getTransection(type, search);
    return getAllTransactionData;
  }
);

export const addTransectionThank = createAsyncThunk(
  "transection/addtransection",
  async (data) => {
    const getTransectionData = await createTransection(data);
    return getTransectionData;
  }
);
export const changeTransectionThank = createAsyncThunk(
  "transection/changetransection",
  async ({ id, data }) => {
    const getTransectionData = await updateTransection(id, data);
    return getTransectionData;
  }
);
export const removeTransectionThank = createAsyncThunk(
  "transection/removetransection",
  async (id) => {
    const getTransectionData = await deleteTransection(id);
    return getTransectionData;
  }
);

const transactionSlice = createSlice({
  name: "transection",
  initialState,
  reducers: {
    editActive: (state, action) => {
      state.edit = action.payload;
    },
    editInActive: (state) => {
      state.edit = {};
    },
    setVisibleEditFormInAllTransactionPage: (state) => {
      state.visibleEditFormInAllTransactionPage =
        !state.visibleEditFormInAllTransactionPage;
    },
  },
  extraReducers: (builder) => {
    builder
      // get transection--------------------------------------------------------------------------
      .addCase(fetchTransectionThank.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchTransectionThank.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.transactions = action.payload;
      })
      .addCase(fetchTransectionThank.rejected, (state, action) => {
        state.isLoading = false;
        state.transactions = [];
        state.isError = true;
        state.errors = action.error?.message;
      })
      // create--------------------------------------------------------------------------------------
      .addCase(addTransectionThank.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(addTransectionThank.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.transactions.push(action.payload);
      })
      .addCase(addTransectionThank.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errors = action.error?.message;
      })
      // edit------------------------------------------------------------------------------------------
      .addCase(changeTransectionThank.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(changeTransectionThank.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        const changeIndexNumber = state.transactions.findIndex(
          (t) => t.id === action.payload.id
        );
        state.transactions[changeIndexNumber] = action.payload;
      })
      .addCase(changeTransectionThank.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errors = action.error?.message;
      })
      // delete-------------------------------------------------------------------------------------------
      .addCase(removeTransectionThank.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(removeTransectionThank.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.transactions = state.transactions.filter(
          (t) => t.id !== action.meta.arg
        );
      })
      .addCase(removeTransectionThank.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errors = action.error?.message;
      });
  },
});

export default transactionSlice.reducer;
export const {
  editActive,
  editInActive,
  setVisibleEditFormInAllTransactionPage,
} = transactionSlice.actions;
