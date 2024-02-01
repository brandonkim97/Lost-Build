import { Box, Text } from '@chakra-ui/react'
import React from 'react'

interface IParams {
    label: string;
}

const SubHeader: React.FC<IParams> = ({
    label,
}) => {
  return (
    <>
        <Text color='gray' className='font-semibold'>{label}</Text>
        <Box className='py-[.75px] rounded bg-yellow-600 mb-3' />
    </>
  )
}

export default SubHeader