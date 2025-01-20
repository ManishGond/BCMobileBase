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
      <Text style={styles.title}>Register</Text>
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
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleLoginRedirect}
        style={{flexDirection: 'row', marginTop: 20}}>
        <Text>Already have an account? </Text>
        <Text style={styles.link}>Log In</Text>
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
    backgroundColor: '#29828e',
    padding: 15,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {color: '#fff', fontWeight: 'bold'},
  link: {color: '#007bff', textDecorationLine: 'underline', fontWeight: 'bold'},
});
