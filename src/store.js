import { configureStore } from '@reduxjs/toolkit'
import customerCare from './slices/customerCare';
const reducer = {
    customerCare: customerCare
}
const store = configureStore({
    reducer: reducer,
    devTools: true,
})

export default store;