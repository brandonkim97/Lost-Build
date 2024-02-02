import { Build } from "@/app/types";
import React, { useContext, useState } from "react";
import Item from "./Item";
import { Box, Flex, Grid, GridItem, Image, Text } from '@chakra-ui/react'
import { GiIntricateNecklace } from "react-icons/gi";
import { GiEarrings } from "react-icons/gi";
import { GiBigDiamondRing } from "react-icons/gi";
import { IoDiamond } from "react-icons/io5";
import ItemType from "./ItemType";
import ItemDetails from "./ItemDetails";
import SubHeader from "../engraving/SubHeader";
import EngravingContext from "@/app/contexts/EngravingContext";
import { getReduction } from "@/app/libs/getItemData";
import getCombatStats from "@/app/libs/getCombatStats";


interface IParams {
    build: Build;
}

const ItemList: React.FC<IParams> = ({
    build
}) => {
    const [activeItem, setActiveItem] = useState('necklace');
    const engravingContextData = useContext(EngravingContext);
    const handleActive = (item: string) => {
        setActiveItem(item);
    }
    const reductions = getReduction();
    if (!build) return '';

    const stats = getCombatStats(build);

    return (
        <Flex flexDirection='column' className='grow flex' gap={2}>
            <Box>
                <SubHeader label='Combat Stats' />
                <Flex flexDirection='column'>
                    <Flex className='justify-between'>
                        <Text color='gray' fontSize='sm'>Crit</Text>
                        <Text color='gray' fontSize='sm'>{`+${stats?.Crit || 0}`}</Text>
                    </Flex>
                    <Flex className='justify-between'>
                        <Text color='gray' fontSize='sm'>Specialization</Text>
                        <Text color='gray' fontSize='sm'>{`+${stats?.Specialization || 0}`}</Text>
                    </Flex>
                    <Flex className='justify-between'>
                        <Text color='gray' fontSize='sm'>Domination</Text>
                        <Text color='gray' fontSize='sm'>{`+${stats?.Domination || 0}`}</Text>
                    </Flex>
                    <Flex className='justify-between'>
                        <Text color='gray' fontSize='sm'>Swiftness</Text>
                        <Text color='gray' fontSize='sm'>{`+${stats?.Swiftness || 0}`}</Text>
                    </Flex>
                    <Flex className='justify-between'>
                        <Text color='gray' fontSize='sm'>Endurance</Text>
                        <Text color='gray' fontSize='sm'>{`+${stats?.Endurance || 0}`}</Text>
                    </Flex>
                    <Flex className='justify-between'>
                        <Text color='gray' fontSize='sm'>Expertise</Text>
                        <Text color='gray' fontSize='sm'>{`+${stats?.Expertise || 0}`}</Text>
                    </Flex>
                </Flex>
            </Box>
            <Box>
                <SubHeader label='Engravings on Gear' />
                <Grid templateColumns='repeat(3, 1fr)' gap={2} className='px-4'>
                    <GridItem onClick={() => handleActive('necklace')}>
                        <Item type='NECKLACE' isActive={activeItem === 'necklace'} />
                    </GridItem>
                    <GridItem onClick={() => handleActive('earringOne')}>
                        <Item type='EARRING' isActive={activeItem === 'earringOne'} />
                    </GridItem>
                    <GridItem onClick={() => handleActive('earringTwo')}>
                        <Item type='EARRING' isActive={activeItem === 'earringTwo'}  />
                    </GridItem>
                    <GridItem onClick={() => handleActive('ringOne')}>
                        <Item type='RING' isActive={activeItem === 'ringOne'}  />
                    </GridItem>
                    <GridItem onClick={() => handleActive('ringTwo')}>
                        <Item type='RING' isActive={activeItem === 'ringTwo'}  />
                    </GridItem>
                    <GridItem onClick={() => handleActive('abilityStone')}>
                        <Item type='STONE' isActive={activeItem === 'abilityStone'}  />
                    </GridItem>
                </Grid>
                <Flex gap={0.5} marginY={2} className='justify-between'>
                    <ItemType 
                        icon={<GiIntricateNecklace />} 
                        onClick={() => handleActive('necklace')}
                        isActive={activeItem === 'necklace'} 
                    />
                    <ItemType 
                        icon={<GiEarrings />} 
                        isActive={activeItem === 'earringOne'} 
                        onClick={() => handleActive('earringOne')}
                    />
                    <ItemType 
                        icon={<GiEarrings />} 
                        isActive={activeItem === 'earringTwo'} 
                        onClick={() => handleActive('earringTwo')}
                    />
                    <ItemType 
                        icon={<GiBigDiamondRing />} 
                        isActive={activeItem === 'ringOne'} 
                        onClick={() => handleActive('ringOne')}
                    />
                    <ItemType 
                        icon={<GiBigDiamondRing />} 
                        isActive={activeItem === 'ringTwo'} 
                        onClick={() => handleActive('ringTwo')}
                    />
                    <ItemType 
                        icon={<IoDiamond />} 
                        isActive={activeItem === 'abilityStone'} 
                        onClick={() => handleActive('abilityStone')}
                    />
                </Flex>
                <Box className='py-[0.5px] rounded bg-yellow-600 my-2' />
                <Box paddingX={2}>
                    <ItemDetails 
                        label={engravingContextData[(build[activeItem as keyof typeof build] as any).engravingOne.name]} 
                        value={(build[activeItem as keyof typeof build] as any).engravingOne.value} 
                        isEngraving={true} 
                    />
                    <ItemDetails 
                        label={engravingContextData[(build[activeItem as keyof typeof build] as any).engravingTwo.name]} 
                        value={(build[activeItem as keyof typeof build] as any).engravingTwo.value} 
                        isEngraving={true} 
                    />
                    <ItemDetails 
                        label={reductions[(build[activeItem as keyof typeof build] as any).reduction.name]} 
                        value={(build[activeItem as keyof typeof build] as any).reduction.value} 
                        isEngraving={false} 
                    />
                </Box>
            </Box>
            <Box className='grow flex flex-col justify-end'>
                <Box>
                    <SubHeader label='Equipped Engravings' />
                    <ItemDetails 
                        label={engravingContextData[build.engravingBookOne.name]}
                        value={build.engravingBookOne.value} 
                        isEngraving={true} 
                    />
                    <ItemDetails 
                        label={engravingContextData[build.engravingBookTwo.name]}
                        value={build.engravingBookTwo.value} 
                        isEngraving={true} 
                    />
                </Box>
            </Box>
        </Flex>
    )
}

export default ItemList;