type image = {
  url: string;
}

export interface GameCard {
  id: number;
  name: string;
  background_image?: string;
  description: string;
  rating: string
}
