import axios from "axios";

import { URL_RAWG } from '../constants/constants';

const fetchGames = async () => {
  try {
    const response = await axios.get(URL_RAWG, {
      params: {
        key: "e04a3e18da124dcf84f91a742beb29a6",
        page: 1,
      },
    });
    console.log('Response:', response);

  } catch (error) {
    console.log('Error fetching games:', error);
  }
};




