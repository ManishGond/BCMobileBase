import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {removeItem} from '../../utils/asynStorage';
import {RootStackParamList} from '../../../App';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

const {width} = Dimensions.get('window');

type OnboardingScreenNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

const LandingPage = () => {
  const navigation = useNavigation<OnboardingScreenNavigationProp>();
  const handleLogout = async () => {
    try {
      await removeItem('onboarded');
      console.log('Logged out!');
      navigation.reset({
        index: 0,
        routes: [{name: 'Onboarding'}],
      });
    } catch (error) {
      console.log('Error logging out: ', error);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={{fontSize: width * 0.09, marginBottom: 20}}>Land Ho!</Text>
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default LandingPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: width * 0.9,
    alignItems: 'center',
  },
  logoutButton: {
    backgroundColor: '#34d399',
    padding: 10,
    borderRadius: 10,
  },
});
