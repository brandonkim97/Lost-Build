'use client';
import { getAccessoryTypes, getCombatStats, getReduction } from '../../libs/getItemData';
import SliderInput from "../SliderInput";
import { Flex, FormControl } from '@chakra-ui/react'
import { ChangeEvent, useCallback, useState } from "react";
import Input from "./Input";
import { engravingLevels } from '@/app/libs/getEngravingData';
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

interface AddAccessoryProps  {
    engravingOptions: {};
    setItemData: (e: any) => void;
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
  engravingOptions,
  setItemData
}) => {
  const dataInitialState = {
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
  const [data, setData] = useState(dataInitialState);
  const [isLoading, setIsLoading] = useState(false);


  // const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
  //   const { name, value } = e.target;
  //   const parsed = parseString(name, value);
  //   setData({
  //     ...data,
  //     [name]: parsed,
  //   });
  // }
  
  const handleChange = (e: string, v: string) => setData({ ...data, [e]: v});

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
    existingArray.push(formattedAccessory);

    // Store the updated array back in local storage
    localStorage.setItem('accessories', JSON.stringify(existingArray));
    setItemData(existingArray);
    handleClear();
    setIsLoading(false);
  }

  const handleClear = () => {
    setData(dataInitialState);
  }

  const types = Object.entries(getAccessoryTypes()).map(([key, value]) => (
    <SelectItem key={key} value={key}>{value}</SelectItem>
  ));

  const stats = Object.entries(getCombatStats()).map(([key, value]) => (
    <SelectItem key={key} value={key}>{value}</SelectItem>
  ));

  const reduction = Object.entries(getReduction()).map(([key, value]) => (
    <SelectItem key={key} value={key}>{value}</SelectItem>
  ));

  const engravings = Object.entries(engravingLevels).map(([key, value]) => {
    return (
      <SelectItem key={key} value={key}>{value}</SelectItem>
    )
  });

  let maxStat = 0;
  if (data.type === 'NECKLACE') maxStat = 500;
  else if (data.type === 'EARRING') maxStat = 300;
  else maxStat = 200;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add accessory</CardTitle>
        <CardDescription>Add your accessories from your characters.</CardDescription>
      </CardHeader>
      <CardContent>
          <Flex gap="4" flexDirection="column">
            <Input
              label="Select accessory type"
              name="type"
              options={types}
              onChange={(e: string, v: string) => handleChange(e, v)}
              value={data.type}
              required
            />
          </Flex>
          <Input 
            label="Select combat stat"
            name="combatOne"
            options={stats}
            onChange={(e: string, v: string) => handleChange(e, v)}
            value={data.combatOne}
            required
          />
          <SliderInput 
            max={maxStat} 
            name="combatOneValue"
            value={data.combatOneValue}
            onChange={handleSliderChange} 
          />
          {data.type === 'NECKLACE' && (
            <>
              <Input 
                label="Select combat stat"
                name="combatTwo"
                options={stats}
                onChange={(e: string, v: string) => handleChange(e, v)}
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
            onChange={(e: string, v: string) => handleChange(e, v)}
            value={data.engravingOne}
            required
          />
          <Input
              label="Select level"
              name="engravingOneValue"
              options={engravings}
              onChange={(e: string, v: string) => handleChange(e, v)}
              value={data.engravingOneValue}
              required
          />
          <Input 
            label="Select engraving"
            name="engravingTwo"
            options={engravingOptions}
            onChange={(e: string, v: string) => handleChange(e, v)}
            value={data.engravingTwo}
            required
          />
          <Input
              label="Select level"
              name="engravingTwoValue"
              options={engravings}
              onChange={(e: string, v: string) => handleChange(e, v)}
              value={data.engravingTwoValue}
              required
          />
          <Input 
            label="Select reduction"
            name="reduction"
            options={reduction}
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
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={handleClear}>Clear</Button>
        <Button onClick={handleSubmit}>
          Add
        </Button>
      </CardFooter>
    </Card>
  )
}

export default AddAccessory;