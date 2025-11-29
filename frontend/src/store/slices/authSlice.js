import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../api';

export const login = createAsyncThunk('auth/login', async (payload, { rejectWithValue }) => {
  try {
    const res = await API.post('/auth/login', payload);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.error || 'Login failed');
  }
});

export const register = createAsyncThunk('auth/register', async (payload, { rejectWithValue }) => {
  try {
    const res = await API.post('/auth/register', payload);
    return res.data; // usually returns user info, then we might need to login or auto-login
  } catch (err) {
    return rejectWithValue(err.response?.data?.error || 'Registration failed');
  }
});

export const loadUser = createAsyncThunk('auth/loadUser', async (_, { rejectWithValue }) => {
  try {
    const res = await API.get('/auth/me');
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.error || 'Failed to load user');
  }
});

const initialState = {
  token: localStorage.getItem('token') || null,
  user: null,
  loading: false,
  error: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      state.user = null;
      localStorage.removeItem('token');
    },
    clearError(state) {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    // Login
    builder.addCase(login.pending, (state) => { state.loading = true; state.error = null; });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.token = action.payload.token;
      localStorage.setItem('token', action.payload.token);
      // We might want to trigger loadUser here or rely on the component to do it, 
      // but usually login response should contain user or we fetch it.
      // For now, let's assume we need to fetch user or decode token if user info is not in login response.
      // The backend login returns { token }.
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Register
    builder.addCase(register.pending, (state) => { state.loading = true; state.error = null; });
    builder.addCase(register.fulfilled, (state) => {
      state.loading = false;
      // Registration successful, maybe redirect to login
    });
    builder.addCase(register.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Load User
    builder.addCase(loadUser.pending, (state) => { state.loading = true; });
    builder.addCase(loadUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    });
    builder.addCase(loadUser.rejected, (state) => {
      state.loading = false;
      state.token = null;
      localStorage.removeItem('token');
    });
  }
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
