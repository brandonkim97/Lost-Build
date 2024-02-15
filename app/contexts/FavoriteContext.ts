import React, { createContext } from 'react';
import { Favorites } from '../types';



const FavoriteContext = createContext<Favorites>({
    accessory: {
        necklace: null,
        earrings: [],
        rings: [],
    },
    book: [],
    stone: null,
});

export default FavoriteContext;
