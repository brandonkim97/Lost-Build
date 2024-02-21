import { AbilityStone, Accessory, Book, Favorites } from "../types";

const updateFavorites = (
    favorites: Favorites | null, 
    updatedItem: Accessory | AbilityStone | Book,
    type: 'NECKLACE' | 'EARRING' | 'RING' | 'STONE' | 'BOOK'
) => {
    console.log(updatedItem)
    if (favorites === null) return;
    if (type === 'NECKLACE') { //necklace
        if (favorites.accessory.necklace !== null &&
            favorites.accessory.necklace.uid === updatedItem.uid
        ) {
            console.log('updating necklace!')
            favorites.accessory.necklace = updatedItem as Accessory;
        }
    } else if (type === 'EARRING') { //earring
        favorites.accessory.earrings.forEach((item, index, array) => {
            if (item.uid === updatedItem.uid) {
                array[index] = updatedItem as Accessory;
                return;
            }
        });
    } else if (type === 'RING') { //ring
        favorites.accessory.rings.forEach((item, index, array) => {
            if (item.uid === updatedItem.uid) {
                array[index] = updatedItem as Accessory;
                return;
            }
        });
    } else if (type === 'STONE') { //stone
        if (favorites.stone !== null && 
                favorites.stone.uid === updatedItem.uid
        ) {
            favorites.stone = updatedItem as AbilityStone;
        }
    } else { //book
        favorites.book.forEach((item, index, array) => {
            if (item.uid === updatedItem.uid) {
                array[index] = updatedItem as Book;
                return;
            }
        });
    }
    return favorites;
}

export default updateFavorites;