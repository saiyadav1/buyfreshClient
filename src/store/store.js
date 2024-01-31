import { configureStore } from '@reduxjs/toolkit';
import AuthSlice from './authSlice';

export default configureStore({
  reducer: {
    authdata:AuthSlice
  },
})