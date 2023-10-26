import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, Image, StyleSheet } from 'react-native';
import axios from 'axios';

const BASE_URL = 'http://139.59.177.72/';

const ChaptersScreen = () => {
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the list of chapters from the provided API
    axios
      .get(`${BASE_URL}api/books?page=1`)
      .then((response) => {
        const data = response.data.data[0]; // Assuming chapters are in the first book's data
        if (data && data.chapters) {
          setChapters(data.chapters);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching chapters:', error);
        setLoading(false);
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
    <View style={styles.container}>
      <Text style={styles.header}>List of Chapters</Text>
      <FlatList
        data={chapters}
        keyExtractor={(item, index) => `${index}`}
        renderItem={({ item }) => (
          <View style={styles.chapterItem}>
            <Text style={styles.chapterTitle}>{item}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  chapterItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  chapterTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ChaptersScreen;
