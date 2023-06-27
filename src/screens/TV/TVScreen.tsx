import axios from 'axios';

import { useEffect, useState } from 'react';
import { Image, ImageSourcePropType, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ActivityIndicator, MD2Colors, Text } from 'react-native-paper';

import { URL_RAWG } from '../../constants/constants';
import { GameCard } from '../../types';




const TVScreen = () => {

  const [data, setData] = useState<GameCard[]>([]);

  const [selectedItem, setSelectedItem] = useState<GameCard>();

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get(URL_RAWG, {
          params: {
            key: RAWG_API_KEY,
          },
        });
        setData(response.data.results);
      } catch (error) {
        console.log('Error fetching games:', error);
      }
    };

    fetchGames();
  }, []);




  // Функция для обработки выбора элемента списка
  const handleSelectItem = (item: GameCard) => {
    setSelectedItem(item);
  };


  // Отрисовка элемента списка
  const renderItem = ({ item }: { item: GameCard }) => {
    if (!item) {
      return null;
    }
    const imageSource: ImageSourcePropType = { uri: item.background_image };

    return (

      <TouchableOpacity onPress={() => handleSelectItem(item)}>
        <View>
          <Image source={imageSource} />
          <Text>{item.name}</Text>
          <Text>{item.description}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <View>
      {data ? (
        <ScrollView horizontal={true} contentContainerStyle={styles.scrollViewContainer}>
          {data.map((item) => (
            <View key={item.id} style={styles.itemWrapper}>
              {renderItem({ item })}
            </View>
          ))}
        </ScrollView>) : (
        <ActivityIndicator animating={true} color={MD2Colors.red800} />
      )
      }
      {data.length === 0 && (
        <Text>Нет данных</Text>
      )}

      {selectedItem && (
        <View>
          <Text>Подробная информация:</Text>
          <Text>{selectedItem.name}</Text>
        </View>
      )}
    </View>
  );


};

export default TVScreen;

const styles = StyleSheet.create({
  scrollViewContainer: {
    paddingHorizontal: 16,
  },
  itemWrapper: {
    marginRight: 16,
  },
  itemContainer: {
    marginBottom: 8,
  },
  itemImage: {
    width: 150,
    height: 200,
    resizeMode: 'cover',
  },
});