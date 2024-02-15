import { Box, Button, Flex, Grid, GridItem, Image, Text } from "@chakra-ui/react"
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import React, { Suspense, useContext } from "react";
import { AbilityStone, Accessory, Book, Favorites } from "../types";
import EngravingContext from "../contexts/EngravingContext";
import { getCombatStat, getReduce } from "../libs/getItemData";
import useAddAccessoryModal from "../hooks/useAddAccessoryModal";
import useAddAbilityStoneModal from "../hooks/useAddAbilityStoneModal";
import useAddEngravingBookModal from "../hooks/useAddEngravingBookModal";
import { RemoveButton } from "./buttons/RemoveButton";
import { EditButton } from "./buttons/EditButton";
import { MdOutlineFavorite } from "react-icons/md";
import { MdFavoriteBorder  } from "react-icons/md";
import FavoriteContext from "../contexts/FavoriteContext";


interface IParams {
    data: Accessory[] | Book[] | AbilityStone[];
    setItemData: (e: any) => void;
    handleFavorites: (idx: number, type: string, item: Accessory | Book | AbilityStone) => void;
    type: 'accessory' | 'book' | 'stone';
}

const ListContent: React.FC<IParams> = ({ data, setItemData, handleFavorites, type }) => {
    const engravingContext = useContext(EngravingContext);
    const addAccessoryModal = useAddAccessoryModal();
    const addEngravingBookModal = useAddEngravingBookModal();
    const addAbilityStoneModal = useAddAbilityStoneModal();
    const favorites = useContext(FavoriteContext);

    let mapContent;

    const isFavorited = (item: Accessory | Book | AbilityStone, type: string, isAcc?: boolean) => {
        if (isAcc) {
            if (type === 'NECKLACE') {
                return favorites.accessory?.necklace?.uid === item.uid;
            } else if (type === 'EARRING'){
                return favorites.accessory?.earrings.some(obj => obj.uid === item.uid);
            } else {
                return favorites.accessory?.rings.some(obj => obj.uid === item.uid);
            }
        } else if (type === 'stone') {
            return favorites.stone?.uid === item.uid;
        }
        return (favorites[type as 'book'] as Book[])?.some(obj => obj.uid === item.uid);
    }

    if (data && data.length) {
        if (type === 'accessory') { //accessory
            const icon = {
                'NECKLACE': '/images/necklace2_icon.webp',
                'EARRING': '/images/earring2_icon.webp',
                'RING': '/images/ring2_icon.webp',
            }
            mapContent = (
                (data as Accessory[]).map((value, index) => (
                    <>
                        <Box key={value.uid}>
                            <Flex className='justify-between items-center'>
                                <Box>{`${index+1}.`}</Box>
                                <Button variant='ghost' onClick={() => handleFavorites(index, value.type, value)}>
                                    {isFavorited(value, value.type, true) ? 
                                        <MdOutlineFavorite color='red' size={22} /> :
                                        <MdFavoriteBorder size={22} />
                                    }
                                </Button>
                            </Flex>
                            <Flex gap={4} className='items-center my-6'>
                                <Box className='w-1/5'>
                                    <Image src={icon[value.type]} alt='Accessory Icon' className='rounded-lg' />
                                </Box>
                                <Grid templateColumns='repeat(3, 1fr)' className='w-3/5' gap={1.5}>
                                    <GridItem colSpan={2}>
                                        <Text fontSize='sm'>{getCombatStat(value.combatOne.name)}</Text>
                                    </GridItem>
                                    <GridItem>
                                        <Text fontSize='sm'>{value.combatOne.value}</Text>
                                    </GridItem>
                                    {value.combatTwo && (
                                        <>
                                        <GridItem colSpan={2}>
                                            {value.combatTwo?.name && <Text fontSize='sm'>{getCombatStat(value.combatTwo.name)}</Text>}
                                        </GridItem>
                                        <GridItem>
                                            <Text fontSize='sm'>{value.combatTwo.value}</Text>
                                        </GridItem>
                                        </>
                                    )}
                                    <GridItem colSpan={2}>
                                        <Text fontSize='sm' color='yellow'>{engravingContext[value.engravingOne.name]}</Text>
                                    </GridItem>
                                    <GridItem>
                                        <Text fontSize='sm'>{value.engravingOne.value}</Text>
                                    </GridItem>
                                    <GridItem colSpan={2}>
                                        <Text fontSize='sm' color='yellow'>{engravingContext[value.engravingTwo.name]}</Text>
                                    </GridItem>
                                    <GridItem>
                                        <Text fontSize='sm'>{value.engravingTwo.value}</Text>
                                    </GridItem>
                                </Grid>
                                <Flex flexDirection='column' className='w-1/5'>
                                    <EditButton onClick={() => addAccessoryModal.onEdit(value, index)} />
                                    <RemoveButton index={index} storageKey='accessories' setItemData={setItemData} />
                                </Flex>
                            </Flex>
                            <Separator className='my-2 h-1 rounded' />
                        </Box>
                    </>
                ))
            );
        } else if (type === 'book') { //book
            mapContent = (
                (data as Book[]).map((value, index) => (
                    <>
                        <Box key={`${value.name}-${index}`}>
                            <Flex className='justify-between items-center'>
                                <Box>{`${index+1}.`}</Box>
                                <Button variant='ghost' onClick={() => handleFavorites(index, 'BOOK', value)}>
                                    {isFavorited(value, 'book') ? 
                                        <MdOutlineFavorite color='red' size={22} /> :
                                        <MdFavoriteBorder size={22} />
                                    }
                                </Button>
                            </Flex>
                            <Flex gap={4} className='items-center my-2'>
                                <Box className='w-1/5'>
                                    <Image src='/images/Legendary_Engraving_Recipe_icon.webp' alt='Engraving Book Icon' className='rounded-lg' />
                                </Box>
                                <Grid templateColumns='repeat(3, 1fr)' className='w-3/5' gap={1.5}>
                                    <GridItem colSpan={2}>
                                        <Text fontSize='sm' color='yellow'>
                                            {engravingContext[value.name]}
                                        </Text>
                                    </GridItem>
                                    <GridItem>
                                        <Text fontSize='sm' color='yellow'>
                                            {value.value}
                                        </Text>
                                    </GridItem>
                                </Grid>
                                <Flex flexDirection='column' className='w-2/5'>
                                    <EditButton onClick={() => addEngravingBookModal.onEdit(value, index)} />
                                    <RemoveButton index={index} storageKey='engraving-book' setItemData={setItemData} />
                                </Flex>
                            </Flex>
                            <Separator className='my-2 h-1 rounded' />
                        </Box>
                    </>
                ))
            );
        } else { //stone
            mapContent = 
                (data as AbilityStone[]).map((value, index) => (
                    <>  
                        <Box key={`${value.engravingOne.name}-${value.engravingTwo.name}-${index}`}>
                            <Flex className='justify-between items-center'>
                                <Box>{`${index+1}.`}</Box>
                                <Button variant='ghost' onClick={() => handleFavorites(index, 'STONE', value)}>
                                    {isFavorited(value, 'stone') ? 
                                        <MdOutlineFavorite color='red' size={22} /> :
                                        <MdFavoriteBorder size={22} />
                                    }
                                </Button>
                            </Flex>
                            <Flex gap={2} className='items-center my-2'>
                                <Box className='w-1/5'>
                                    <Image src='/images/ability_stone_icon.jpg' alt='Engraving Book Icon' className='rounded-lg' />
                                </Box>
                                <Grid templateColumns='repeat(3, 1fr)' className='w-3/5' gap={1.5}>
                                    <GridItem colSpan={2}>
                                        <Text fontSize='sm' color='yellow'>{engravingContext[value.engravingOne.name]}</Text>
                                    </GridItem>
                                    <GridItem>
                                        <Text>{value.engravingOne.value}</Text>
                                    </GridItem>
                                    <GridItem colSpan={2}>
                                        <Text fontSize='sm' color='yellow'>{engravingContext[value.engravingTwo.name]}</Text>
                                    </GridItem>
                                    <GridItem>
                                        <Text>{value.engravingTwo.value}</Text>
                                    </GridItem>
                                    <GridItem colSpan={2}>
                                        <Text fontSize='sm' color='red'>{getReduce(value.reduction.name)}</Text>
                                    </GridItem>
                                    <GridItem>
                                        <Text>{value.reduction.value}</Text>
                                    </GridItem>
                                </Grid>
                                <Flex flexDirection='column' className='w-1/5'>
                                    <EditButton onClick={() => addAbilityStoneModal.onEdit(value, index)} />
                                    <RemoveButton index={index} storageKey='ability-stones' setItemData={setItemData} />
                                </Flex>
                            </Flex>
                            <Separator className='my-2 h-1 rounded' />
                        </Box>
                    </>
                )
            );
        }
    }

    return mapContent;
}

export default ListContent;