import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface CardsState {
  value: number
}

const initialState: CardsState = {
  value: 0,
}

export const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    getCards: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { getCards } = cardsSlice.actions

export default cardsSlice.reducer