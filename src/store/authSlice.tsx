import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

type AuthState = {
    isAuth: boolean
    token: string | null
}

const slice = createSlice({
    name: 'auth',
    initialState: {
        isAuth: typeof window !== 'undefined' ? localStorage.getItem('token') != null : false,
        token: typeof window !== 'undefined' ? localStorage.getItem('token') : null
    } as AuthState,
    reducers: {
        setCredentials: (
            state,
            { payload: { access_token } }: PayloadAction<{ access_token: string | null }>
        ) => {
            if (localStorage && access_token) {
                localStorage.setItem('token', access_token)
            }

            if (localStorage && !access_token) {
                localStorage.removeItem('token')
            }

            state.token = access_token
            state.isAuth = access_token != null
        },
    },
})

export const { setCredentials } = slice.actions
export default slice.reducer

