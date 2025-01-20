import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import React from 'react';

// Function to get a random color
const getRandomColor = () => {
  const colors = ['#000000', '#29828e']; // Black and light blue
  return colors[Math.floor(Math.random() * colors.length)];
};

const HomePage = () => {
  const options = [
    {
      title: 'Sales Order',
      image: require('../../../assets/images/sales-order.png'),
    },
    {
      title: 'Purchase Order',
      image: require('../../../assets/images/purchase-order.png'),
    },
    {title: 'Items', image: require('../../../assets/images/items.png')},
    {
      title: 'Containers',
      image: require('../../../assets/images/container.png'),
    },
    {
      title: 'Warehouse Entries',
      image: require('../../../assets/images/warehouse.png'),
    },
    {title: 'Settings', image: require('../../../assets/images/settings.png')},
    {title: 'Accounts', image: require('../../../assets/images/account.png')},
    {
      title: 'Companies',
      image: require('../../../assets/images/companies.png'),
    },
    {title: 'Customers', image: require('../../../assets/images/customer.png')},
    {
      title: 'Bank Accounts',
      image: require('../../../assets/images/bank-accounts.png'),
    },
  ];

  const handleCardPress = (option: string) => {
    console.log(`${option} pressed`);
    // Add navigation or functionality here when a card is pressed
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            onPress={() => handleCardPress(option.title)}>
            <Image
              source={option.image}
              style={[styles.cardImage, {tintColor: getRandomColor()}]} // Apply random color tint
            />
            <Text style={styles.cardText}>{option.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    width: '100%',
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 20,
    padding: 10,
  },
  scrollContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  card: {
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    width: 150, // Fixed width for square
    height: 150, // Fixed height for square
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardImage: {
    width: 60, // Adjust size of the image as needed
    height: 60, // Adjust size of the image as needed
    marginBottom: 10, // Add space between image and text
  },
  cardText: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#333',
  },
});
