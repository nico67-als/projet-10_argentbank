import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const API_URL = 'http://localhost:3001/api/v1'

export const getUserProfile = createAsyncThunk(
    'user/getProfile',
    async (_, { getState, rejectWithValue }) => {
        const { token } = getState().auth

        const response = await fetch(`${API_URL}/user/profile`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })

        if(!response.ok) {
            const error = await response.json()
            return rejectWithValue(error.message)
        }

        const data = await response.json()
        return data.body
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState: {
        firstName: null,
        lastName: null,
        email: null,
        status: 'idle',
        error: null,
    },
    reducers: {
        clearUser(state) {
            state.firstName = null
            state.lastName = null
            state.email = null
            state.status = 'idle'
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserProfile.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getUserProfile.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.firstName = action.payload.firstName
                state.lastName = action.payload.lastName
            })
            .addCase(getUserProfile.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.payload
            })
    }
})

export const { clearUser } = userSlice.actions 
export default userSlice.reducer