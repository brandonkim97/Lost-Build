import { Build } from "@/app/types";
import React from "react";
import Item from "./Item";
import { Box, Flex, Grid, GridItem, Image, Text } from '@chakra-ui/react'
import { GiIntricateNecklace } from "react-icons/gi";
import { GiEarrings } from "react-icons/gi";
import { GiBigDiamondRing } from "react-icons/gi";
import { IoDiamond } from "react-icons/io5";
import ItemType from "./ItemType";
import ItemDetails from "./ItemDetails";
import SubHeader from "../engraving/SubHeader";


interface IParams {
    build?: Build;
}

const ItemList: React.FC<IParams> = ({
    build
}) => {
    return (
        <Flex flexDirection='column' className='grow flex'>
            <SubHeader label='Engravings on Gear' />
            <Grid templateColumns='repeat(3, 1fr)' gap={2} className='px-6'>
                <GridItem>
                    <Item />
                </GridItem>
                <GridItem>
                    <Item />
                </GridItem>
                <GridItem>
                    <Item />
                </GridItem>
                <GridItem>
                    <Item />
                </GridItem>
                <GridItem>
                    <Item />
                </GridItem>
                <GridItem>
                    <Item />
                </GridItem>
            </Grid>
            <Flex gap={0.5} marginY={2} className='justify-between'>
                <ItemType icon={<GiIntricateNecklace />} isActive />
                <ItemType icon={<GiEarrings />} />
                <ItemType icon={<GiEarrings />} />
                <ItemType icon={<GiBigDiamondRing />} />
                <ItemType icon={<GiBigDiamondRing />} />
                <ItemType icon={<IoDiamond />} />
            </Flex>
            <Box className='py-[0.5px] rounded bg-yellow-600 my-2' />
            <Box paddingX={2}>
                <ItemDetails label='Hit Master' value={5} isEngraving={true} />
                <ItemDetails label='Precise Dagger' value={3} isEngraving={true} />
                <ItemDetails label='Move Speed Reduction' value={5} isEngraving={false} />
            </Box>
            <Box className='grow flex flex-col justify-end'>
                <Box>
                    <SubHeader label='Equipped Engravings' />
                    <ItemDetails label='Preemptive Strike' value={12} isEngraving={true} />
                    <ItemDetails label='Order of the Emperor' value={9} isEngraving={true} />
                </Box>
            </Box>
        </Flex>
    )
}

export default ItemList;