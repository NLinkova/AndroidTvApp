import axios from 'axios';

import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { ActivityIndicator, MD2Colors, Text } from 'react-native-paper';

import GameCardComponent from '../../components/GameCardComponent';
import { URL_RAWG } from '../../constants/constants';
import { GameCard } from '../../types';



const TVScreen = () => {

  const [data, setData] = useState<GameCard[]>([]);

  const [selectedItem, setSelectedItem] = useState<GameCard>();
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get(URL_RAWG, {
          params: {
            key: "e04a3e18da124dcf84f91a742beb29a6",
            page: page,
          },
        });
        setData(response.data.results);
      } catch (error) {
        console.log('Error fetching games:', error);
      }
    };

    fetchGames();
  }, [page]);




  // Функция для обработки выбора элемента списка
  const handleSelectItem = (item: GameCard) => {
    setSelectedItem(item);
  };


  // Отрисовка элемента списка
  const renderItem = ({ item }: { item: GameCard }) => {
    if (!item) {
      return null;
    }
    return (
      <GameCardComponent item={item} onPress={handleSelectItem} />
    )
  }

  return (
    <View>
      {data ? (
        <>
          <ScrollView
            horizontal={true}
            contentContainerStyle={styles.scrollViewContainer}
          >
            {data.map((item) => (
              <View key={item.id} style={styles.itemWrapper}>
                {renderItem({ item })}
              </View>
            ))}
          </ScrollView>
          <View style={styles.pageNavigation}>
            <Text style={styles.pageText}>Page: {page}</Text>
            <View style={styles.horizontalLine} />
            {page >= 2 && <Text
              style={styles.pageButton}
              onPress={() => setPage(page - 1)}
            >
              Previous Page
            </Text>}
            <Text
              style={styles.pageButton}
              onPress={() => setPage(page + 1)}
            >
              Next Page
            </Text>
          </View>
        </>) : (
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
  pageNavigation: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
    paddingHorizontal: 16,
  },
  pageText: {
    marginRight: 8,
  },
  horizontalLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'black',
    marginHorizontal: 8,
  },
  pageButton: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});