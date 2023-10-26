import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const ApiComponent = () => {
  const [apiResponse, setApiResponse] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const getApiData = async () => {
      const apiUrl = 'http://139.59.177.72/api/books?page=1';

      try {
        const response = await axios.get(apiUrl);
        setApiResponse(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getApiData();
  }, []);

  return (
    <View>
      <Text style={{ marginTop: 20 }}>This is the text</Text>
      <FlatList
        data={apiResponse}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigateToChapterList(item.chapters)}>
            <View style={{ flex: 1, flexDirection: 'row', marginTop: 20 }}>
              <Text>{item.category.name}</Text>
              <Image
                source={{ uri: `http://139.59.177.72/${item.coverPhotoUri}` }}
                style={{ width: 200, height: 200 }}
              />
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );

  function navigateToChapterList(chapters) {
    navigation.navigate('ChapterList', { chapters });
  }
};

export default ApiComponent;
