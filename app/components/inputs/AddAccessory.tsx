'use client';
import { getCombatStat, getCombatStats, getReduce, getReduction, getType } from '../../libs/getItemData';
import SliderInput from "../SliderInput";
import { Box, Flex, Image, Text } from '@chakra-ui/react'
import { useCallback, useContext, useEffect, useState } from "react";
import { getEngravingLevels } from '@/app/libs/getEngravingData';
import { formatAccessory } from '@/app/utils/formatData';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import Modal from '../modals/Modal';
import useAddAccessoryModal from '@/app/hooks/useAddAccessoryModal';
import EngravingContext from '@/app/contexts/EngravingContext';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { ZodType, z } from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import FormInput from '../form/FormInput';
import { Accessory } from '@/app/types';
import updateFavorites from '@/app/utils/updateFavorites';

interface AddAccessoryProps  {
    setItemData: (e: any) => void;
    setFavorite: (e: any) => void;
}

type DataType = {
  [key: string]: string | number | undefined;
}

export interface AddAccessoryData {
  uid?: number;
  combatOne: string,
  combatTwo?: string,
  combatOneValue: number | string,
  combatTwoValue?: number | string,
  engravingOne: string,
  engravingTwo: string,
  engravingOneValue: number,
  engravingTwoValue: number,
  reduction: string,
  reductionValue:  number | string,
  type: string,
}

