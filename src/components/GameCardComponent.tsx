import { useCallback, useState } from 'react';
import { Dimensions, Image, ImageSourcePropType, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { GameCard } from '../types';

interface GameCardProps {
  item: GameCard;
  onPress: (item: GameCard) => void;
  hasTVPreferredFocus?: boolean;
  focus?: boolean;
}

const { width } = Dimensions.get('window');
const cardWidth = width / 5;
const cardHeight = cardWidth * 1.3;

const GameCardComponent: React.FC<GameCardProps> = ({ item, onPress }) => {
  const [focus, setFocus] = useState(false);

  const title = item.name

  const onFocus = useCallback(() => {
    setFocus(true);
  }, [title]);


  const onBlur = useCallback(() => {
    setFocus(false);
  }, []);
  const imageSource: ImageSourcePropType = { uri: item.background_image };

  return (
    <TouchableHighlight
      onFocus={onFocus}
      onBlur={onBlur}
      style={[
        styles.gameCardContainer,
        focus ? styles.gameCardContainerFocused : null,
      ]}
      underlayColor="#d2ccf3"
      onPress={() => onPress(item)}
    >
      <View>
        <View style={styles.cardContent}>
          <Image style={styles.gameImage} source={imageSource} />
          <View style={styles.cardDetails}>
            <Text style={styles.cardTitle}>{item.name}</Text>
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );
};

export default GameCardComponent;

const styles = StyleSheet.create({
  gameCardContainer: {
    backgroundColor: '#d2ccf3',
    width: cardWidth,
    height: cardHeight,
    alignItems: 'center',
    borderColor: 'transparent',
    borderWidth: 5,
    borderRadius: 15,
    marginHorizontal: 10,
    marginBottom: 16,
    overflow: 'hidden',
  },
  gameCardContainerFocused: {
    borderColor: 'rgb(179, 36, 131)',
  },
  cardContent: {
    overflow: 'hidden',
    marginBottom: 8,
  },
  gameImage: {
    width: cardWidth,
    height: cardWidth,
    borderRadius: 15,
    borderWidth: 0
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
});
