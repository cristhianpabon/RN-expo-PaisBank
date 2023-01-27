import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface TransactionsState {
  value: number
}

const initialState: TransactionsState = {
  value: 0,
}

export const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    getTransactions: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { getTransactions } = transactionsSlice.actions

export default transactionsSlice.reducer