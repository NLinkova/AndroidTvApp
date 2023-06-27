import axios from 'axios';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { ActivityIndicator, MD2Colors, Text } from 'react-native-paper';

import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import GameCardComponent from '../../components/GameCardComponent';
import { RAWG_API_KEY, URL_RAWG } from '../../constants/constants';
import { GameCard } from '../../types';

const TVScreen = () => {
  const [data, setData] = useState<GameCard[]>([]);
  const [selectedItem, setSelectedItem] = useState<GameCard>();
  const [focus, setFocus] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get(URL_RAWG, {
          params: {
            key: RAWG_API_KEY,
            page: 1,
          },
        });
        setData(response.data.results);
      } catch (error) {
        console.log('Error fetching games:', error);
      }
    };
    fetchGames();
  }, []);


  const handleBlurItem = () => {
    setSelectedItem(undefined);
    setFocus(false);
  };

  const handleSelectItem = (item: GameCard) => {
    navigation.navigate('GameScreen', { game: item });
  };

  const renderItem = ({ item }: { item: GameCard }) => {
    if (!item) {
      return null;
    }
    return (
      <GameCardComponent
        item={item}
        onPress={handleSelectItem}
        focus={focus}
        onFocus={() => setSelectedItem(item)}
        onBlur={handleBlurItem}
      />
    );
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
            {selectedItem && (
              <View style={styles.descriptionContainer}>
                <Text style={styles.descriptionText}>Описание:</Text>
                <Text style={styles.descriptionText}>{selectedItem.name}</Text>
                <Text style={styles.descriptionText}>Rating: {selectedItem.rating}</Text>
              </View>
            )}
          </>
        ) : (
          <ActivityIndicator animating={true} color={MD2Colors.red800} />
        )}
        {data.length === 0 && <Text>Нет данных</Text>}
      </View>
    </LinearGradient>
  );
};

export default TVScreen;

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
    paddingTop: 30,
  },
  mainContainer: {
    backgroundColor: 'transparent',
  },
  scrollViewContainer: {
    paddingHorizontal: 16,
  },
  itemWrapper: {
    marginRight: 16,
  },
  descriptionContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  descriptionText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
