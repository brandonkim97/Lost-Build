'use client';
import { getAccessoryTypes, getCombatStats, getReduction } from '../../libs/getItemData';
import SliderInput from "../SliderInput";
import { Button, Flex, FormControl } from '@chakra-ui/react'
import { ChangeEvent, useCallback, useState } from "react";
import Input from "./Input";

interface AddAccessoryProps  {
    engravingOptions: {};
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
  engravingOptions
}) => {
  const dataInitialState = {
    uid: 0,
    combatOne: null,
    combatTwo: null,
    combatOneValue: 0,
    combatTwoValue: 0,
    engravingOne: null,
    engravingTwo: null,
    engravingOneValue: 0,
    engravingTwoValue: 0,
    reduction: null,
    reductionValue: 0,
    quality: 0,
    type: '',
  }
  const [data, setData] = useState(dataInitialState);
  const [isLoading, setIsLoading] = useState(false);


  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  }

  const handleSliderChange = (value: any, name: string) => {
    setData({
      ...data,
      [name]: value,
    });
  }

  const handleSubmit = () => {
    setIsLoading(true);
    data.uid = Date.now();
    const existingArrayString = localStorage.getItem('accessories');
    const existingArray = existingArrayString ? JSON.parse(existingArrayString) : [];

    // Add new data to the array
    existingArray.push(data);

    // Store the updated array back in local storage
    localStorage.setItem('accessories', JSON.stringify(existingArray));
    setIsLoading(false);
  }

  const types = Object.entries(getAccessoryTypes()).map(([key, value]) => (
    <option key={key} value={value}>{value}</option>
  ));

  const stats = Object.entries(getCombatStats()).map(([key, value]) => (
    <option key={key} value={value}>{value}</option>
  ));

  const reduction = Object.entries(getReduction()).map(([key, value]) => (
    <option key={key} value={value}>{value}</option>
  ));

  let maxStat = 0;
  if (data.type === 'Necklace') maxStat = 500;
  else if (data.type === 'Earring') maxStat = 300;
  else maxStat = 200;

  return (
    <FormControl isRequired>
      <Flex gap="4" flexDirection="column">
        <Input
          label="Select accessory type"
          name="type"
          options={types}
          onChange={handleChange}
          value={data.type}
          required
        />
      </Flex>
      <Input 
        label="Select combat stat"
        name="combatOne"
        options={stats}
        onChange={handleChange}
        value={data.combatOne}
        required
      />
      <SliderInput 
        max={maxStat} 
        name="combatOneValue"
        value={data.combatOneValue}
        onChange={handleSliderChange} 
      />
      {data.type === 'Necklace' && (
        <>
          <Input 
            label="Select combat stat"
            name="combatTwo"
            options={stats}
            onChange={handleChange}
            value={data.combatTwo}
            required
          />
          <SliderInput 
            max={maxStat} 
            name="combatTwoValue"
            value={data.combatTwoValue}
            onChange={handleSliderChange} 
          />
        </>
      )}
      <Input 
        label="Select engraving"
        name="engravingOne"
        options={engravingOptions}
        onChange={handleChange}
        value={data.engravingOne}
        required
      />
      <Input 
        label="Select engraving"
        name="engravingTwo"
        options={engravingOptions}
        onChange={handleChange}
        value={data.engravingTwo}
        required
      />
      <Input 
        label="Select reduction"
        name="reduction"
        options={reduction}
        onChange={handleChange}
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
      <Button colorScheme='' size='sm' variant="outline" onClick={handleSubmit}>
            Add accessory
      </Button>
    </FormControl>
  )
}

export default AddAccessory;