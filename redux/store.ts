import { configureStore } from "@reduxjs/toolkit";
import cardsReducer from "./slices/CardsSlice";
import contactsReducer from "./slices/ContactsSlice";
import transactionsReducer from "./slices/TransactionsSlice";

export const store = configureStore({
  reducer: {
    cards: cardsReducer,
    contacts: contactsReducer,
    transactions: transactionsReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
