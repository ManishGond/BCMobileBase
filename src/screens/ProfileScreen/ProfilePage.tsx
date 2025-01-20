import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {removeItem} from '../../utils/asynStorage';
import FontAwesome from 'react-native-vector-icons/FontAwesome'; // Import FontAwesome

const ProfilePage = () => {
  const navigation = useNavigation();
  // Initial profile data
  const initialProfileData = {
    profilePicture: require('../../../assets/images/account.png'), // Example path
    employeeId: 'E12345',
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe@example.com',
    phone: '+1234567890',
    company: 'Example Corp',
  };

  const [profileData, setProfileData] = useState(initialProfileData);
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    // Load profile data from AsyncStorage when the component mounts
    const loadProfileData = async () => {
      try {
        const storedData = await AsyncStorage.getItem('profileData');
        if (storedData) {
          setProfileData(JSON.parse(storedData));
        }
      } catch (error) {
        console.log('Error loading profile data', error);
      }
    };

    loadProfileData();
  }, []);

  const handleSaveAndClose = async () => {
    // Validate if any field is empty
    const {firstName, lastName, email, phone} = profileData;
    const newErrors: any = {};

    if (!firstName) newErrors.firstName = 'First Name cannot be empty';
    if (!lastName) newErrors.lastName = 'Last Name cannot be empty';
    if (!email) newErrors.email = 'Email cannot be empty';
    if (!phone) newErrors.phone = 'Phone Number cannot be empty';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      // Save updated profile data to AsyncStorage
      await AsyncStorage.setItem('profileData', JSON.stringify(profileData));
      Alert.alert('Success', 'Profile saved successfully');
      navigation.goBack(); // Go back to the previous screen (LandingPage)
    } catch (error) {
      console.log('Error saving profile data', error);
      Alert.alert('Error', 'Failed to save profile data');
    }
  };

  const handleChangeCompany = () => {
    console.log('Change Company pressed');
    // Logic to handle company change
  };

  const handleChangePassword = () => {
    console.log('Change Password pressed');
    // Logic to handle password change
  };

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prevState => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleLogout = async () => {
    try {
      // Remove the loggedIn item from AsyncStorage
      await removeItem('loggedIn');
      // Navigate to the Onboarding page after logout
      navigation.reset({
        index: 0,
        routes: [{name: 'Login'}],
      });
      Alert.alert('Success', 'You have logged out.');
    } catch (error) {
      console.log('Error logging out: ', error);
      Alert.alert('Error', 'Failed to log out.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileHeader}>
        <Image
          source={profileData.profilePicture}
          style={styles.profilePicture}
        />
        <Text
          style={
            styles.profileName
          }>{`${profileData.firstName} ${profileData.lastName}`}</Text>
      </View>

      <View style={styles.profileDetails}>
        {/* Employee ID */}
        <View style={styles.inputContainer}>
          <Text style={styles.placeholder}>Employee ID #</Text>
          <TextInput
            style={styles.inputField}
            placeholder="Employee ID"
            value={profileData.employeeId}
            editable={false} // Employee ID is non-editable
          />
        </View>

        {/* First Name */}
        <View style={styles.inputContainer}>
          <Text style={styles.placeholder}>First Name</Text>
          <TextInput
            style={styles.inputField}
            placeholder="First Name"
            value={profileData.firstName}
            onChangeText={value => handleInputChange('firstName', value)}
          />
          {errors.firstName && (
            <Text style={styles.errorText}>{errors.firstName}</Text>
          )}
        </View>

        {/* Last Name */}
        <View style={styles.inputContainer}>
          <Text style={styles.placeholder}>Last Name</Text>
          <TextInput
            style={styles.inputField}
            placeholder="Last Name"
            value={profileData.lastName}
            onChangeText={value => handleInputChange('lastName', value)}
          />
          {errors.lastName && (
            <Text style={styles.errorText}>{errors.lastName}</Text>
          )}
        </View>

        {/* Email */}
        <View style={styles.inputContainer}>
          <Text style={styles.placeholder}>Email</Text>
          <TextInput
            style={styles.inputField}
            placeholder="Email"
            value={profileData.email}
            onChangeText={value => handleInputChange('email', value)}
          />
          {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
        </View>

        {/* Phone */}
        <View style={styles.inputContainer}>
          <Text style={styles.placeholder}>Phone</Text>
          <TextInput
            style={styles.inputField}
            placeholder="Phone"
            value={profileData.phone}
            onChangeText={value => handleInputChange('phone', value)}
          />
          {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}
        </View>

        {/* Company */}
        <View style={styles.companyContainer}>
          <Text style={styles.detailText}>Company: {profileData.company}</Text>
          <TouchableOpacity
            onPress={handleChangeCompany}
            style={styles.changeButton}>
            <Text style={styles.changeButtonText}>Change</Text>
          </TouchableOpacity>
        </View>

        {/* Change Password */}
        <TouchableOpacity
          onPress={handleChangePassword}
          style={styles.changePasswordButton}>
          <Text style={styles.changePasswordButtonText}>Change Password</Text>
        </TouchableOpacity>

        {/* Save & Close Button */}
        <TouchableOpacity
          onPress={handleSaveAndClose}
          style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save & Close</Text>
        </TouchableOpacity>
      </View>

      {/* Logout Icon */}
      <TouchableOpacity onPress={handleLogout} style={styles.logoutIcon}>
        <FontAwesome name="sign-out" size={30} color="#000" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ProfilePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  profileDetails: {
    marginTop: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  placeholder: {
    fontSize: 14,
    color: '#888',
  },
  inputField: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
  companyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  detailText: {
    fontSize: 16,
    marginBottom: 10,
  },
  changeButton: {
    marginLeft: 10,
    padding: 5,
    backgroundColor: '#29828e',
    borderRadius: 5,
  },
  changeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  changePasswordButton: {
    padding: 10,
    backgroundColor: '#f39c12',
    borderRadius: 5,
  },
  changePasswordButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  saveButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#29828e',
    borderRadius: 5,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  logoutIcon: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
});
