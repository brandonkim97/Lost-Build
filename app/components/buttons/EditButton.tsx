import { Button } from '@/components/ui/button';
import { Text } from '@chakra-ui/react'
import React from 'react'

interface IParams {
    onClick: () => void;
}

export const EditButton: React.FC<IParams> = ({
    onClick,
}) => {
  return (
    <Button size='sm' variant='ghost' onClick={onClick}>Edit</Button>
  )
}
