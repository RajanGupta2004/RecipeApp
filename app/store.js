import {configureStore} from '@reduxjs/toolkit';
import authReduce from './authSlice/index';
export const store = configureStore({
  reducer: {
    auth: authReduce,
  },
});
