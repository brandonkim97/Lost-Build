
import { Box } from '@chakra-ui/react'
import React from 'react'

interface IParams {
    icon: any;
    isActive?: boolean;
}

const ItemType: React.FC<IParams> = ({
    icon,
    isActive,
}) => {
  return (
    <Box as='button' className={`
      bg-gray-800 px-[10px] py-1 rounded-sm 
      hover:opacity-85
      ${isActive ? 'border-2 border-sky-700 shadow-inner' : ''}
    `}>
        {icon}
    </Box>
  )
}

export default ItemType;
