import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { transactionType } from "../../types/types";

export interface TransactionsState {
  transactions: transactionType[];
}

const initialState: TransactionsState = {
  transactions: [],
};

export const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    setTransactions: (state, action: PayloadAction<transactionType[]>) => {
      state.transactions = action.payload;
    },
  },
});

export const { setTransactions } = transactionsSlice.actions;

export default transactionsSlice.reducer;
