import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import {setUser} from '../app/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleAuth = async () => {
    const body = isLogin ? {email, password} : {email, password, name};
    const url = isLogin ? '/api/v1/login' : '/api/v1/register';

    console.log('body', body);
    console.log('url', url);
    try {
      const response = await axios.post(
        `http://192.168.102.29:8000${url}`,
        body,
        {
          headers: {'Content-Type': 'application/json'},
        },
      );
      console.log('response', response.data);
      const {token, user} = response.data;

      const authData = {token, user};
      console.log('authData', authData);
      dispatch(setUser(authData));

      await AsyncStorage.setItem('auth', JSON.stringify(authData));
      navigation.navigate('Profile');
    } catch (error) {
      console.log('Error in Auth', error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.loginTitle}>{isLogin ? 'Log In' : 'Sign Up'}</Text>

        {!isLogin && (
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            value={name}
            placeholderTextColor="#999"
            onChangeText={setName}
          />
        )}

        <TextInput
          style={styles.input}
          placeholder="Email Address"
          value={email}
          onChangeText={setEmail}
          placeholderTextColor="#999"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          placeholderTextColor="#999"
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity onPress={handleAuth} style={styles.button}>
          <Text style={styles.buttonText}>
            {isLogin ? 'Log In' : 'Sign Up'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
          <Text style={styles.switchText}>
            {/* {isLogin ? 'Already have an account? Login' : 'New user? Register'} */}
            {isLogin ? 'New user? Register' : 'Already have an account? Login'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  scrollContainer: {
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
  },
  loginTitle: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 24,
    color: '#333',
  },
  input: {
    width: '100%',
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    // backgroundColor: 'white',
    fontSize: 16,
  },
  button: {
    width: '100%',
    padding: 14,
    backgroundColor: 'red',
    borderRadius: 50,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  switchText: {
    marginTop: 16,
    color: '#1E90FF',
    fontSize: 14,
  },
});
