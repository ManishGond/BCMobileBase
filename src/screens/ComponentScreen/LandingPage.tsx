import React, {useRef, useState} from 'react';
import {
  Animated,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import HomePage from '../HomeScreen/HomePage';
import {RootStackParamList} from '../../../App';

type OnboardingScreenNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

const LandingPage = () => {
  const navigation = useNavigation<OnboardingScreenNavigationProp>();
  const [isSearchActive, setSearchActive] = useState(false);
  const [searchText, setSearchText] = useState(''); // State to track search input
  const searchWidthAnim = useRef(new Animated.Value(40)).current; // Initial width for the icon

  const handleSearchPress = () => {
    if (!isSearchActive) {
      setSearchActive(true);
      Animated.timing(searchWidthAnim, {
        toValue: 300, // Expanded width
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  const handleSearchClose = () => {
    if (searchText.trim() === '') {
      // If input is empty, collapse the search bar without navigation
      setSearchActive(false);
      Animated.timing(searchWidthAnim, {
        toValue: 40, // Collapse back to initial width
        duration: 300,
        useNativeDriver: false,
      }).start();
      return;
    }

    // Navigate to SearchPage if input is not empty
    setSearchActive(false);
    Animated.timing(searchWidthAnim, {
      toValue: 40,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      navigation.navigate('Search', {query: searchText.trim()}); // Pass query as parameter
    });
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

        {/* Conditionally Render Title and Logo */}
        {!isSearchActive && (
          <View style={styles.headerTitleContainer}>
            <Image
              source={require('../../../assets/images/business-central-logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.headerTitle}>BCMobile</Text>
          </View>
        )}

        <Animated.View
          style={[
            styles.searchContainer,
            {
              width: searchWidthAnim,
              backgroundColor: isSearchActive ? '#e0e0e0' : 'transparent',
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
              value={searchText}
              onChangeText={setSearchText} // Update searchText state
              returnKeyType="done"
              onSubmitEditing={handleSearchClose} // Close on "Done" or "Tick"
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
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1, // Center-align the title container
  },
  logo: {
    width: 30, // Adjust size as needed
    height: 30,
    marginRight: 8, // Spacing between the logo and title
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#000',
    fontFamily: 'Roboto-Bold',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#b8e8ed',
    elevation: 2,
    shadowColor: '#000',
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
    overflow: 'hidden',
  },
  searchIcon: {
    marginLeft: 10,
    color: 'black',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    paddingHorizontal: 10,
  },
  body: {
    flex: 1,
    backgroundColor: '#29828e',
    paddingHorizontal: 10,
  },
});
