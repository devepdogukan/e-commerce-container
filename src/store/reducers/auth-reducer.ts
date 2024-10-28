import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { isAxiosError } from 'axios'
import authService from '~/services/auth-service'

interface User {
  email: string
  token: string
  loginDate: string | null
}

interface AuthState {
  user: User | null
  loading: boolean
  error: string | null
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
}

const loginUser = createAsyncThunk(
  'auth/login',
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await authService.login({ email, password })

      return response
    } catch (e: unknown) {
      return rejectWithValue(
        isAxiosError(e) ? e.response?.data?.error : 'Unknown error',
      )
    }
  },
)

const registerUser = createAsyncThunk(
  'auth/register',
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await authService.register({ email, password })
      return response
    } catch (e: unknown) {
      return rejectWithValue(
        isAxiosError(e) ? e.response?.data?.error : 'Unknown error',
      )
    }
  },
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = initialState.user
      state.loading = initialState.loading
      state.error = initialState.error
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true
        state.error = null
        state.user = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = {
          email: action.meta.arg.email,
          token: action.payload.token,
          loginDate: new Date().toISOString(),
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true
        state.error = null
        state.user = null
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = {
          email: action.meta.arg.email,
          token: action.payload.token,
          loginDate: new Date().toISOString(),
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export const { logout } = authSlice.actions

export const actions = {
  ...authSlice.actions,
  loginUser,
  registerUser,
}

export default authSlice.reducer
