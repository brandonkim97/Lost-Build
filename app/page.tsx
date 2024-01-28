'use client';
import Image from "next/image";
import axios from "axios";
import { Button, ButtonGroup, ListItem, Select, UnorderedList } from '@chakra-ui/react'
import { ChangeEvent, useEffect, useState } from "react";
import getMockData from "./utils/getMockData";
import { engravings } from "./libs/getEngravings";
import { Build } from "./types";

export default function Home() {
  const [data, setData] = useState({});
  const [desiredEngravings, setDesiredEngravings] = useState({
    engravingOne: '',
    engravingTwo: '',
    engravingThree: '',
    engravingFour: '',
    engravingFive: '',
    engravingSix: '',
  });
  const [builds, setBuilds] = useState<Build[]>([]);

  useEffect(() => {
    const getData = async () => {
      const d = await getMockData();
      localStorage.setItem('testKey', JSON.stringify(d));
      const stored = localStorage.getItem('testKey');
      const parsed = stored ? JSON.parse(stored) : null;
      setData(parsed);
    }
    getData();
  }, []);
  
  const handleSubmit = async () => {
    const query = new URLSearchParams({ 
      data: JSON.stringify(data),
      desiredEngravings: JSON.stringify(desiredEngravings),
    }).toString();
    const res = await fetch(`/api/builds?${query}`);
    const d = await res.json();
    setBuilds(d);
  };  

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setDesiredEngravings({
      ...desiredEngravings,
      [name]: value,
    })
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="flex w-full gap-4">
        <div className="mb-4 w-1/2 gap-4 flex flex-col">
          <Select placeholder='Select engraving' onChange={handleChange} name="engravingOne">
            {Object.entries(engravings).map(([key, value]) => (
              <option key={key} value={key}>{value}</option>
            ))}
          </Select>
          <Select placeholder='Select engraving' onChange={handleChange} name="engravingTwo">
            {Object.entries(engravings).map(([key, value]) => (
              <option key={key} value={key}>{value}</option>
            ))}
          </Select>
          <Select placeholder='Select engraving' onChange={handleChange} name="engravingThree">
            {Object.entries(engravings).map(([key, value]) => (
              <option key={key} value={key}>{value}</option>
            ))}
          </Select>
          <Select placeholder='Select engraving' onChange={handleChange} name="engravingFour">
            {Object.entries(engravings).map(([key, value]) => (
              <option key={key} value={key}>{value}</option>
            ))}
          </Select>
          <Select placeholder='Select engraving' onChange={handleChange} name="engravingFive">
            {Object.entries(engravings).map(([key, value]) => (
              <option key={key} value={key}>{value}</option>
            ))}
          </Select>
          <Select placeholder='Select engraving' onChange={handleChange} name="engravingSix">
            {Object.entries(engravings).map(([key, value]) => (
              <option key={key} value={key}>{value}</option>
            ))}
          </Select>
        </div>
        <Button colorScheme='teal' size='sm' variant="outline" onClick={handleSubmit}>
          Generate
        </Button>
      </div>
      <div>
          {Object.entries(builds).map(([key, value]) => (
            <div key={key}>
              {value}
            </div>
          ))}
      </div>
    </main>
  );
}
