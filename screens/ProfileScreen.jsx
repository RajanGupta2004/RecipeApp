import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
const ProfileScreen = () => {
  const navigation = useNavigation();
  const user = false;

  if (user) {
    return (
      <SafeAreaView>
        <View>
          <Text>Profile:</Text>
          <Text>Name:</Text>
          <TouchableOpacity>
            <Text>Logout</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Image
          style={styles.emoji}
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/128/9481/9481394.png',
          }}
        />
        <Text style={styles.title}>
          Log in or create an account to save your favourite recipes
        </Text>

        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
          style={styles.signInButton}>
          <Text style={styles.signText}>Sign In</Text>
        </TouchableOpacity>
        <Text style={styles.terms}>
          By signing up, you are agreeing to our{' '}
          <Text style={styles.link}>User Agreement</Text> and
          <Text style={styles.link}> Privacy Policy</Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emoji: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    lineHeight: 30,
  },
  signInButton: {
    paddingHorizontal: 30,
    paddingVertical: 8,
    backgroundColor: 'red',
    borderRadius: 20,
    marginVertical: 10,
    marginTop: 30,
  },
  signText: {
    color: 'white',
    fontWeight: '500',
  },
  terms: {
    textAlign: 'center',
    lineHeight: 30,
    color: '#666',
  },
  link: {
    color: 'red',
  },
});
