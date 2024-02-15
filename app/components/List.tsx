'use client';
import { Box, Flex, Grid, GridItem, Image, Text, useToast } from "@chakra-ui/react"
import { ScrollArea } from "@/components/ui/scroll-area";
import React, { Suspense, useContext } from "react";
import { AbilityStone, Accessory, Book, Favorites } from "../types";
import { Card } from "@/components/ui/card";
import PuffLoader from "react-spinners/PuffLoader";

const LazyListContent = React.lazy(() => import('./ListContent'));

interface IParams {
    data: Accessory[] | Book[] | AbilityStone[];
    setItemData: (e: any) => void;
    setFavorite: (e: any) => void;
    type: 'accessory' | 'book' | 'stone';
}

const List: React.FC<IParams> = ({
    data,
    setItemData,
    setFavorite,
    type,
}) => {
    const toast = useToast();

    const handleFavorites = (idx: number, type: string, item: Accessory | Book | AbilityStone) => {
        const existingObjectString = localStorage.getItem('favorites');
        let existingObject: Favorites = existingObjectString ? JSON.parse(existingObjectString) : {
            accessory: {
                necklace: null,
                earrings: [],
                rings: [],
              },
              book: [],
              stone: null,
        };

        //update
        const res = update(existingObject, idx, type, item);
        if (!res.success) {
            toast({
                title: res.message,
                status: 'error',
                isClosable: true,
              })
            return;
        }

        // Store the updated array back in local storage
        localStorage.setItem('favorites', JSON.stringify(existingObject));
        setFavorite(existingObject);
    }

    return (
        <Card>
            <ScrollArea className='border rounded p-3 h-[500px] mt-4'>
                <Suspense fallback={<Loading /> }>
                    <LazyListContent data={data} setItemData={setItemData} handleFavorites={handleFavorites} type={type} />
                </Suspense>
            </ScrollArea>
        </Card>
    )
}

const update = (arr: Favorites, idx: number, type: string, item: Accessory | Book | AbilityStone) => {
    switch(type) {
        case 'NECKLACE':
            if (arr.accessory.necklace !== null) { //favorite already exists
                if (arr.accessory.necklace.uid === item.uid) { //unfavorite/toggle
                    arr.accessory.necklace = null;
                    return {
                        success: true,
                        message: 'Necklace successfully unfavorited.'
                    }
                }
                return {
                    success: false,
                    message: 'You have already favorited a necklace! Please remove it and try again.'
                }
            }
            arr.accessory.necklace = item as Accessory;
            return {
                success: true,
                message: 'Necklace successfully favorited!'
            }
        case 'EARRING':
            const earringLen = arr.accessory.earrings.length;
            if (arr.accessory.earrings.some(obj => obj.uid === item.uid)) {
                arr.accessory.earrings = arr.accessory.earrings.filter((ear) => ear.uid != item.uid);
                return {
                    success: true,
                    message: 'Necklace successfully unfavorited.'
                }
            }
            if (earringLen < 2) {
                arr.accessory.earrings.push(item as Accessory);
                return {
                    success: true,
                    message: 'Earring successfully favorited.'
                }
            } else {
                return {
                    success: false,
                    message: 'You have already favorited 2 earrings. Please remove one and try again.'
                }
            } 
        case 'RING':
            const ringLen = arr.accessory.rings.length;
            if (arr.accessory.rings.some(obj => obj.uid === item.uid)) {
                arr.accessory.rings = arr.accessory.rings.filter((ring) => ring.uid != item.uid);
                return {
                    success: true,
                    message: 'Ring successfully unfavorited.'
                }
            } else if (ringLen < 2) {
                arr.accessory.rings.push(item as Accessory);
                return {
                    success: true,
                    message: 'Ring successfully favorited.'
                }
            } else {
                return {
                    success: false,
                    message: 'You have already favorited 2 rings. Please remove one and try again.'
                }
            } 
        case 'BOOK':
            const bookLen = arr.book.length;
            if (arr.book.some(obj => obj.uid === item.uid)) {
                arr.book = arr.book.filter((b) => b.uid != item.uid);
                return {
                    success: true,
                    message: 'Book successfully unfavorited.'
                }
            }
            if (bookLen < 2) {
                arr.book.push(item as Book);
                return {
                    success: true,
                    message: 'Book successfully favorited.'
                }
            } else {
                return {
                    success: false,
                    message: 'You have already favorited 2 books. Please remove one and try again.'
                }
            }
        case 'STONE':
            if (arr.stone !== null) { //favorite already exists
                if (arr.stone.uid === item.uid) { //unfavorite/toggle
                    arr.stone = null;
                    return {
                        success: true,
                        message: 'Stone successfully unfavorited.'
                    }
                }
                return {
                    success: false,
                    message: 'You have already favorited a stone! Please remove it and try again.'
                }
            }
            arr.stone = item as AbilityStone;
            return {
                success: true,
                message: 'Stone successfully favorited!'
            }
        default:
            return {
                success: false,
                message: 'Something went wrong! Please try again.'
            }
            break;
    }
}

const Loading = () => {
    return (
        <Box className='flex h-[450px] place-content-center items-center'>
            <PuffLoader color="#ffffff" />
        </Box>
    )
}

export default List;