const FormSchema: ZodType<AddAccessoryData> = z.object({
  uid: z.number().optional(),
  combatOne: z.string({
    required_error: "Please select a combat stat.",
  }),
  combatTwo: z.string({
    required_error: "Please select a combat stat.",
  }).optional(),
  combatOneValue: z.number({
    required_error: "Please select a value.",
  }),
  combatTwoValue: z.number({
    required_error: "Please select a value.",
  }).optional(),
  engravingOne: z.string({
    required_error: "Please select an engraving.",
  }),
  engravingTwo: z.string({
    required_error: "Please select an engraving.",
  }),
  engravingOneValue: z.number({
    required_error: "Please select a value.",
  }),
  engravingTwoValue: z.number({
    required_error: "Please select a value.",
  }),
  reduction: z.string({
    required_error: "Please select a reduction.",
  }),
  reductionValue: z.number({
    required_error: "Please select a value.",
  }),
  type: z.string({
    required_error: "Please select a type.",
  }),
});
  
  
const AddAccessory: React.FC<AddAccessoryProps> = ({
  setItemData,
  setFavorite,
}) => {
  const engravingOptions = useContext(EngravingContext);
  const addAccessoryModal = useAddAccessoryModal();
  const { isEdit, item, index } = addAccessoryModal;
  const form = useForm<AddAccessoryData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      combatOneValue: 160,
      combatTwoValue: 160,
      reductionValue: 1,
    },
  })
  const [stats, setStats] = useState({
    min: 0,
    max: 500,
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      const load = async () => {
        if (item && typeof item !== 'undefined') {
          form.setValue('type', item.type);
          form.setValue('combatOne', item.combatOne.name);
          form.setValue('combatTwo', item.combatTwo?.name);
          form.setValue('combatOneValue', item.combatOne.value);
          form.setValue('combatTwoValue', item.combatTwo?.value);
          form.setValue('engravingOne', item.engravingOne.name);
          form.setValue('engravingTwo', item.engravingTwo.name);
          form.setValue('engravingOneValue', item.engravingOne.value);
          form.setValue('engravingTwoValue', item.engravingTwo.value);
          form.setValue('reduction', item.reduction.name);
          form.setValue('reductionValue', item.reduction.value);
          form.setValue('uid', item.uid);
        }
      }
      await load()
      .then(() => {
        setIsLoading(false);
      });
    }

    loadData();
  }, [item, form]);


  
  // const handleChange = useCallback((e: string, v: string) => e !== 'type' ? setData({ ...data, [e]: v }) : setData({ ...dataInitialState, [e]: v }), [data, dataInitialState]);

  const handleChange = useCallback((e: any, v: any) => {
    const parsed = parseString(e, v);
    form.setValue(e, parsed);
  }, [form]);


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

  const onSubmit = (d: any) => {
    setIsLoading(true);
    console.log('submitting', isEdit)
    if (!isEdit) d.uid = Date.now();
    const existingArrayString = localStorage.getItem('accessories');
    const existingArray = existingArrayString ? JSON.parse(existingArrayString) : [];

    //format data
    const formattedAccessory = formatAccessory(d)
    // Add new data to the array
    if (isEdit) {
      existingArray[index as number] = formattedAccessory;
      const favorites = localStorage.getItem('favorites');
      const favoritesObj = favorites ? JSON.parse(favorites) : null;
      if (formattedAccessory) {
        const updatedFavorites = updateFavorites(favoritesObj, formattedAccessory as Accessory, formattedAccessory.type);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        setFavorite(updatedFavorites);
      }
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
      form.reset();
  }

  const handleClose = () => {
    form.reset();
    addAccessoryModal.onClose();
  }

  const description = addAccessoryModal.isEdit ? 
    'Edit this accessory from your character.' :
    'Add your accessories from your characters.'
  ;

  const values = form.watch();


  useEffect(() => {
    if (values.type === 'NECKLACE') {
      setStats({
        min: 400,
        max: 500,
      })
    }
    else if (values.type === 'EARRING') {
      setStats({
        min: 240,
        max: 300,
      })
    }
    else if (values.type === 'RING') {
      setStats({
        min: 160,
        max: 200,
      })
    }
  }, [values.type, form]);


  const handleAccessoryChange = (v: string) => {
    form.setValue('type', v);
    if (v === 'NECKLACE') {
      form.setValue('combatOneValue', 400);
      form.setValue('combatTwoValue', 400);
      setStats({
        min: 400,
        max: 500,
      })
    }
    else if (v === 'EARRING') {
      form.setValue('combatOneValue', 240);
      setStats({
        min: 240,
        max: 300,
      })
    }
    else if (v === 'RING') {
      form.setValue('combatOneValue', 160);
      setStats({
        min: 160,
        max: 200,
      })
    }
  }

  const AccessoryTypes = () => (
    <FormField
      control={form.control}
      name="type"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Accessory Type</FormLabel>
          <Flex flexDirection="column">
            <Flex gap={4} className="justify-between px-16">
              {['NECKLACE', 'EARRING', 'RING'].map((type) => (
                <FormControl key={type}>
                  <Box
                    as="button"
                    type="button"
                    tabIndex={0}
                    className={`rounded-xl hover:cursor-pointer hover:scale-110 ease-out duration-300 border-2
                      ${field.value === type ? 'border-green-600' : ''}
                    `}
                    onClick={() => handleAccessoryChange(type)}
                    onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        handleAccessoryChange(type);
                      }
                    }}
                  >
                    <Image
                      src={`/images/${type.toLowerCase()}2_icon.webp`}
                      alt={`Choose ${type} Icon`}
                      className="rounded-xl"
                    />
                  </Box>
                </FormControl>
              ))}
            </Flex>
            <FormMessage className='mt-2' />
          </Flex>
        </FormItem>
      )}
    />
  );


  const bodyContent = (
    <Card>
      <CardHeader>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <Flex gap="4" flexDirection="column">
                <AccessoryTypes />
                <FormInput 
                  control={form.control}
                  name='combatOne'
                  label='Select combat stat'
                  value={values.combatOne}
                  handleChange={handleChange}
                  getOptions={getCombatStats}
                  getValue={getCombatStat}
                />
              <SliderInput 
                max={stats.max} 
                min={stats.min}
                name="combatOneValue"
                value={values.combatOneValue}
                onChange={handleChange} 
              />
              {values.type === 'NECKLACE' && (
                <>
                <FormInput 
                  control={form.control}
                  name='combatTwo'
                  label='Select combat stat'
                  value={values.combatTwo}
                  handleChange={handleChange}
                  getOptions={getCombatStats}
                  getValue={getCombatStat}
                />
                  <SliderInput 
                    max={stats.max} 
                    min={stats.min}
                    name="combatTwoValue"
                    value={values.combatTwoValue}
                    onChange={handleChange} 
                  />
                </>
              )}
              <FormInput 
                  control={form.control}
                  name='engravingOne'
                  label='Select engraving 1'
                  value={values.engravingOne}
                  handleChange={handleChange}
                  getOptions={() => engravingOptions}
                  getValue={engravingOptions}
              />
              <FormInput 
                  control={form.control}
                  name='engravingOneValue'
                  label='Select engraving 1 level'
                  value={values.engravingOneValue}
                  handleChange={handleChange}
                  getOptions={getEngravingLevels}
                  getValue={values.engravingOneValue}
              />
              <FormInput 
                  control={form.control}
                  name='engravingTwo'
                  label='Select engraving 2'
                  value={values.engravingTwo}
                  handleChange={handleChange}
                  getOptions={() => engravingOptions}
                  getValue={engravingOptions}
              />
              <FormInput 
                  control={form.control}
                  name='engravingTwoValue'
                  label='Select engraving 2 level'
                  value={values.engravingTwoValue}
                  handleChange={handleChange}
                  getOptions={getEngravingLevels}
                  getValue={values.engravingTwoValue}
              />
              <FormInput 
                  control={form.control}
                  name='reduction'
                  label='Select reduction'
                  value={values.reduction}
                  handleChange={handleChange}
                  getOptions={getReduction}
                  getValue={getReduce}
              />
              <SliderInput
                min={1} 
                max={3} 
                name="reductionValue"
                value={values.reductionValue}
                onChange={handleChange} 
              />
            </Flex>
          </form>
        </Form>
      </CardContent>
    </Card>
  );


  //edit mode
  if (addAccessoryModal.isEdit) {
    return (
      <Modal
        isOpen={addAccessoryModal.isOpen}
        onClose={handleClose}
        onSubmit={form.handleSubmit(onSubmit)}
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
      onSubmit={form.handleSubmit(onSubmit)}
      actionLabel="Submit"
      secondaryAction={handleClear}
      secondaryActionLabel='Clear'
      title="Add accessory"
      body={bodyContent}
    />
  )
}

export default AddAccessory;