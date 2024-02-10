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
import SubmitButton from './components/buttons/SubmitButton';
import { Separator } from "@/components/ui/separator";
import List from './components/List';
import PuffLoader from "react-spinners/PuffLoader";

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
    necklaceOne: '',
    necklaceTwo: '',
    earringOne: '',
    earringTwo: '',
    ringOne: '',
    ringTwo: '',
  }
  const [desiredEngravings, setDesiredEngravings] = useState(dataInitialState);
  const [desiredStats, setDesiredStats] = useState(statsInitialState)
  const [builds, setBuilds] = useState<EngravingLevels[]>([]);
  const [accessories, setAccessories] = useState([]);
  const [books, setBooks] = useState([]);
  const [stones, setStones] = useState([]);
  const [showNoBuilds, setShowNoBuilds] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    // Function to get data from local storage
    const getDataFromLocalStorage = (key: string) => {
      const dataString = localStorage.getItem(key);
      return dataString ? JSON.parse(dataString) : [];
    };
  
    // Array of local storage keys
    const localStorageKeys = ['accessories', 'engraving-book', 'ability-stones'];
  
    // Use Promise.all to wait for all local storage operations
    Promise.all(localStorageKeys.map(key => getDataFromLocalStorage(key)))
      .then(([accessoryArray, bookArray, stoneArray]) => {
        // Set state with the data obtained from local storage
        setAccessories(accessoryArray);
        setBooks(bookArray);
        setStones(stoneArray);
  
        // Set loading to false after all operations are completed
        setIsLoading(false);
      })
      .catch((error) => {
        // Handle errors if needed
        console.error('Error fetching data:', error);
        setIsLoading(false);
      });
  }, []);

  // const fetchData = useMemo(() => {
  //   return new Promise(async (resolve, reject) => {
  //     try {
  //       const res = await fetch('/api/builds/', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({
  //           accessories: accessories,
  //           engravingBooks: books,
  //           abilityStones: stones,
  //           desiredEngravings: desiredEngravings,
  //           combatStats: desiredStats,
  //         })
  //       })
  //       const fetchedData = await res.json();
  //       console.log('fetchedData: ', fetchedData);
  //       resolve(fetchedData);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //       reject(error);
  //     }
  //   });
  // }, [accessories, books, desiredEngravings, desiredStats, stones]);
  
  const handleSubmit = useCallback(() => {
    const getBuilds = new Promise<void>(async (resolve, reject) => {
      try {
        setIsLoading(true);
        const res = await fetch('/api/builds/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            accessories: accessories,
            engravingBooks: books,
            abilityStones: stones,
            desiredEngravings: desiredEngravings,
            combatStats: desiredStats,
          })
        })
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
  }, [accessories, books, stones, desiredEngravings, toast, desiredStats]);  

  const handleEngravingChange = (e: string, v: string) => setDesiredEngravings({ ...desiredEngravings, [e]: v});
  const handleStatChange = (e: string, v: string) => setDesiredStats({ ...desiredStats, [e]: v});

  const handleEngravingClear = () => {
    setDesiredEngravings(dataInitialState);
  }

  const handleStatClear = () => {
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

  return (
    <>
    {isLoading ? <Loading /> :
    <EngravingContext.Provider value={engravings}>
      <main className="flex min-h-screen md:w-[1500px] flex-col py-24">
        <AddAccessory setItemData={(e) => setItemData(e, setAccessories)} />
        <AddEngravingBook setItemData={(e) => setItemData(e, setBooks)} />
        <AddAbilityStone engravingOptions={combatEngravings} setItemData={(e) => setItemData(e, setStones)}/>
        <Flex gap="6" flexDirection="row" flex={1} marginBottom={6}>
          <Box gap="4" className="w-1/3">
            <ModalButton onClick={onAddAccessory} label='Add Accessory' />
            <List data={accessories} setItemData={(e) => setItemData(e, setAccessories)} />
          </Box>
          <Box gap="4" className="w-1/3">
            <ModalButton onClick={onAddEngravingBook} label='Add engraving book' />
            <List data={books} setItemData={(e) => setItemData(e, setBooks)} />
          </Box>
          <Box gap="4" className="w-1/3">
            <ModalButton onClick={onAddAbilityStone} label='Add ability stone' />
            <List data={stones} setItemData={(e) => setItemData(e, setStones)} />
          </Box>
        </Flex>
        <Card className='border'>
          <Flex flexDirection='column'>
            <Flex>
              <Box>
                <SelectBuild 
                  label='Choose engravings'
                  description='Select the engravings/combat stats for your final build.'
                  inputLabel='Select engraving'
                  options={engravings}
                  selected={desiredEngravings}
                  handleChange={(e: string, v: string) => handleEngravingChange(e, v)}
                  onClear={handleEngravingClear}
                />
              </Box>
              <Box className='py-6'>
                <Separator orientation="vertical" />
              </Box>
              <Box>
              <SelectBuild 
                  label='Choose combat stats'
                  description='Select the combat stats you prefer for each accessory in your final build.'
                  inputLabel='Select combat stat'
                  options={getCombatStats()}
                  selected={desiredStats}
                  handleChange={(e: string, v: string) => handleStatChange(e, v)}
                  onClear={handleStatClear}
                />
              </Box>
              <Box className='py-6'>
                <Separator orientation="vertical" />
              </Box>
              <Box className='flex flex-col grow' p={6}>
                <Box className='self-center' maxW="300px">
                  <Text fontSize='3xl' className='self-start' >Note:</Text>
                  <Text fontSize='sm'>
                    Some of your preferred builds may not be generated if the necessary accessories are not available. 
                    This generator will only show the best possible build with the acessories you provide it.
                  </Text>
                </Box>
                <Box className='flex grow top-0 content-end flex-wrap justify-end'>
                  <SubmitButton label='Generate' onClick={handleSubmit} classes='w-full' />
                </Box>
              </Box>
            </Flex>
            <Box>
              {builds.length > 0 && (
                <>
                  <Box className='px-6 py-4'>
                    <Separator orientation="horizontal" />
                  </Box>
                  <Flex p={6}>
                    <Box className='w-3/4'>
                      <ScrollArea className="h-[600px] pr-4">
                        {builds.length && builds[0].levels.three.map((item, index) => (
                            <EngravingLine engraving={item[0] as string} value={item[1] as number} key={index} />
                        ))}
                        {builds.length && builds[0].levels.two.map((item, index) => (
                          <Box key={index}>
                            <EngravingLine engraving={item[0] as string} value={item[1] as number} key={index} />
                          </Box>
                        ))}
                        {builds.length && builds[0].levels.one.map((item, index) => (
                          <Box key={index}>
                            <EngravingLine engraving={item[0] as string} value={item[1] as number} key={index} />
                          </Box>
                        ))}
                        {builds.length && builds[0].levels.zero.map((item, index) => (
                          <Box key={index}>
                            <EngravingLine engraving={item[0] as string} value={item[1] as number} key={index} />
                          </Box>
                        ))}
                      </ScrollArea>
                    </Box>
                    <Flex flexDirection='column' className="w-1/4 px-4 text-center">
                      <ItemList build={builds[0].build} />
                    </Flex>
                  </Flex>
                </>
                )}
                {!builds.length && showNoBuilds && (
                  <>
                    <Box className='px-6 py-4'>
                      <Separator orientation="horizontal" />
                    </Box>
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
                  </>
                )}
            </Box>
          </Flex>
        </Card>
      </main>
    </EngravingContext.Provider>
    }
    </>
  );
}

const Loading = () => {
  return (
      <Box className='absolute bg-black opacity-70 flex h-full w-full place-content-center items-center '>
          <PuffLoader color="#ffffff" loading={true} className='opacity-100 z-50'/>
      </Box>
  )
}
