import { UserInterface } from '@/utils/types'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface CounterState {
    user: null | UserInterface
}

const initialState: CounterState = {
    user: null
}

export const authSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        setUserAuth: (state, action: PayloadAction<UserInterface | null>) => {
            state.user = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { setUserAuth } = authSlice.actions

export default authSlice.reducer