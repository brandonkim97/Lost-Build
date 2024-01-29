'use client';
import Image from "next/image";
import axios from "axios";
import { Button, Flex, FormControl } from '@chakra-ui/react'
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import getMockData from "./utils/getMockData";
import { combatEngravings, engravings } from "./libs/getEngravingData";
import { Accessory, Build } from "./types";
import Input from "./components/inputs/Input";
import AddAccessory, { AddAccessoryData } from "./components/inputs/AddAccessory";
import AddEngravingBook from "./components/inputs/AddEngravingBook";
import AddAbilityStone from "./components/inputs/AddAbilityStone";

interface EngravingLevels {
  levels: { [key: string]: number };
  build: Build;
}

export default function Home() {
  const [desiredEngravings, setDesiredEngravings] = useState({
    engravingOne: '',
    engravingTwo: '',
    engravingThree: '',
    engravingFour: '',
    engravingFive: '',
    engravingSix: '',
  });
  const [builds, setBuilds] = useState<EngravingLevels[]>([]);
  const [accessories, setAccessories] = useState([]);
  const [books, setBooks] = useState([]);
  const [stones, setStones] = useState([]);

  useEffect(() => {
    console.log('update all storages...');
    //get accessories from local storage
    const accessoryString = localStorage.getItem('accessories');
    const accessoryArray = accessoryString ? JSON.parse(accessoryString) : [];

    if (accessoryArray.length === 0) return;

    setAccessories(accessoryArray);

    //get engraving books from local storage
    const bookString = localStorage.getItem('engraving-book');
    const bookArray = bookString ? JSON.parse(bookString) : [];

    if (bookArray.length === 0) return;

    setBooks(bookArray);

    //get ability stones from local storage
    const stoneString = localStorage.getItem('ability-stones');
    const stoneArray = stoneString ? JSON.parse(stoneString) : [];

    if (stoneArray.length === 0) return;

    setStones(stoneArray);
  }, []);
  
  const handleSubmit = useCallback(async () => {
    try {
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
    }
  }, [accessories, books, stones, desiredEngravings]);  


  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setDesiredEngravings({
      ...desiredEngravings,
      [name]: value,
    })
  }

  const engravingOptions = useMemo(() => {
    return Object.entries(engravings).map(([key, value]) => (
      <option key={key} value={key}>{value}</option>
    ));
  }, []);

  const combatEngravingOptions = useMemo(() => {
    return Object.entries(combatEngravings).map(([key, value]) => (
      <option key={key} value={key}>{value}</option>
    ))
  }, []);

  return (
    <main className="flex min-h-screen flex-col p-24">
      <Flex gap="8" flexDirection="column">
        <Flex gap="4" flexDirection="column" className="my-6">
          <AddAccessory engravingOptions={engravingOptions} />
        </Flex>
        <Flex>
          <AddEngravingBook engravingOptions={engravingOptions} />
        </Flex>
        <Flex>
          <AddAbilityStone engravingOptions={combatEngravingOptions} />
        </Flex>
        <div className="mb-4 gap-4 flex flex-col">
          <Flex gap="4" flexDirection="column">
            <Input 
              label="Select engraving"
              name="engravingOne"
              options={engravingOptions}
              onChange={handleChange}
              value={desiredEngravings.engravingOne}
              required
            />
            <Input 
              label="Select engraving"
              name="engravingTwo"
              options={engravingOptions}
              onChange={handleChange}
              value={desiredEngravings.engravingTwo}
              required
            />
            <Input 
              label="Select engraving"
              name="engravingThree"
              options={engravingOptions}
              onChange={handleChange}
              value={desiredEngravings.engravingThree}
              required
            />
            <Input 
              label="Select engraving"
              name="engravingFour"
              options={engravingOptions}
              onChange={handleChange}
              value={desiredEngravings.engravingFour}
              required
            />
            <Input 
              label="Select engraving"
              name="engravingFive"
              options={engravingOptions}
              onChange={handleChange}
              value={desiredEngravings.engravingFive}
              required
            />
            <Input 
              label="Select engraving"
              name="engravingSix"
              options={engravingOptions}
              onChange={handleChange}
              value={desiredEngravings.engravingSix}
              required
            />
          </Flex>
          <Button colorScheme='' size='sm' variant="outline" onClick={handleSubmit}>
            Generate
          </Button>
        </div>
        {builds?.length && (
          <Flex flexDirection="column" className="flex-wrap">
              {builds.map((value, index) => (
                <Flex key={index} flexDirection="row" gap="4" className="py-6">
                    {Object.entries(value.levels).map(([key, value]) => (
                      <div key={key}>{value}</div>
                    ))}
                    {/* <div>{value.build.necklace.engravingOne.name}</div>
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
                    <div>{value.build.abilityStone.engravingTwo.value}</div> */}
                </Flex>
              ))}
          </Flex>
        )}
      </Flex>
    </main>
  );
}
