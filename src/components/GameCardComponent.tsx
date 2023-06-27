import * as React from 'react';
import { Dimensions, Image, ImageSourcePropType, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { } from 'react-native-paper';
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
    <TouchableOpacity onPress={() => onPress(item)}>
      <View>
        <Text>{item.name}</Text>
        <View>
          <Text>{item.rating}</Text>
        </View>
        <Image style={styles.gameImage} source={imageSource} />
        <View>
          <Pressable>
            <Text>Cancel</Text>
          </Pressable>
          <Pressable>
            <Text>OK</Text>
          </Pressable>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default GameCardComponent;

const styles = StyleSheet.create({
  gameCardCntainer: {
    width: cardWidth,
    alignItems: 'center',
  },
  gameImage: {
    width: cardWidth,
    height: cardWidth,
  },
})