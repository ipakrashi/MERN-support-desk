import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import noteService from './noteService'

const initialState = {
    notes: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: '',
}

// GET ALL TICKET NOTES
export const getNotes = createAsyncThunk(
    'notes/getAll',
    async (ticketId, thunkAPI) => {
        try {
            const token = thunkAPI.getState().authR.user.token
            return await noteService.getNotesService(ticketId, token)
        } catch (error) {
            const message =
                error.response?.data?.message ||
                error.message ||
                error.toString()

            return thunkAPI.rejectWithValue(message)
        }
    },
)

// CREATE A TICKET NOTE
export const createNote = createAsyncThunk(
    'notes/create',
    async ({ noteText, ticketId }, thunkAPI) => {
        try {
            const token = thunkAPI.getState().authR.user.token
            return await noteService.createNoteService(
                noteText,
                ticketId,
                token,
            )
        } catch (error) {
            const message =
                error.response?.data?.message ||
                error.message ||
                error.toString()

            return thunkAPI.rejectWithValue(message)
        }
    },
)

export const noteSlice = createSlice({
    name: 'note',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getNotes.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getNotes.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
                state.notes = action.payload
            })
            .addCase(getNotes.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(createNote.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createNote.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
                state.notes.push(action.payload)
            })
            .addCase(createNote.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    },
})

export const { reset } = noteSlice.actions
export default noteSlice.reducer
