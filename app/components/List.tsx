import { Box, Flex, Text } from "@chakra-ui/react"
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import React, { useContext } from "react";
import { AbilityStone, Accessory, Book } from "../types";
import EngravingContext from "../contexts/EngravingContext";
import { getCombatStat } from "../libs/getItemData";
import useAddAccessoryModal from "../hooks/useAddAccessoryModal";
import useAddAbilityStoneModal from "../hooks/useAddAbilityStoneModal";
import useAddEngravingBookModal from "../hooks/useAddEngravingBookModal";

interface IParams {
    data: Accessory[] | Book[] | AbilityStone[];
    setItemData: (e: any) => void;
}


const List: React.FC<IParams> = ({
    data,
    setItemData,
}) => {
    const engravingContext = useContext(EngravingContext);
    const addAccessoryModal = useAddAccessoryModal();
    const addEngravingBookModal = useAddEngravingBookModal();
    const addAbilityStoneModal = useAddAbilityStoneModal();

    if (!data || !data.length) {
        console.log('no data!');
        return '';
    }
    // console.log(data);

    const handleChange = (index: number) => {

    }

    let mapContent;
    
    if ('uid' in data[0]) { //accessory
        mapContent = (
            (data as Accessory[]).map((value, index) => (
                <>
                    <Box key={index}>
                        <Flex gap={4} className='items-center my-6'>
                            <Box w={8} h={8} className='border'></Box>
                            <Flex flexDirection='column'>
                                <Flex gap={2}>
                                    <Text fontSize='sm'>{getCombatStat(value.combatOne.name)}</Text>
                                    {value.combatTwo?.name && <Text fontSize='sm'>{getCombatStat(value.combatTwo?.name)}</Text>}
                                </Flex>
                                <Flex gap={2}>
                                    <Text fontSize='sm' color='yellow'>
                                        {engravingContext[value.engravingOne.name]}
                                    </Text>
                                    <Text fontSize='sm' color='yellow'>
                                        {engravingContext[value.engravingTwo.name]}
                                    </Text>
                                </Flex>
                            </Flex>
                            <Flex gap={4}>
                                <Text fontSize='sm' onClick={() => addAccessoryModal.onEdit(value, index)}>Edit</Text>
                                <Text fontSize='sm'>Remove</Text>
                            </Flex>
                        </Flex>
                        <Separator className='my-2' />
                    </Box>
                </>
            ))
        )
        
    } else if ('name' in data) { //book
    
    } else { //stone

    }

    return (
        <ScrollArea className='border rounded p-3 h-96'>
            {mapContent}
        </ScrollArea>
    )
}

export default List;