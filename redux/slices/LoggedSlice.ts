import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface LoggedState {
    logged: boolean
}

const initialState: LoggedState = {
  logged: false,
}

export const loggedSlice = createSlice({
  name: 'logged',
  initialState,
  reducers: {
    setLoggin: (state, action: PayloadAction<boolean>) => {
      state.logged = action.payload
    },
  },
})

export const { setLoggin } = loggedSlice.actions

export default loggedSlice.reducer