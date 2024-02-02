import { Box, Image } from "@chakra-ui/react"
import React from "react";

interface IParams {
    type: string;
    isActive: boolean;
}

const Item: React.FC<IParams> = ({
    type,
    isActive,
}) => {
    let image = '';
    switch(type) {
        case 'NECKLACE':
            image = '/images/necklace2_icon.webp';
            break;
        case 'EARRING':
            image = '/images/earrings2_icon.webp';
            break;
        case 'RING':
            image = '/images/ring2_icon.webp';
            break;
        case 'STONE':
            image = '/images/ability_stone_icon.jpg';
            break;
    }

    return (
        <Box className={`
            border p-[1.5px] inline-block
            ${isActive ? 'border-sky-700 shadow-inner' : 'border-gray-800'}
        `}>
            <Box className='border border-zinc-700 p-[1px]'>
                <Image src={image} alt='Equipped Item' />
            </Box>
        </Box>
    )
}

export default Item;