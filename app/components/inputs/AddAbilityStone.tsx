import Input from "./Input";
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import { stoneLevels } from "@/app/libs/getEngravingData";
import { getReduction } from "@/app/libs/getItemData";
import SliderInput from "../SliderInput";
import { formatStones } from "@/app/utils/formatData";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ClearButton from "../buttons/ClearButton";
import SubmitButton from "../buttons/SubmitButton";
import { SelectItem } from "@/components/ui/select";
import { Flex } from "@chakra-ui/react";
import useAddAbilityStoneModal from "@/app/hooks/useAddAbilityStoneModal";
import Modal from "../modals/Modal";
import { CommandGroup, CommandItem } from "@/components/ui/command";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Check } from "lucide-react";

interface AddAbilityStoneProps  {
    engravingOptions: { [key: string]: string };
    setItemData: (e: any) => void;
}

type DataType = {
    [key: string]: string | number | undefined;
}

export interface AddAbilityStoneData {
  engravingOne: string,
  engravingTwo: string,
  engravingOneValue: number,
  engravingTwoValue: number,
  reduction: string,
  reductionValue: number,
}

const AddAbilityStone: React.FC<AddAbilityStoneProps> = ({
    engravingOptions,
    setItemData
}) => {
    const addAbilityStoneModal = useAddAbilityStoneModal();
    const { isEdit, item, index } = addAbilityStoneModal;
    const dataInitialState = useMemo(() => {
        return !isEdit && {
            engravingOne: '',
            engravingOneValue: '',
            engravingTwo: '',
            engravingTwoValue: '',
            reduction: '',
            reductionValue: 0,
        } 
            ||
        {
            engravingOne: item?.engravingOne.name,
            engravingOneValue: item?.engravingOne.value.toString(),
            engravingTwo: item?.engravingTwo.name,
            engravingTwoValue: item?.engravingTwo.value.toString(),
            reduction: item?.reduction.name,
            reductionValue: item?.reduction.value.toString(),
        }
    }, [item, isEdit]);
    const [stone, setStone] = useState<DataType>(dataInitialState)

    useEffect(() => {
        setStone(dataInitialState);
    }, [dataInitialState]);

    
    const handleChange = useCallback((e: string, v: string) => setStone({ ...stone, [e]: v}), [stone]);

    const handleSliderChange = (value: any, name: string) => {
        const parsed = parseString(name, value);
        setStone({
          ...stone,
          [name]: parsed,
        });
    }

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
        setStone({
            engravingOne: '',
            engravingOneValue: '',
            engravingTwo: '',
            engravingTwoValue: '',
            reduction: '',
            reductionValue: 0,
        } );
    }    

    const isValid = () => {
        return stone.engravingOne &&
            stone.engravingOneValue && 
            stone.engravingTwo &&
            stone.engravingTwoValue &&
            stone.reduction
        ;
    }

    const handleSubmit = () => {
        //add validation
        if (!isValid()) return;
        const stoneString = localStorage.getItem('ability-stones');
        const stoneArray = stoneString ? JSON.parse(stoneString) : [];
        const formattedStone = formatStones(stone);

        if (isEdit) {
            stoneArray[index as number] = formattedStone;
        } else {
            stoneArray.push(formattedStone);
        }

        localStorage.setItem('ability-stones', JSON.stringify(stoneArray));
        setItemData(stoneArray);
        setStone(dataInitialState);
        if (isEdit) addAbilityStoneModal.onClose();
        handleClear();
    }

    const getOptions = useCallback((e: string, func: () => { [key: string]: string | number }) => {
        const options = (
          <CommandGroup>
            <ScrollArea className={`${e === 'engravingOne' || e === 'engravingTwo' ? 'h-[300px]' : ''}`}>
            {Object.entries(func()).map(([key, value]) => (
              <CommandItem
                key={key}
                value={key}
                onSelect={() => handleChange(e, key)}
                className='flex hover:cursor-pointer hover:bg-zinc-800 rounded-lg p-1 active:bg-zinc-800 focus:outline-none focus:bg-zinc-800'
              >
                <Check
                  className={`
                    mr-2 h-4 w-4
                    ${stone[e] === value ? "opacity-100" : "opacity-0"}
                  `}
                />
                {value}
              </CommandItem>
            ))}
            </ScrollArea>
          </CommandGroup>
        );
      
        return options;
    }, [stone, handleChange]);

    const bodyContent = (
        <Card>
            <CardHeader>
                <CardDescription>All your stones will be considered in the final builds.</CardDescription>
            </CardHeader>
            <CardContent>
                <Flex gap="4" flexDirection="column">
                    <Input
                        label="Select engraving"
                        name="engravingOne"
                        options={getOptions('engravingOne', () => engravingOptions)}
                        onChange={(e: string, v: string) => handleChange(e, v)}
                        value={engravingOptions[stone.engravingOne as string]}
                        required
                    />
                    <Input
                        label="Select level"
                        name="engravingOneValue"
                        options={getOptions('engravingOneValue', () => stoneLevels)}
                        onChange={(e: string, v: string) => handleChange(e, v)}
                        value={stone.engravingOneValue}
                        required
                    />
                    <Input
                        label="Select engraving"
                        name="engravingTwo"
                        options={getOptions('engravingTwo', () => engravingOptions)}
                        onChange={(e: string, v: string) => handleChange(e, v)}
                        value={engravingOptions[stone.engravingTwo as string]}
                        required
                    />
                    <Input
                        label="Select level"
                        name="engravingTwoValue"
                        options={getOptions('engravingTwoValue', () => stoneLevels)}
                        onChange={(e: string, v: string) => handleChange(e, v)}
                        value={stone.engravingTwoValue}
                        required
                    />
                    <Input
                        label="Select reduction"
                        name="reduction"
                        options={getOptions('reduction', getReduction)}
                        onChange={(e: string, v: string) => handleChange(e, v)}
                        value={getReduction()[stone.reduction as string]}
                        required
                    />
                    <SliderInput
                        min={0} 
                        max={10} 
                        name="reductionValue"
                        value={stone.reductionValue}
                        onChange={(e: any) => handleSliderChange(e, 'reductionValue')} 
                    />
                </Flex>
            </CardContent>
        </Card>
    );

    if (addAbilityStoneModal.isEdit) {
        return (
            <Modal
                isOpen={addAbilityStoneModal.isOpen}
                onClose={addAbilityStoneModal.onClose}
                onSubmit={handleSubmit}
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
            onClose={addAbilityStoneModal.onClose}
            onSubmit={handleSubmit}
            actionLabel="Submit"
            secondaryAction={handleClear}
            secondaryActionLabel='Clear'
            title="Add ability stone"
            body={bodyContent}
        />
    )
}

export default AddAbilityStone;