'use client';
import Image from "next/image";
import axios from "axios";
import { Button, Flex, FormControl } from '@chakra-ui/react'
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import getMockData from "./utils/getMockData";
import { engravings } from "./libs/getEngravingData";
import { Accessory, Build } from "./types";
import Input from "./components/inputs/Input";
import AddAccessory, { AddAccessoryData } from "./components/inputs/AddAccessory";
import { formatAccessories } from "./utils/formatData";
import AddEngravingBook from "./components/inputs/AddEngravingBook";

export default function Home() {
  const [desiredEngravings, setDesiredEngravings] = useState({
    engravingOne: '',
    engravingTwo: '',
    engravingThree: '',
    engravingFour: '',
    engravingFive: '',
    engravingSix: '',
  });
  const [builds, setBuilds] = useState<Build[]>([]);
  const [accessories, setAccessories] = useState([]);

  useEffect(() => {
    console.log('update all storages...');
    //get accessories from local storage
    const accessoryString = localStorage.getItem('accessories');
    const accessoryArray = accessoryString ? JSON.parse(accessoryString) : [];

    if (accessoryArray.length === 0) return;

    // format accessories
    const formattedAccessories = formatAccessories(accessoryArray)

    setAccessories(formattedAccessories);

    //get engraving books from local storage
    const bookString = localStorage.getItem('accessories');
    const bookArray = accessoryString ? JSON.parse(accessoryString) : [];

    if (bookArray.length === 0) return;

    setAccessories(bookArray);

    //get ability stones from local storage
  }, []);
  
  const handleSubmit = useCallback(async () => {
    try {
      const query = new URLSearchParams({ 
        data: JSON.stringify(accessories),
        desiredEngravings: JSON.stringify(desiredEngravings),
      }).toString();
      const res = await fetch(`/api/builds?${query}`);
      const fetchedData = await res.json();
      setBuilds(fetchedData);
      console.log('fetched data:', fetchedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [accessories, desiredEngravings]);  


  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setDesiredEngravings({
      ...desiredEngravings,
      [name]: value,
    })
  }

  const engravingOptions = useMemo(() => {
    return Object.entries(engravings).map(([key, value]) => (
      <option key={key} value={value}>{value}</option>
    ));
  }, []);

  return (
    <main className="flex min-h-screen flex-col p-24">
      <Flex gap="4" flexDirection="column" className="my-6">
        <AddAccessory engravingOptions={engravingOptions} />
      </Flex>
      <Flex>
        <AddEngravingBook engravingOptions={engravingOptions} />
      </Flex>
      <div className="mb-4 gap-4 flex flex-col">
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
          <Button colorScheme='' size='sm' variant="outline" onClick={handleSubmit}>
            Generate
          </Button>
      </div>
      <div>
          {Object.entries(builds).map(([key, value]) => (
            <div key={key} className="flex flex-col gap-8 py-6 flex-wrap">
              {/* <div>{value.necklace.engravingOne.name}</div>
              <div>{value.necklace.engravingOne.value}</div>
              <div>{value.necklace.engravingTwo.name}</div>
              <div>{value.necklace.engravingTwo.value}</div>

              <div>{value.earringOne.engravingOne.name}</div>
              <div>{value.earringOne.engravingOne.value}</div>
              <div>{value.earringOne.engravingTwo.name}</div>
              <div>{value.earringOne.engravingTwo.value}</div>

              <div>{value.earringTwo.engravingOne.name}</div>
              <div>{value.earringTwo.engravingOne.value}</div>
              <div>{value.earringTwo.engravingTwo.name}</div>
              <div>{value.earringTwo.engravingTwo.value}</div>

              <div>{value.ringOne.engravingOne.name}</div>
              <div>{value.ringOne.engravingOne.value}</div>
              <div>{value.ringTwo.engravingTwo.name}</div>
              <div>{value.ringTwo.engravingTwo.value}</div>

              <div>{value.engravingBookOne.name}</div>
              <div>{value.engravingBookOne.value}</div>
              <div>{value.engravingBookTwo.name}</div>
              <div>{value.engravingBookTwo.value}</div>

              <div>{value.abilityStone.engravingOne.name}</div>
              <div>{value.abilityStone.engravingOne.value}</div>
              <div>{value.abilityStone.engravingTwo.name}</div>
              <div>{value.abilityStone.engravingTwo.value}</div> */}
            </div>
          ))}
      </div>
    </main>
  );
}
