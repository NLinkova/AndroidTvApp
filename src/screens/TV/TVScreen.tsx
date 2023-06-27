import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Text } from 'react-native-paper';
import GameCardComponent from '../../components/GameCardComponent';
import { RAWG_API_KEY, URL_RAWG } from '../../constants/constants';
import { GameCard } from '../../types';

const TVScreen = () => {
  const [data, setData] = useState<GameCard[]>([]);
  const [selectedItem, setSelectedItem] = useState<GameCard | undefined>(undefined);
  const [focusedItem, setFocusedItem] = useState<GameCard | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
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
        setLoading(false);
      } catch (error) {
        console.log('Error fetching games:', error);
        setLoading(false);
      }
    };
    fetchGames();
  }, []);

  const handleBlurItem = () => {
    setFocusedItem(undefined);
  };

  const handleFocusItem = (item: GameCard) => {
    setFocusedItem(item);
  };

  const handleSelectItem = (item: GameCard) => {
    setSelectedItem(item);
    navigation.navigate('GameScreen', { game: item });
  };

  const renderItem = ({ item }: { item: GameCard }) => {
    return (
      <GameCardComponent
        item={item}
        onPress={handleSelectItem}
        focus={selectedItem === item} // Pass the focus prop here
        onFocus={() => handleFocusItem(item)}
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
        {loading ? (
          <ActivityIndicator animating={true} color="#FFF" />
        ) : data.length > 0 ? (
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
            {focusedItem ? (
              <View style={styles.descriptionContainer}>
                <Text style={styles.descriptionTitle}>Описание:</Text>
                <Text style={styles.descriptionText}>Название: {focusedItem.name}</Text>
                <Text style={styles.descriptionText}>Rating: {focusedItem.rating}</Text>
              </View>
            ) : null}
          </>
        ) : (
          <Text style={styles.noDataText}>Нет данных</Text>
        )}
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
    alignItems: 'flex-start',
  },
  descriptionTitle: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  descriptionText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  noDataText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 20,
  },
});
