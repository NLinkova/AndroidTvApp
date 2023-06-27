import axios from 'axios';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { ActivityIndicator, MD2Colors, Text } from 'react-native-paper';

import LinearGradient from 'react-native-linear-gradient';
import GameCardComponent from '../../components/GameCardComponent';
import { URL_RAWG } from '../../constants/constants';
import { GameCard } from '../../types';

const TVScreen = () => {
  const [data, setData] = useState<GameCard[]>([]);
  const [selectedItem, setSelectedItem] = useState<GameCard>();
  const [hasTVPreferredFocus, setHasTVPreferredFocus] = useState(true);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get(URL_RAWG, {
          params: {
            key: "e04a3e18da124dcf84f91a742beb29a6",
            page: 1,
          },
        });
        setData(response.data.results);
      } catch (error) {
        console.log('Error fetching games:', error);
      }
    };
    fetchGames();
  }, []); // Fetch games whenever the page changes

  // Function to handle selecting an item from the list
  const handleSelectItem = (item: GameCard) => {
    setHasTVPreferredFocus(true)
    setSelectedItem(item);
  };

  // Render an item from the list
  const renderItem = ({ item }: { item: GameCard }) => {
    if (!item) {
      return null;
    }
    return <GameCardComponent item={item} onPress={handleSelectItem} />;
  };

  return (
    <LinearGradient
      colors={['#14063D', '#3806B2']}
      style={styles.gradientContainer}
    >

      <View style={styles.mainContainer}>
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

          </>
        ) : (
          <ActivityIndicator animating={true} color={MD2Colors.red800} />
        )}
        {data.length === 0 && <Text>Нет данных</Text>}
        {selectedItem && hasTVPreferredFocus && (
          <View>
            <Text>Описание:</Text>
            <Text>{selectedItem.name}</Text>
            <Text >Rating: {selectedItem.rating}</Text>
          </View>
        )}
      </View>
    </LinearGradient>
  );
};

export default TVScreen;

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
    paddingTop: 30
  },
  mainContainer: {
    backgroundColor: "transparent",
  },
  scrollViewContainer: {
    paddingHorizontal: 16,
  },
  itemWrapper: {
    marginRight: 16,
  },
});
