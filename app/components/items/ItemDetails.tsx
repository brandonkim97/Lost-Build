import { Box, Flex, Image, Text } from '@chakra-ui/react';
import React from 'react'

interface IParams {
    label: string,
    isEngraving: boolean,
    value: number,
}

const ItemDetails: React.FC<IParams> = ({
    label,
    isEngraving,
    value,
}) => {
    const imageSrc = isEngraving ? 
        '/images/engraving_node_filled.png' :
        '/images/engraving_node_negative.png'
    ;
    const alt = isEngraving ? 
        'Accessory Node Icon' :
        'Reduction Node Icon'
    ;
    const engravingColor = isEngraving ?
        'white' :
        'red'
    ;
    const val = `x${value}`;

    return (
        <Flex className='items-center text-start'>
            <Text color={engravingColor} fontSize='sm' className='w-4/5 justify-start whitespace-nowrap'>{label}</Text>
            <Flex gap={1} className='items-center justify-start w-1/5'>
                <Image src={imageSrc} alt={alt} className='scale-[.65]' />
                <Text fontSize='sm'>{val}</Text>
            </Flex>
        </Flex>
  )
}

export default ItemDetails;
