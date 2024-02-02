'use client';
import { Box, Button, Flex, FormControl, Text, Image } from '@chakra-ui/react'
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import getMockData from "./utils/getMockData";
import { combatEngravings, engravings } from "./libs/getEngravingData";
import { Accessory, Build } from "./types";
import Input from "./components/inputs/Input";
import AddAccessory, { AddAccessoryData } from "./components/inputs/AddAccessory";
import AddEngravingBook from "./components/inputs/AddEngravingBook";
import AddAbilityStone from "./components/inputs/AddAbilityStone";
import SelectEngraving from "./components/inputs/SelectBuild";
import { useToast } from "@chakra-ui/react";
import { SelectItem } from "@/components/ui/select";
import useAddAccessoryModal from "./hooks/useAddAccessoryModal";
import ModalButton from "./components/buttons/ModalButton";
import useAddEngravingBookModal from "./hooks/useAddEngravingBookModal";
import useAddAbilityStoneModal from "./hooks/useAddAbilityStoneModal";
import { Card } from "@/components/ui/card";
import EngravingLine from "./components/engraving/EngravingLine";
import { ScrollArea } from "@/components/ui/scroll-area"
import ItemList from "./components/items/ItemList";
import { formatLevels } from "./utils/formatData";
import EngravingContext from "./contexts/EngravingContext";
import SelectBuild from './components/inputs/SelectBuild';
import { getCombatStats } from './libs/getItemData';

interface EngravingLevels {
  levels: { [key: string]: (string | number)[][] };
  build: Build;
}

export default function Home() {
  const addAccessoryModal = useAddAccessoryModal();
  const addEngravingBookModal = useAddEngravingBookModal();
  const addAbilityStoneModal = useAddAbilityStoneModal();
  const dataInitialState = {
    engravingOne: '',
    engravingTwo: '',
    engravingThree: '',
    engravingFour: '',
    engravingFive: '',
    engravingSix: '',
  };
  const statsInitialState = {
    combatOne: '',
    combatTwo: '',
  }
  const [desiredEngravings, setDesiredEngravings] = useState(dataInitialState);
  const [desiredStats, setDesiredStats] = useState(statsInitialState)
  const [builds, setBuilds] = useState<EngravingLevels[]>([]);
  const [accessories, setAccessories] = useState([]);
  const [books, setBooks] = useState([]);
  const [stones, setStones] = useState([]);
  const [showNoBuilds, setShowNoBuilds] = useState(false);
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
        const formattedData = await formatLevels(fetchedData)
        setShowNoBuilds(formattedData.length === 0);
        setBuilds(formattedData);
        console.log('fetched data:', formattedData);
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

  const handleEngravingChange = (e: string, v: string) => setDesiredEngravings({ ...desiredEngravings, [e]: v});
  const handleStatChange = (e: string, v: string) => setDesiredStats({ ...desiredStats, [e]: v});

  const handleClear = () => {
    setDesiredEngravings(dataInitialState);
    setDesiredStats(statsInitialState);
  }

  const onAddAccessory = useCallback(() => {
    return addAccessoryModal.onOpen();
  }, [addAccessoryModal]);

  const onAddEngravingBook = useCallback(() => {
    return addEngravingBookModal.onOpen();
  }, [addEngravingBookModal]);

  const onAddAbilityStone = useCallback(() => {
    return addAbilityStoneModal.onOpen();
  }, [addAbilityStoneModal]);


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

  const combatStatOptions = useMemo(() => {
    return Object.entries(getCombatStats()).map(([key, value]) => (
      <SelectItem key={key} value={key}>{value}</SelectItem>
    ))
  }, []);

  return (
    <EngravingContext.Provider value={engravings}>
      <main className="flex min-h-screen w-[1500px] flex-col py-24">
        <AddAccessory engravingOptions={engravingOptions} setItemData={(e) => setItemData(e, setAccessories)} />
        <AddEngravingBook engravingOptions={engravingOptions} setItemData={(e) => setItemData(e, setBooks)} />
        <AddAbilityStone engravingOptions={combatEngravingOptions} setItemData={(e) => setItemData(e, setStones)}/>
        <Flex gap="6" flexDirection="row" flex={1} className="max-h-[200px]">
          <Box gap="4" className="w-1/3">
            <ModalButton onClick={onAddAccessory} label='Add Accessory' />
          </Box>
          <Box gap="4" className="w-1/3">
            <ModalButton onClick={onAddEngravingBook} label='Add engraving book' />
          </Box>
          <Box gap="4" className="w-1/3">
            <ModalButton onClick={onAddAbilityStone} label='Add ability stone' />
          </Box>
        </Flex>
        <Card>
          <Flex flexDirection="row" className=''>
            <Box className='w-1/5'>
              <SelectBuild 
                engravingOptions={engravingOptions} 
                combatOptions={combatStatOptions}
                desiredEngravings={desiredEngravings}
                desiredStats={desiredStats}
                handleEngravingChange={(e: string, v: string) => handleEngravingChange(e, v)}
                handleStatChange={(e: string, v: string) => handleStatChange(e, v)}
                onClear={handleClear}
                onSubmit={handleSubmit}
              />
            </Box>
            <Box className='w-4/5'>
              {builds.length > 0 && (
                <Flex>
                  <Box className='w-3/4'>
                    <ScrollArea className="h-[600px] pr-4">
                      {builds.length && builds[0].levels.three.map((item, index) => (
                        <Box key={index}>
                          <EngravingLine engraving={item[0] as string} value={item[1] as number} />
                        </Box>
                      ))}
                      {builds.length && builds[0].levels.two.map((item, index) => (
                        <Box key={index}>
                          <EngravingLine engraving={item[0] as string} value={item[1] as number} />
                        </Box>
                      ))}
                      {builds.length && builds[0].levels.one.map((item, index) => (
                        <Box key={index}>
                          <EngravingLine engraving={item[0] as string} value={item[1] as number} />
                        </Box>
                      ))}
                      {builds.length && builds[0].levels.zero.map((item, index) => (
                        <Box key={index}>
                          <EngravingLine engraving={item[0] as string} value={item[1] as number} />
                        </Box>
                      ))}
                    </ScrollArea>
                  </Box>
                  <Flex flexDirection='column' className="w-1/4 px-4 py-6 text-center">
                    <ItemList build={builds[0].build} />
                  </Flex>
                </Flex>
                )}
                {!builds.length && showNoBuilds && (
                  <Flex className='h-full w-full justify-center items-center px-20' gap={20}>
                    <Box className='w-1/3'>
                      <Text fontSize='xl'>
                        <Text fontSize='4xl'>
                          Oops,
                        </Text>No builds could be generated. Try adding some more accessories!
                      </Text>
                    </Box>
                    <Box className='w-2/3'>
                      <Image src='/images/mokoko_fire.png' alt='No builds available' boxSize='300px' />
                    </Box>
                  </Flex>
                )}
            </Box>
          </Flex>
        </Card>
      </main>
    </EngravingContext.Provider>
  );
}
