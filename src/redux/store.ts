import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './reducers/counter'
import authReducer from './reducers/auth'
export const store = configureStore({
    reducer: {
        counter: counterReducer,
        auth: authReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch