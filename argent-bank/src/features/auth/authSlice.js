import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const API_URL = 'http://localhost:3001/api/v1'

export const login = createAsyncThunk(
    'auth/login',
    async ({ email, password }, { rejectWithValue }) => {
        const response = await fetch(`${API_URL}/user/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        })

        if (!response.ok) {
            const error = await response.json()
            return rejectWithValue(error.message)
        }

        const data = await response.json()
        return data.body.token
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: null,
        status: 'idle',
        error: null,
    },
    reducers: {
        logout(state) {
            state.token = null
            state.status = 'idle'
            state.error = null
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.status = 'loading'
                state.error = null
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.token = action.payload
            })
            .addCase(login.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.payload
            })
    }
})

export const { logout } = authSlice.actions
export default authSlice.reducer