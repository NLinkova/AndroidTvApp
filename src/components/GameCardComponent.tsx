import * as React from 'react';
import { Dimensions, Image, ImageSourcePropType, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { GameCard } from '../types';

interface GameCardProps {
  item: GameCard;
  onPress: (item: GameCard) => void;
}

const { width } = Dimensions.get('window');
const cardWidth = width / 5;

const GameCardComponent: React.FC<GameCardProps> = ({ item, onPress }) => {
  const imageSource: ImageSourcePropType = { uri: item.background_image };

  return (
    <TouchableOpacity onPress={() => onPress(item)} style={styles.gameCardContainer}>
      <View style={styles.cardContent}>
        <Image style={styles.gameImage} source={imageSource} />
        <View style={styles.cardDetails}>
          <Text style={styles.cardTitle}>{item.name}</Text>
          <Text style={styles.cardRating}>Rating: {item.rating}</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Cancel</Text>
        </Pressable>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>OK</Text>
        </Pressable>
      </View>
    </TouchableOpacity>
  );
};

export default GameCardComponent;

const styles = StyleSheet.create({
  gameCardContainer: {
    width: cardWidth,
    alignItems: 'center',
    marginBottom: 16,
  },
  cardContent: {
    borderWidth: 1,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 8,
  },
  gameImage: {
    width: cardWidth,
    height: cardWidth,
  },
  cardDetails: {
    padding: 8,
  },
  cardTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cardRating: {
    fontSize: 10,
    color: 'gray',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    backgroundColor: 'lightgray',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  buttonText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
});
