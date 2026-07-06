import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import ticketService from './ticketService'

const initialState = {
    tickets: [],
    ticket: {},
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: '',
}

// CREATE NEW TICKET
export const createTicket = createAsyncThunk(
    'tickets/create',
    async (ticketData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().authR.user.token
            return await ticketService.createTicketService(ticketData, token)
        } catch (error) {
            const message =
                error.response?.data?.message ||
                error.message ||
                error.toString()

            return thunkAPI.rejectWithValue(message)
        }
    },
)

export const ticketSlice = createSlice({
    name: 'ticket',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(createTicket.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createTicket.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
                state.ticket = action.payload
            })
            .addCase(createTicket.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    },
})

export const { reset } = ticketSlice.actions
export default ticketSlice.reducer
