import { createSlice } from "@reduxjs/toolkit"

export const conterSlice = createSlice({
  name: 'conter',
  initialState: {
    count: 0
  },
  reducers: {
    increament: (state) => {
      state.count++
    },
    decrement: (state) => {
      state.count--
    }
  }

})
export const { increament, decrement } = conterSlice.actions
export default conterSlice.reducer