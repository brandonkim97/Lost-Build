
import { Box } from '@chakra-ui/react'
import React from 'react'

interface IParams {
    icon: any;
    isActive?: boolean;
    onClick: () => void;
}

const ItemType: React.FC<IParams> = ({
    icon,
    isActive,
    onClick,
}) => {
  return (
    <Box as='button' className={`
      bg-gray-800 px-[10px] py-1 rounded-sm 
      hover:opacity-85
      border
      ${isActive ? 'border-sky-700 shadow-inner' : 'border-gray-800'}
    `}
    onClick={onClick}
    >
        {icon}
    </Box>
  )
}

export default ItemType;
