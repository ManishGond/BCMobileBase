import React, {useState} from 'react';
import {
  StyleSheet,
  TextInput,
  FlatList,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [filteredOptions, setFilteredOptions] = useState<string[]>([]); // Add explicit type
  const allOptions = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];

  const handleSearch = (text: string) => {
    setQuery(text);
    setFilteredOptions(
      allOptions.filter(option =>
        option.toLowerCase().includes(text.toLowerCase()),
      ),
    );
  };

  return (
    <View style={styles.container}>
      {/* Top Bar with Search Input */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => console.log('Back pressed')}>
          <FontAwesome name="arrow-left" size={20} color={'#888'} />
        </TouchableOpacity>
        <TextInput
          style={styles.searchInput}
          placeholder="Search options"
          placeholderTextColor={'black'}
          value={query}
          onChangeText={handleSearch}
        />
      </View>

      {/* Filtered Options List */}
      <FlatList
        data={filteredOptions}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <View style={styles.option}>
            <Text>{item}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default SearchPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f5f5f5',
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
    padding: 10,
    color: 'black',
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
  },
  option: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
});
