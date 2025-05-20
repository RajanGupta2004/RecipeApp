import {NavigationContainer} from '@react-navigation/native';

import AppNavigator from './navigation/AppNavigator';
import {Provider, useDispatch} from 'react-redux';
import {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from 'jwt-decode';
import {setUser} from './app/authSlice';
import {store} from './app/store';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const AppContent = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const authData = await AsyncStorage.getItem('auth');
        if (authData) {
          const {user, token} = JSON.parse(authData);
          const decoded = jwtDecode(token);
          console.log('decoded', decoded);

          const currentTime = Date.now() / 1000;

          if (decoded.exp < currentTime) {
            await AsyncStorage.removeItem('auth');
            return;
          }

          dispatch(setUser({token, user}));
        }
      } catch (error) {
        console.log('Error in initialzeAuth ', error);
        await AsyncStorage.removeItem('auth');
      }
    };

    initializeAuth();
  }, [dispatch]);
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

function App() {
  return (
    <>
      <Provider store={store}>
        <AppContent />
      </Provider>
    </>
  );
}

export default App;
