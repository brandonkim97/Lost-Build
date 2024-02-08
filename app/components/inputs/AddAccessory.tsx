'use client';
import { getAccessoryTypes, getCombatStat, getCombatStats, getReduction, getType } from '../../libs/getItemData';
import SliderInput from "../SliderInput";
import { Box, Flex, FormControl, Image, Text } from '@chakra-ui/react'
import { ChangeEvent, useCallback, useContext, useEffect, useMemo, useState } from "react";
import Input from "./Input";
import { engravingLevels, getEngravingLevels } from '@/app/libs/getEngravingData';
import { formatAccessory } from '@/app/utils/formatData';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SelectItem } from '@/components/ui/select';
import ClearButton from '../buttons/ClearButton';
import SubmitButton from '../buttons/SubmitButton';
import Modal from '../modals/Modal';
import useAddAccessoryModal from '@/app/hooks/useAddAccessoryModal';
import { CommandItem } from 'cmdk';
import { Check } from 'lucide-react';
import { CommandGroup } from '@/components/ui/command';
import { ScrollArea } from '@/components/ui/scroll-area';
import EngravingContext from '@/app/contexts/EngravingContext';

interface AddAccessoryProps  {
    setItemData: (e: any) => void;
}

type DataType = {
  [key: string]: string | number | undefined;
}

