import { Box, Image } from "@chakra-ui/react"

const Item = () => {
    return (
        <Box className='border border-zinc-700 p-[1.5px] inline-block'>
            <Box className='border border-zinc-700 p-[1px]'>
                <Image src='/images/necklace2_icon.webp' alt='Equipped Necklace' />
            </Box>
        </Box>
    )
}

export default Item;