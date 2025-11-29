import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../api';

export const applyLeave = createAsyncThunk('leave/apply', async (payload) => {
  const res = await API.post('/leaves', payload);
  return res.data;
});

export const fetchMyRequests = createAsyncThunk('leave/myRequests', async () => {
  const res = await API.get('/leaves/my-requests');
  return res.data;
});

export const fetchPending = createAsyncThunk('leave/pending', async () => {
  const res = await API.get('/leaves/pending');
  return res.data;
});

const leaveSlice = createSlice({
  name: 'leave',
  initialState: { myRequests: [], pending: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(applyLeave.fulfilled, (state, action) => { state.myRequests.unshift(action.payload); })
           .addCase(fetchMyRequests.fulfilled, (state, action) => { state.myRequests = action.payload; })
           .addCase(fetchPending.fulfilled, (state, action) => { state.pending = action.payload; });
  }
});

export default leaveSlice.reducer;
