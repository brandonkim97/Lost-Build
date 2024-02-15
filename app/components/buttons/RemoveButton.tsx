'use client';
import { Button } from '@/components/ui/button';
import { Text } from '@chakra-ui/react'
import React from 'react'
import { RemoveDialog } from '../RemoveDialog';

interface IParams {
    index: number;
    storageKey: string;
    setItemData: (e: any) => void;
}

export const RemoveButton: React.FC<IParams> = ({
    index,
    storageKey,
    setItemData,
}) => {
    const handleClick = () => {
        const existingArrayString = localStorage.getItem(storageKey);
        const existingArray = existingArrayString ? JSON.parse(existingArrayString) : [];

        if (!existingArray.length) return;

        //delete item
        existingArray.splice(index, 1);
      
        // Store the updated array back in local storage
        localStorage.setItem(storageKey, JSON.stringify(existingArray));
        setItemData(existingArray);
    }

    return (
        <RemoveDialog handleClick={handleClick} />
    )
}
