import { Box, Image } from "@chakra-ui/react";
import React from "react";

interface IParams {
    engraving: string;
}

const EngravingIcon: React.FC<IParams> = ({
    engraving,
}) => {
    return (
        <Box position='relative' className='scale-90'>
            <Box position='relative'>
                <Image 
                    src='/images/engraving_border.png' 
                    alt='Engraving Border' 
                    width='100%' 
                    height='100%' 
                    className='scale-[0.9] transform-origin-top-left transform top-0 left-0' 
                />
            </Box>
            <Box position='absolute' top='50%' left='50%'  transform="translate(-50%, -50%)">
                <Image src={`/images/engravings/${engraving}.webp`} alt='Engraving Icon' className="rounded-full scale-125" />
            </Box>
        </Box>
    )
}

export default EngravingIcon;