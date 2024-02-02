import { Box, Flex } from "@chakra-ui/react";
import EngravingIcon from "./EngravingIcon";
import EngravingLabel from "./EngravingLabel";
import EngravingBonus from "./EngravingBonus";
import EngravingLevels from "./EngravingLevels";
import React from "react";
import { isReduction } from "@/app/libs/getItemData";
import EngravingReduction from "@/app/contexts/EngravingReduction";

interface IParams {
    icon?: any;
    engraving: string;
    value: number;
}

const EngravingLine: React.FC<IParams> = ({
    icon,
    engraving,
    value,
}) => {
    const isReduce = isReduction(engraving);
    
    return (
        <EngravingReduction.Provider value={isReduce}>
            <Box className='w-full max-h-[100px]'>
                <Flex className="items-center">
                    <Box className='w-1/6'>
                        <EngravingIcon engraving={engraving} />
                    </Box>
                    <Box className='w-5/6'>
                        <Flex flexDirection='column' gap='1'>
                            <Flex className={`relative justify-between bg-gradient-to-b shadow-inner px-2 py-1
                                ${!isReduce && value >= 15 ? 'from-yellow-600 to-black' : 
                                isReduce && value >= 5 ? 'from-orange-800 to-black' : 
                                isReduce ? 'from-orange-950 to-black' : 'from-sky-900 to-black'}
                            `}>
                                <EngravingLabel engraving={engraving} value={value} />
                                <EngravingBonus value={value} />
                                {/* <Box className="absolute inset-0 bg-black opacity-10"></Box> */}
                            </Flex>
                            <EngravingLevels value={value} />
                        </Flex>
                    </Box>
                </Flex>
            </Box>
        </EngravingReduction.Provider>
    )
}

export default EngravingLine;