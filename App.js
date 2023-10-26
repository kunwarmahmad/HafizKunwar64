import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, Image, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ChaptersScreen from './component/ChaptersScreen'; // Import the ChaptersScreen component

const BASE_URL = 'http://139.59.177.72/';

const App = ({ navigation }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    axios
      .get('http://139.59.177.72/api/books?page=1')
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false); // Fix the missing parentheses here
      });
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View>
      <View style={{ alignItems: 'center', height: 40, marginTop: 50 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Featured</Text>
      </View>

      <TextInput
        style={styles.searchInput}
        placeholder="Search"
        onChangeText={(text) => setSearchQuery(text)}
        value={searchQuery}
      />

      <FlatList
        data={books}
        keyExtractor={(item) => item._id}
        numColumns={3}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => navigation.navigate('Chapters', { bookId: item._id })}
          >
            <Image
              source={{ uri: BASE_URL + item.coverPhotoUri }}
              style={styles.coverImage}
            />
            <Text style={styles.title}>Title: {item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const Stack = createStackNavigator();

const AppWithNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen name="Home" component={App} />
        <Stack.Screen name="Chapters" component={ChaptersScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContainer: {
    flexDirection: 'column',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  coverImage: {
    width: 100,
    height: 100,
    marginBottom: 16,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginTop: 10,
    marginHorizontal: 30,
    borderRadius: 10,
  },
});

export default AppWithNavigation;
