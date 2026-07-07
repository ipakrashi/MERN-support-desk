import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import ticketReducer from '../features/tickets/ticketSlice'
import noteReducer from '../features/notes/noteSlice'

export const store = configureStore({
    reducer: {
        authR: authReducer,
        ticketR: ticketReducer,
        noteR: noteReducer,
    },
})
