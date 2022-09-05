import { configureStore } from '@reduxjs/toolkit'
import customerCare from './reducer/customerCare'

const reducer = {
    customerCare: customerCare
}
export const store = configureStore({
  reducer: reducer,
  devTools: true,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch