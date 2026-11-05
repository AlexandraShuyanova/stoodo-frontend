import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type AuthMode = 'login' | 'register';

const authModalSlice = createSlice({
    name: 'modal',
    initialState: {
        authModal: { open: false, mode: 'login' as AuthMode},
    },
    reducers: {
        openAuthModal: (state, { payload }: PayloadAction<{ mode?: AuthMode} | undefined>) => {
            state.authModal = { open: true, mode: payload?.mode ?? 'login'}
        },
        setAuthMode: (state, { payload }: PayloadAction<AuthMode>) => {
            state.authModal.mode = payload
        },
        closeAuthModal: (state) => {
            state.authModal.open = false
        },
    },
});

export const { openAuthModal, setAuthMode, closeAuthModal } = authModalSlice.actions
export default authModalSlice.reducer