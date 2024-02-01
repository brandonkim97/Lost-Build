import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { FaExclamation } from "react-icons/fa6";

interface IParams {
    value: number;
}


const EngravingBonus: React.FC<IParams> = ({
    value,
}) => {
    if (value <= 15) return '';
    const label = `+${Math.floor(value % 5)}`;
    return (
        <Box>
            <Flex className="items-center" gap='2'>
                <Text className='font-semibold'>{label}</Text>
                <FaExclamation className='bg-red-700 rounded-full h-4 w-4 drop-shadow-lg'/>
            </Flex>
        </Box>
    )
}

export default EngravingBonus;