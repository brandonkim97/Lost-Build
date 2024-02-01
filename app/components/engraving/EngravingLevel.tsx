import { Box, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";

interface IParams {
    level: number,
    nodes: number,
}

const EngravingLevel: React.FC<IParams> = ({
    level,
    nodes,
}) => {
    const label = `Lv. ${level.toString()}`;

    const filledArray = Array.from({ length: nodes });
    const filledNodes = filledArray.map((_, index) => (
        <Image 
            key={index} 
            src='/images/engraving_node_filled.png' 
            alt='Engraving Node' 
            className='scale-[0.8]' 
        />
    ));
    const emptyArray = Array.from({ length: 5 - nodes });
    const emptyNodes = emptyArray.map((_, index) => (
        <Image 
            key={index} 
            src='/images/engraving_node_clear.png' 
            alt='Engraving Node' 
            className='scale-[0.8]' 
        />
    ));

    return (
        <Box className='w-1/3 rounded-sm shadow-inner border border-zinc-800'>
            <Box className={`font-semibold ${level === 3 && nodes >= 5 ? 'bg-yellow-600 text-yellow-200 ' : 'bg-zinc-800 text-zinc-400'}`}>
                <Text>{label}</Text>
            </Box>
            <Flex className='justify-center' gap='1'>
                {filledNodes}
                {emptyNodes}
            </Flex>
        </Box>
    )
}

export default EngravingLevel;