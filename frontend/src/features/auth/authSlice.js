import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
    user: null,
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: '',
}

export const register = createAsyncThunk(
    'auth /register',
    async (user, thunkAPI) => {
        console.log(user)
    },
)

export const login = createAsyncThunk('auth /login', async (user, thunkAPI) => {
    console.log(user)
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {},
})

// export const {} = authSlice.actions
export default authSlice.reducer
