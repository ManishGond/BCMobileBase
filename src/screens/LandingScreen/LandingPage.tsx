import {
  Animated,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../../App';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import HomePage from '../HomeScreen/HomePage';

type OnboardingScreenNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

const LandingPage = () => {
  const navigation = useNavigation<OnboardingScreenNavigationProp>();
  const [isSearchActive, setSearchActive] = useState(false);
  const searchWidthAnim = useRef(new Animated.Value(40)).current; // Initial width for the icon

  const handleSearchPress = () => {
    if (!isSearchActive) {
      setSearchActive(true);
      Animated.timing(searchWidthAnim, {
        toValue: 250, // Expanded width
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  const handleSearchClose = () => {
    setSearchActive(false);
    Animated.timing(searchWidthAnim, {
      toValue: 40, // Collapse back to initial width
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => console.log('Profile pressed')}
          style={styles.profile}>
          <FontAwesome name="user-circle" size={30} color={'#000'} />
        </TouchableOpacity>
        <Animated.View
          style={[
            styles.searchContainer,
            {
              width: searchWidthAnim,
              backgroundColor: isSearchActive ? '#e0e0e0' : 'transparent', // Change background dynamically
            },
          ]}>
          <TouchableOpacity onPress={handleSearchPress}>
            <FontAwesome
              name="search"
              size={20}
              color={'#888'}
              style={styles.searchIcon}
            />
          </TouchableOpacity>
          {isSearchActive && (
            <TextInput
              style={styles.searchInput}
              placeholder="Search"
              placeholderTextColor="#888"
              autoFocus
              onBlur={handleSearchClose} // Collapse when input loses focus
            />
          )}
        </Animated.View>
      </View>

      {/* Body Section */}
      <View style={styles.body}>
        <HomePage />
      </View>
    </SafeAreaView>
  );
};

export default LandingPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    elevation: 2, // For shadow on Android
    shadowColor: '#000', // For shadow on iOS
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  profile: {
    padding: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    height: 40,
    overflow: 'hidden', // Ensure the search bar respects its animated bounds
  },
  searchIcon: {
    marginLeft: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    paddingHorizontal: 10,
  },
  body: {
    flex: 1,
    marginTop: 10,
    paddingHorizontal: 10,
  },
});
