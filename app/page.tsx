'use client';
import Image from "next/image";
import axios from "axios";
import { Box, Button, Flex, FormControl } from '@chakra-ui/react'
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import getMockData from "./utils/getMockData";
import { combatEngravings, engravings } from "./libs/getEngravingData";
import { Accessory, Build } from "./types";
import Input from "./components/inputs/Input";
import AddAccessory, { AddAccessoryData } from "./components/inputs/AddAccessory";
import AddEngravingBook from "./components/inputs/AddEngravingBook";
import AddAbilityStone from "./components/inputs/AddAbilityStone";
import SelectEngraving from "./components/inputs/SelectEngraving";
import { useToast } from "@chakra-ui/react";
import { SelectItem } from "@/components/ui/select";

interface EngravingLevels {
  levels: { [key: string]: number };
  build: Build;
}

export default function Home() {
  const dataInitialState = {
    engravingOne: '',
    engravingTwo: '',
    engravingThree: '',
    engravingFour: '',
    engravingFive: '',
    engravingSix: '',
  };
  const [desiredEngravings, setDesiredEngravings] = useState(dataInitialState);
  const [builds, setBuilds] = useState<EngravingLevels[]>([]);
  const [accessories, setAccessories] = useState([]);
  const [books, setBooks] = useState([]);
  const [stones, setStones] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  useEffect(() => {
    //get accessories from local storage
    const accessoryString = localStorage.getItem('accessories');
    const accessoryArray = accessoryString ? JSON.parse(accessoryString) : [];

    setAccessories(accessoryArray);

    //get engraving books from local storage
    const bookString = localStorage.getItem('engraving-book');
    const bookArray = bookString ? JSON.parse(bookString) : [];

    setBooks(bookArray);

    //get ability stones from local storage
    const stoneString = localStorage.getItem('ability-stones');
    const stoneArray = stoneString ? JSON.parse(stoneString) : [];

    setStones(stoneArray);
  }, []);
  
  const handleSubmit = useCallback(() => {
    const getBuilds = new Promise<void>(async (resolve, reject) => {
      try {
        setIsLoading(true);
        const query = new URLSearchParams({ 
          data: JSON.stringify({
            accessories: accessories,
            engravingBooks: books,
            abilityStones: stones,
          }),
          desiredEngravings: JSON.stringify(desiredEngravings),
        }).toString();
        const res = await fetch(`/api/builds?${query}`);
        const fetchedData = await res.json();
        setBuilds(fetchedData);
        console.log('fetched data:', fetchedData);
      } catch (error) {
        console.error('Error fetching data:', error);
        reject();
      } finally {
        setIsLoading(false);
        resolve()
      }
    });
    toast.promise(getBuilds, {
      success: { title: 'Builds created!', description: 'Please check them out.', duration: 3000, isClosable: true },
      error: { title: 'Oops, something went wrong!', description: 'Please try again later.', duration: 3000, isClosable: true },
      loading: { title: 'Generating builds...', description: 'Please wait.' },
    });
  }, [accessories, books, stones, desiredEngravings, toast]);  


  // const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
  //   const { name, value } = e.target;
  //   setDesiredEngravings({
  //     ...desiredEngravings,
  //     [name]: value,
  //   })
  // }

  const handleChange = (e: string, v: string) => setDesiredEngravings({ ...desiredEngravings, [e]: v});

  const handleClear = () => setDesiredEngravings(dataInitialState);


  const setItemData: Function = (e: any, func: (e: any) => void): void => { func(e) }

  const engravingOptions = useMemo(() => {
    return Object.entries(engravings).map(([key, value]) => (
      <SelectItem key={key} value={key}>{value}</SelectItem>
    ));
  }, []);

  const combatEngravingOptions = useMemo(() => {
    return Object.entries(combatEngravings).map(([key, value]) => (
      <SelectItem key={key} value={key}>{value}</SelectItem>
    ))
  }, []);

  return (
    <main className="flex min-h-screen flex-col p-24">
      <Flex gap="6" flexDirection="row" flex={1} className="max-h-[800px]">
        <Box gap="4" className="w-1/3">
          <AddAccessory engravingOptions={engravingOptions} setItemData={(e) => setItemData(e, setAccessories)} />
        </Box>
        <Flex flexDirection="column" className="w-1/3" justify="space-between">
          <Box gap="4">
            <AddEngravingBook engravingOptions={engravingOptions} setItemData={(e) => setItemData(e, setBooks)} />
          </Box>
          <Box gap="4" className="mt-6">
            <AddAbilityStone engravingOptions={combatEngravingOptions} setItemData={(e) => setItemData(e, setStones)}/>
          </Box>
        </Flex>
        <Flex gap="4" flexDirection="column" className="w-1/3">
            <SelectEngraving 
              engravingOptions={engravingOptions} 
              desiredEngravings={desiredEngravings}
              handleChange={(e: string, v: string) => handleChange(e, v)}
              onClear={handleClear}
              onSubmit={handleSubmit}
            />
          </Flex>
      </Flex>
        {/* {builds?.length && (
          <Flex flexDirection="column" className="flex-wrap">
              {builds.map((value, index) => (
                <Flex key={index} flexDirection="row" gap="4" className="py-6">
                    {Object.entries(value.levels).map(([key, value]) => (
                      <div key={key}>{value}</div>
                    ))}
                    <div>{value.build.necklace.engravingOne.name}</div>
                    <div>{value.build.necklace.engravingOne.value}</div>
                    <div>{value.build.necklace.engravingTwo.name}</div>
                    <div>{value.build.necklace.engravingTwo.value}</div>

                    <div>{value.build.earringOne.engravingOne.name}</div>
                    <div>{value.build.earringOne.engravingOne.value}</div>
                    <div>{value.build.earringOne.engravingTwo.name}</div>
                    <div>{value.build.earringOne.engravingTwo.value}</div>

                    <div>{value.build.earringTwo.engravingOne.name}</div>
                    <div>{value.build.earringTwo.engravingOne.value}</div>
                    <div>{value.build.earringTwo.engravingTwo.name}</div>
                    <div>{value.build.earringTwo.engravingTwo.value}</div>

                    <div>{value.build.ringOne.engravingOne.name}</div>
                    <div>{value.build.ringOne.engravingOne.value}</div>
                    <div>{value.build.ringOne.engravingTwo.name}</div>
                    <div>{value.build.ringOne.engravingTwo.value}</div>

                    <div>{value.build.ringTwo.engravingOne.name}</div>
                    <div>{value.build.ringTwo.engravingOne.value}</div>
                    <div>{value.build.ringTwo.engravingTwo.name}</div>
                    <div>{value.build.ringTwo.engravingTwo.value}</div>

                    <div>{value.build.engravingBookOne.name}</div>
                    <div>{value.build.engravingBookOne.value}</div>
                    <div>{value.build.engravingBookTwo.name}</div>
                    <div>{value.build.engravingBookTwo.value}</div>

                    <div>{value.build.abilityStone.engravingOne.name}</div>
                    <div>{value.build.abilityStone.engravingOne.value}</div>
                    <div>{value.build.abilityStone.engravingTwo.name}</div>
                    <div>{value.build.abilityStone.engravingTwo.value}</div>
                </Flex>
              ))}
          </Flex>
        )} */}
    </main>
  );
}
