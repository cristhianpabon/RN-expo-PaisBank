import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface ContactsState {
  value: number
}

const initialState: ContactsState = {
  value: 0,
}

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    getContacts: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { getContacts } = contactsSlice.actions

export default contactsSlice.reducer