import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice} from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {user: null, token: null},
  reducers: {
    setUser: (state, action) => {
      (state.user = action.payload.user), (state.token = action.payload.token);
    },
    logOut: state => {
      (state.user = null),
        (state.token = null),
        AsyncStorage.removeItem('auth');
    },
  },
});

export const {setUser, logOut} = authSlice.actions;

export default authSlice.reducer;
