import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { cardType } from "../../types/types";


export interface CardsState {
  cards: cardType[];
}

const initialState: CardsState = {
  cards: [],
};

export const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    setCards: (state, action: PayloadAction<cardType[]>) => {
      state.cards = action.payload;
    },
  },
});

export const { setCards } = cardsSlice.actions;

export default cardsSlice.reducer;
