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
import {setItem} from '../../utils/asynStorage';
import {RootStackParamList} from '../../../App';

type SignupPageNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const SignupPage = () => {
  const navigation = useNavigation<SignupPageNavigationProp>();

  const handleSignup = async () => {
    await setItem('loggedIn', true);
    navigation.reset({
      index: 0,
      routes: [{name: 'Landing'}],
    });
  };

  const handleLoginRedirect = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Signup</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        keyboardType="default"
        placeholderTextColor={'black'}
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        keyboardType="default"
        placeholderTextColor={'black'}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        placeholderTextColor={'black'}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        placeholderTextColor={'black'}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry
        placeholderTextColor={'black'}
      />
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Signup</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleLoginRedirect}>
        <Text style={styles.link}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignupPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
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
