import * as React from 'react';
import { ImageSourcePropType, TouchableOpacity } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';
import { GameCard } from '../types';

interface GameCardProps {
  item: GameCard;
  onPress: (item: GameCard) => void;
}

const GameCard: React.FC<GameCardProps> = ({ item, onPress }) => {
  const imageSource: ImageSourcePropType = { uri: item.image.url };
  return (
    <TouchableOpacity onPress={() => onPress(item)}>
      <Card>
        <Card.Title title="Card Title" subtitle="Card Subtitle" />
        <Card.Content>
          <Text variant="titleLarge">Card title</Text>
          <Text variant="bodyMedium">Card content</Text>
        </Card.Content>
        <Card.Cover source={imageSource} />
        <Card.Actions>
          <Button>Cancel</Button>
          <Button>Ok</Button>
        </Card.Actions>
      </Card>
    </TouchableOpacity>
  );
}

export default GameCard;