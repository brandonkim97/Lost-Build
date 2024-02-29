import Input from "./Input";
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import { stoneLevels } from "@/app/libs/getEngravingData";
import { getReduce, getReduction } from "@/app/libs/getItemData";
import SliderInput from "../SliderInput";
import { formatStones } from "@/app/utils/formatData";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Flex } from "@chakra-ui/react";
import useAddAbilityStoneModal from "@/app/hooks/useAddAbilityStoneModal";
import Modal from "../modals/Modal";
import { CommandGroup, CommandItem } from "@/components/ui/command";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Check } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { ZodType, z } from "zod"
import { Form } from "@/components/ui/form"
import FormInput from '../form/FormInput';
import { AbilityStone } from "@/app/types";
import updateFavorites from "@/app/utils/updateFavorites";

interface AddAbilityStoneProps  {
    engravingOptions: { [key: string]: string };
    setItemData: (e: any) => void;
    setFavorite: (e: any) => void;
}

type DataType = {
    [key: string]: string | number | undefined;
}

export interface AddAbilityStoneData {
    uid?: number;
    engravingOne: string;
    engravingTwo: string;
    engravingOneValue: number;
    engravingTwoValue: number;
    reduction: string;
    reductionValue: number;
}

const FormSchema: ZodType<AddAbilityStoneData> = z.object({
    uid: z.number().optional(),
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
    })
});

const AddAbilityStone: React.FC<AddAbilityStoneProps> = ({
    engravingOptions,
    setItemData,
    setFavorite,
}) => {
    const addAbilityStoneModal = useAddAbilityStoneModal();
    const { isEdit, item, index } = addAbilityStoneModal;
    const [isLoading, setIsLoading] = useState(false);
    const form = useForm<AddAbilityStoneData>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            reductionValue: 0,
        }
    });

    useEffect(() => {
        setIsLoading(true);
        const loadData = async () => {
          const load = async () => {
            if (item && typeof item !== 'undefined') {
                console.log(item)
              form.setValue('engravingOne', item.engravingOne.name);
              form.setValue('engravingOneValue', item.engravingOne.value);
              form.setValue('engravingTwo', item.engravingTwo.name);
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

    
    // const handleChange = useCallback((e: string, v: string) => setStone({ ...stone, [e]: v}), [stone]);

    const handleChange = useCallback((e: any, v: any) => {
        const parsed = parseString(e, v);
        form.setValue(e, parsed);
    }, [form]);


    const parseString = (e: any, v: any) => {
        let res;
        switch(e) {
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

    const handleClear = () => {
        form.reset();
    }    

    const handleClose = () => {
        handleClear();
        addAbilityStoneModal.onClose();
    }

    const onSubmit = (d: any) => {
        //add validation
        if (!isEdit) d.uid = Date.now();
        const stoneString = localStorage.getItem('ability-stones');
        const stoneArray = stoneString ? JSON.parse(stoneString) : [];
        const formattedStone = formatStones(d);

        if (isEdit) {
            stoneArray[index as number] = formattedStone;
            const favorites = localStorage.getItem('favorites');
            const favoritesObj = favorites ? JSON.parse(favorites) : null;
            const updatedFavorites = updateFavorites(favoritesObj, formattedStone as AbilityStone, 'STONE');
            localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
            setFavorite(updatedFavorites);
        } else {
            stoneArray.push(formattedStone);
        }

        localStorage.setItem('ability-stones', JSON.stringify(stoneArray));
        setItemData(stoneArray);
        if (isEdit) addAbilityStoneModal.onClose();
        handleClear();
    }

    const values = form.watch();

    const bodyContent = (
        <Card>
            <CardHeader>
                <CardDescription>All your stones will be considered in the final builds.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <Flex gap="4" flexDirection="column">
                            <FormInput 
                                control={form.control}
                                name='engravingOne'
                                label='Select engraving'
                                value={values.engravingOne}
                                handleChange={handleChange}
                                getOptions={() => engravingOptions}
                                getValue={engravingOptions}
                            />
                            <FormInput 
                                control={form.control}
                                name='engravingOneValue'
                                label='Select level'
                                value={values.engravingOneValue}
                                handleChange={handleChange}
                                getOptions={() => stoneLevels}
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
                                label='Select level'
                                value={values.engravingTwoValue}
                                handleChange={handleChange}
                                getOptions={() => stoneLevels}
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
                                min={0} 
                                max={10} 
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

    if (addAbilityStoneModal.isEdit) {
        return (
            <Modal
                isOpen={addAbilityStoneModal.isOpen}
                onClose={handleClose}
                onSubmit={form.handleSubmit(onSubmit)}
                actionLabel="Edit"
                secondaryAction={handleClear}
                secondaryActionLabel='Clear'
                title="Edit ability stone"
                body={bodyContent}
            />
        )
    }

    return (
        <Modal
            isOpen={addAbilityStoneModal.isOpen}
            onClose={handleClose}
            onSubmit={form.handleSubmit(onSubmit)}
            actionLabel="Submit"
            secondaryAction={handleClear}
            secondaryActionLabel='Clear'
            title="Add ability stone"
            body={bodyContent}
        />
    )
}

export default AddAbilityStone;