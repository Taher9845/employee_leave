import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import leaveReducer from './slices/leaveSlice';
export default configureStore({ reducer: { auth: authReducer, leave: leaveReducer }});