export interface AddAccessoryData {
  uid: string;
  combatOne: string,
  combatTwo: string,
  combatOneValue: number,
  combatTwoValue: number,
  engravingOne: string,
  engravingTwo: string,
  engravingOneValue: number,
  engravingTwoValue: number,
  reduction: string,
  reductionValue: number,
  quality: number,
  type: string,
}
  
  
const AddAccessory: React.FC<AddAccessoryProps> = ({
  setItemData
}) => {
  const engravingOptions = useContext(EngravingContext);
  const addAccessoryModal = useAddAccessoryModal();
  const { isEdit, item, index } = addAccessoryModal;
  const dataInitialState: DataType = useMemo(() => {
    return !isEdit && {
      uid: 0,
      combatOne: '',
      combatTwo: '',
      combatOneValue: '',
      combatTwoValue: '',
      engravingOne: '',
      engravingTwo: '',
      engravingOneValue: '',
      engravingTwoValue: '',
      reduction: '',
      reductionValue: '',
      quality: '',
      type: '',
    } 
      ||
    {
      uid: item?.uid,
      combatOne: item?.combatOne.name,
      combatTwo: item?.combatTwo?.name,
      combatOneValue: item?.combatOne.value,
      combatTwoValue: item?.combatTwo?.value,
      engravingOne: item?.engravingOne.name,
      engravingTwo: item?.engravingTwo.name,
      engravingOneValue: item?.engravingOne.value.toString(),
      engravingTwoValue: item?.engravingTwo.value.toString(),
      reduction: item?.reduction.name,
      reductionValue: item?.reduction.value,
      quality: item?.quality,
      type: item?.type,
    }
  }, [item, isEdit]);

  const [data, setData] = useState<DataType>(dataInitialState);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    setData(dataInitialState);
  }, [dataInitialState]);
  
  const handleChange = useCallback((e: string, v: string) => e !== 'type' ? setData({ ...data, [e]: v }) : setData({ ...dataInitialState, [e]: v }), [data]);

  const handleSliderChange = (value: any, name: string) => {
    const parsed = parseString(name, value);
    setData({
      ...data,
      [name]: parsed,
    });
  }

  const parseString = (e: any, v: any) => {
    let res;
    switch(e) {
      case 'combatOneValue':
      case 'combatTwoValue':
      case 'engravingOneValue':
      case 'engravingTwoValue':
      case 'reductionValue':
        res = parseInt(v, 10);
        break;
      default:
        res = v;
        break;
    }
    return res;
  }

  const handleSubmit = () => {
    setIsLoading(true);
    data.uid = Date.now();
    const existingArrayString = localStorage.getItem('accessories');
    const existingArray = existingArrayString ? JSON.parse(existingArrayString) : [];

    //format data
    const formattedAccessory = formatAccessory(data)
    // Add new data to the array
    if (isEdit) {
      existingArray[index as number] = formattedAccessory;
    } else {
      existingArray.push(formattedAccessory);
    }

    // Store the updated array back in local storage
    localStorage.setItem('accessories', JSON.stringify(existingArray));
    setItemData(existingArray);
    if (isEdit) addAccessoryModal.onClose();
    handleClear();
    setIsLoading(false);
  }

  const handleClear = () => {
      setData({
        uid: 0,
        combatOne: '',
        combatTwo: '',
        combatOneValue: '',
        combatTwoValue: '',
        engravingOne: '',
        engravingTwo: '',
        engravingOneValue: '',
        engravingTwoValue: '',
        reduction: '',
        reductionValue: '',
        quality: '',
        type: '',
      });
  }

  const handleClose = () => {
    setData(dataInitialState);
    addAccessoryModal.onClose();
  }

  const getOptions = useCallback((e: string, func: () => { [key: string]: string | number }) => {
      const options = (
        <CommandGroup>
          <ScrollArea className={`${e === 'engravingOne' || e === 'engravingTwo' ? 'h-[300px]' : ''}`}>
          {Object.entries(func()).map(([key, value]) => (
            <CommandItem
              key={key}
              value={key}
              onSelect={() => handleChange(e, key)}
              className='flex hover:cursor-pointer hover:bg-zinc-800 rounded-lg p-1 active:bg-zinc-800 focus:outline-none focus:bg-zinc-800'
            >
              <Check
                className={`
                  mr-2 h-4 w-4
                  ${data[e] === value ? "opacity-100" : "opacity-0"}
                `}
              />
              {value}
            </CommandItem>
          ))}
          </ScrollArea>
        </CommandGroup>
      );
    
      return options;
  }, [data, handleChange]);

  let maxStat = 0;
  let minStat = 100;
  if (data.type === 'NECKLACE') {
    minStat = 400;
    maxStat = 500;
  }
  else if (data.type === 'EARRING') {
    minStat = 240;
    maxStat = 300;
  }
  else {
    minStat = 160;
    maxStat = 200;
  }


  const description = addAccessoryModal.isEdit ? 
    'Edit this accessory from your character.' :
    'Add your accessories from your characters.'
  ;

  const accessoryTypes = (
    <Flex flexDirection='column'>
      <Text fontSize='md' marginBottom={4}>Select accessory type.</Text>
      <Flex gap={4} className='justify-between px-16'>
        <Box 
          tabIndex={0} 
          className={`rounded-xl hover:cursor-pointer hover:scale-110 ease-out duration-300 border-2
            ${data.type === 'NECKLACE' ? 'border-green-600' : ''}
          `}
          onClick={() => {
            handleChange('type', 'NECKLACE');
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              handleChange('type', 'NECKLACE')
            }
          }}
        >
          <Image src='/images/necklace2_icon.webp' alt='Choose Necklace Icon' className='rounded-xl' />
        </Box>
        <Box 
          tabIndex={0} 
          className={`rounded-xl hover:cursor-pointer hover:scale-110 ease-out duration-300 border-2
            ${data.type === 'EARRING' ? 'border-green-600' : ''}
          `}
          onClick={() => handleChange('type', 'EARRING')}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              handleChange('type', 'EARRING')
            }
          }}
        >
          <Image src='/images/earrings2_icon.webp' alt='Choose Necklace Icon' className='rounded-xl' />
        </Box>
        <Box 
          tabIndex={0} 
          className={`rounded-xl hover:cursor-pointer hover:scale-110 ease-out duration-300 border-2
            ${data.type === 'RING' ? 'border-green-600  ' : ''}
          `}
          onClick={() => handleChange('type', 'RING')}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              handleChange('type', 'RING')
            }
          }}
        >
          <Image src='/images/ring2_icon.webp' alt='Choose Necklace Icon' className='rounded-xl' />        
        </Box>
      </Flex>
    </Flex>
  );

  const bodyContent = (
    <Card>
      <CardHeader>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
          <Flex gap="4" flexDirection="column">
            {/* <Input
              label="Select accessory type"
              name="type"
              options={getOptions('type', getAccessoryTypes)}
              onChange={(e: string, v: string) => handleChange(e, v)}
              value={getType(data.type as string)}
              required
            /> */}
            {accessoryTypes}
          <Input 
            label="Select combat stat"
            name="combatOne"
            options={getOptions('combatOne', getCombatStats)}
            onChange={(e: string, v: string) => handleChange(e, v)}
            value={getCombatStat(data.combatOne as string)}
            required
          />
          <SliderInput 
            max={maxStat} 
            min={minStat}
            name="combatOneValue"
            value={data.combatOneValue}
            onChange={handleSliderChange} 
          />
          {data.type === 'NECKLACE' && (
            <>
              <Input 
                label="Select combat stat"
                name="combatTwo"
                options={getOptions('combatTwo', getCombatStats)}
                onChange={(e: string, v: string) => handleChange(e, v)}
                value={getCombatStat(data.combatTwo as string)}
                required
              />
              <SliderInput 
                max={maxStat} 
                min={minStat}
                name="combatTwoValue"
                value={data.combatTwoValue}
                onChange={handleSliderChange} 
              />
            </>
          )}
          <Input 
            label="Select engraving"
            name="engravingOne"
            options={getOptions('engravingOne', () => engravingOptions)}
            onChange={(e: string, v: string) => handleChange(e, v)}
            value={engravingOptions[data.engravingOne as string]}
            required
          />
          <Input
              label="Select level"
              name="engravingOneValue"
              options={getOptions('engravingOneValue', getEngravingLevels)}
              onChange={(e: string, v: string) => handleChange(e, v)}
              value={data.engravingOneValue}
              required
          />
          <Input 
            label="Select engraving"
            name="engravingTwo"
            options={getOptions('engravingTwo', () => engravingOptions)}
            onChange={(e: string, v: string) => handleChange(e, v)}
            value={engravingOptions[data.engravingTwo as string]}
            required
          />
          <Input
              label="Select level"
              name="engravingTwoValue"
              options={getOptions('engravingTwoValue', getEngravingLevels)}
              onChange={(e: string, v: string) => handleChange(e, v)}
              value={data.engravingTwoValue}
              required
          />
          <Input 
            label="Select reduction"
            name="reduction"
            options={getOptions('reduction', getReduction)}
            onChange={(e: string, v: string) => handleChange(e, v)}
            value={data.reduction}
            required
          />
          <SliderInput
            min={1} 
            max={3} 
            name="reductionValue"
            value={data.reductionValue}
            onChange={handleSliderChange} 
          />
        </Flex>
      </CardContent>
      {/* <CardFooter className="flex justify-between">
        <ClearButton label='Clear' onClick={handleClear} />
        <SubmitButton label='Add' onClick={handleSubmit} />
      </CardFooter> */}
    </Card>
  );


  //edit mode
  if (addAccessoryModal.isEdit) {
    return (
      <Modal
        isOpen={addAccessoryModal.isOpen}
        onClose={handleClose}
        onSubmit={handleSubmit}
        actionLabel="Edit"
        secondaryAction={handleClear}
        secondaryActionLabel='Clear'
        title="Edit accessory"
        body={bodyContent}
      />
    )
  }

  //add mode
  return (
    <Modal
      isOpen={addAccessoryModal.isOpen}
      onClose={handleClose}
      onSubmit={handleSubmit}
      actionLabel="Submit"
      secondaryAction={handleClear}
      secondaryActionLabel='Clear'
      title="Add accessory"
      body={bodyContent}
    />
  )
}

export default AddAccessory;