import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { logout } from '../auth/authSlice'

const API_URL = 'http://localhost:3001/api/v1'

export const getUserProfile = createAsyncThunk(
    'user/getProfile',
    async (_, { getState, dispatch, rejectWithValue }) => {
        const { token } = getState().auth

        const response = await fetch(`${API_URL}/user/profile`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })

        if (response.status === 401) {
            dispatch(logout())
            return rejectWithValue('Session expired, please sign in again')
        }

        if (!response.ok) {
            const error = await response.json()
            return rejectWithValue(error.message)
        }

        const data = await response.json()
        return data.body
    }
)

export const updateUserName = createAsyncThunk(
    'user/updateUserName',
    async (userName, { getState, dispatch, rejectWithValue }) => {
        const { token } = getState().auth

        const response = await fetch(`${API_URL}/user/profile`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ userName }),
        })

        if (response.status === 401) {
            dispatch(logout())
            return rejectWithValue('Session expired, please sign in again')
        }

        if (!response.ok) {
            const error = await response.json()
            return rejectWithValue(error.message)
        }

        const data = await response.json()
        return data.body
    }
)

const initialState = {
    firstName: null,
    lastName: null,
    userName: null,
    status: 'idle',
    error: null,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(logout, () => initialState)
            .addCase(getUserProfile.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getUserProfile.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.firstName = action.payload.firstName
                state.lastName = action.payload.lastName
                state.userName = action.payload.userName
            })
            .addCase(getUserProfile.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.payload
            })
            .addCase(updateUserName.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(updateUserName.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.userName = action.payload.userName
            })
            .addCase(updateUserName.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.payload
            })
    }
})

export default userSlice.reducer