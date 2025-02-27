import AsyncStorage from '@react-native-async-storage/async-storage';

export const setItem = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.log('Error storing value: ', error);
  }
};

export const getItem = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : null; // Parse back to original type
  } catch (error) {
    console.log('Error retrieving value: ', error);
  }
};

export const removeItem = async key => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log('Error deleting value: ', error);
  }
};
