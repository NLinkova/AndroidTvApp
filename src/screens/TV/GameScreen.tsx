import { RouteProp } from '@react-navigation/native';
import React from 'react';
import { Dimensions, Image, ImageSourcePropType, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { StackParams } from '../../App';

type GameScreenRouteProp = RouteProp<StackParams, 'GameScreen'>;

type GameScreenProps = {
  route: GameScreenRouteProp
};

const { width } = Dimensions.get('window');
const cardWidth = width / 3;

const GameScreen: React.FC<GameScreenProps> = ({ route }: GameScreenProps) => {
  const { game } = route.params;
  const imageSource: ImageSourcePropType = { uri: game.background_image };

  return (
    <LinearGradient
      colors={['#14063D', '#3806B2']}
      style={styles.gradientContainer}
    >
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image style={styles.gameImage} source={imageSource} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{game.name}</Text>
          <Text style={styles.rating}>Rating: {game.rating}</Text>
          <Text style={styles.description}>Любое подробное описание. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id semper felis. Mauris malesuada sem ac commodo efficitur. In hac habitasse platea dictumst. Sed vulputate justo non dui placerat, eget luctus sem eleifend. Phasellus ultrices blandit velit, et efficitur mauris congue id. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;</Text>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    padding: 16,
  },
  imageContainer: {
    marginRight: 30,
  },
  gameImage: {
    width: cardWidth,
    height: cardWidth,
    borderRadius: 15,
    borderWidth: 0
  },
  textContainer: {
    width: '60%',
    alignItems: "flex-start",
    justifyContent: "flex-start"
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#FFF',
  },
  rating: {
    marginVertical: 36,
    color: '#FFF',
    fontSize: 26,
  },
  description: {
    color: '#FFF',
    fontSize: 16,
  }
});

export default GameScreen;
