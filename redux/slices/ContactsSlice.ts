import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { contactType } from "../../types/types";

export interface ContactsState {
  contacts: contactType[];
}

const initialState: ContactsState = {
  contacts: [],
};

export const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    setContacts: (state, action: PayloadAction<contactType[]>) => {
      state.contacts = action.payload;
    },
  },
});

export const { setContacts } = contactsSlice.actions;

export default contactsSlice.reducer;
