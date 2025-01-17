import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {removeItem, setItem} from '../../utils/asynStorage';
import {RootStackParamList} from '../../../App';

type LoginPageNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const LoginPage = () => {
  const navigation = useNavigation<LoginPageNavigationProp>();

  const handleLogin = async () => {
    await setItem('loggedIn', true);
    navigation.reset({
      index: 0,
      routes: [{name: 'Landing'}],
    });
  };

  const handleSignupRedirect = () => {
    navigation.navigate('Signup');
  };

  const handleBackToOnboarding = async () => {
    await removeItem('goToLogin');
    navigation.reset({
      index: 0,
      routes: [{name: 'Onboarding'}],
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={handleBackToOnboarding}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={'black'}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        placeholderTextColor={'black'}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSignupRedirect}>
        <Text style={styles.link}>Don't have an account? Sign up</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  backButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: '#34d399',
    padding: 10,
    borderRadius: 5,
  },
  title: {fontSize: 24, marginBottom: 20, fontWeight: 'bold'},
  input: {
    width: '100%',
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#34d399',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {color: '#fff', fontWeight: 'bold'},
  link: {marginTop: 20, color: '#007bff', textDecorationLine: 'underline'},
});
