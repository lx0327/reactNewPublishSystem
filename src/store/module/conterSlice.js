import { createSlice } from "@reduxjs/toolkit"

export const conterSlice = createSlice({
  name: 'conter',
  initialState: {
    count: 0,
    user: JSON.parse(localStorage.getItem('token')),
    collapsed: false

  },
  reducers: {
    increament: (state) => {
      state.count++
    },
    decrement: (state) => {
      state.count--
    },
    changeCollapsed: (state) => {
      state.collapsed = !state.collapsed
    }
  }

})
export const { increament, decrement, changeCollapsed } = conterSlice.actions
export default conterSlice.reducer