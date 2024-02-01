import { Box, Flex, Text } from "@chakra-ui/react";
import EngravingLevel from "./EngravingLevel";
import React from "react";

interface IParams {
    value: number;
}

const EngravingLevels: React.FC<IParams> = ({
    value
}) => {
    const levelOneNodes = value >= 5 ? 5 : value < 0 ? 0 : value;
    const levelTwoNodes = value - 5 >= 5 ? 5 : value - 5 < 0 ? 0 : value - 5;
    const levelThreeNodes = value - 10 >= 5 ? 5 : value - 10 < 0 ? 0 : value - 10;

    return (
        <Box fontSize='xs'>
            <Flex className='justify-between text-center' gap='1'>
                <EngravingLevel level={1} nodes={levelOneNodes} />
                <EngravingLevel level={2} nodes={levelTwoNodes} />
                <EngravingLevel level={3} nodes={levelThreeNodes} />
            </Flex>
        </Box>
    )
}

export default EngravingLevels;