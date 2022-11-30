import { configureStore } from "@reduxjs/toolkit"
import conterSlice from "./module/conterSlice"

const store = configureStore({
  reducer: {
    counter: conterSlice
  }
})
export default store