import { Box, Image } from "@chakra-ui/react";
import React from "react";

interface IParams {
    engraving: string;
}

const EngravingIcon: React.FC<IParams> = ({
    engraving,
}) => {
    return (
        <Box position='relative' className=''>
            <Box position='relative'>
                <Image 
                    src='/images/engraving_border.png' 
                    alt='Engraving Border' 
                    width='100px' 
                    height='100px' 
                    className='transform-origin-top-left transform top-0 left-0' 
                />
            </Box>
            <Box position='absolute' top='16px' left='14px'>
                <Image 
                    src={`/images/engravings/${engraving}.webp`} 
                    alt='Engraving Icon' 
                    className="rounded-full" 
                    width='60px' 
                    height='60px' 
                />
            </Box>
        </Box>
    )
}

export default EngravingIcon;